// Quản lý LocalStorage cho SPORTIX
// Bao gồm: Giỏ hàng (Cart), Yêu thích (Wishlist), Đơn hàng (Orders), Mã giảm giá (Coupons)

const STORAGE_KEYS = {
  CART: "sportix_cart",
  WISHLIST: "sportix_wishlist",
  ORDERS: "sportix_orders",
  ACTIVE_COUPON: "sportix_active_coupon"
};

// Định nghĩa mã giảm giá có sẵn
const AVAILABLE_COUPONS = {
  "SPORTIX10": { code: "SPORTIX10", type: "percent", value: 10, desc: "Giảm 10% tổng đơn hàng", minOrder: 300000 },
  "SPORTIX50K": { code: "SPORTIX50K", type: "fixed", value: 50000, desc: "Giảm 50.000₫ cho đơn từ 500k", minOrder: 500000 },
  "FREESHIP": { code: "FREESHIP", type: "freeship", value: 30000, desc: "Miễn phí vận chuyển toàn quốc (tối đa 30.000₫)", minOrder: 250000 }
};

// ==================== ĐỊNH DẠNG TIỀN TỆ ====================
function formatCurrency(amount) {
  if (isNaN(amount)) return "0₫";
  return new Intl.NumberFormat("vi-VN").format(amount) + "₫";
}

// ==================== GIỎ HÀNG (CART) ====================
const CartStorage = {
  get() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Lỗi đọc giỏ hàng", e);
      return [];
    }
  },

  save(cart) {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent("sportix:cart-updated", { detail: { cart } }));
    } catch (e) {
      console.error("Lỗi lưu giỏ hàng", e);
    }
  },

  add(product, size, color, quantity = 1) {
    const cart = this.get();
    const selectedSize = size || (product.sizes && product.sizes[0]) || "M";
    const selectedColor = color || (product.colors && product.colors[0]?.name) || "Tiêu chuẩn";

    // Tìm xem sản phẩm cùng id, size, màu đã có chưa
    const existingIndex = cart.findIndex(
      item => item.id === product.id && item.size === selectedSize && item.color === selectedColor
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += Number(quantity);
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: Array.isArray(product.images) ? product.images[0] : product.images,
        categoryName: product.categoryName || "Thời trang thể thao",
        size: selectedSize,
        color: selectedColor,
        quantity: Number(quantity)
      });
    }

    this.save(cart);
    return cart;
  },

  updateQuantity(index, newQty) {
    const cart = this.get();
    if (index >= 0 && index < cart.length) {
      if (newQty <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = Math.min(Math.max(1, Number(newQty)), 99);
      }
      this.save(cart);
    }
    return cart;
  },

  remove(index) {
    const cart = this.get();
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      this.save(cart);
    }
    return cart;
  },

  clear() {
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_COUPON);
    window.dispatchEvent(new CustomEvent("sportix:cart-updated", { detail: { cart: [] } }));
  },

  getCount() {
    const cart = this.get();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal() {
    const cart = this.get();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getActiveCoupon() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_COUPON);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  applyCoupon(code) {
    const upperCode = (code || "").trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS[upperCode];
    if (!coupon) {
      return { success: false, message: "Mã giảm giá không tồn tại!" };
    }

    const subtotal = this.getSubtotal();
    if (subtotal < coupon.minOrder) {
      return {
        success: false,
        message: `Mã ${coupon.code} chỉ áp dụng cho đơn hàng từ ${formatCurrency(coupon.minOrder)}!`
      };
    }

    localStorage.setItem(STORAGE_KEYS.ACTIVE_COUPON, JSON.stringify(coupon));
    window.dispatchEvent(new CustomEvent("sportix:cart-updated", { detail: { cart: this.get() } }));
    return { success: true, message: `Áp dụng thành công mã ${coupon.code}!`, coupon };
  },

  removeCoupon() {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_COUPON);
    window.dispatchEvent(new CustomEvent("sportix:cart-updated", { detail: { cart: this.get() } }));
  },

  calculateBill() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) {
      return {
        subtotal: 0,
        shippingFee: 0,
        discount: 0,
        total: 0,
        coupon: null
      };
    }

    let shippingFee = subtotal >= 500000 ? 0 : 30000; // Freeship mặc định trên 500k
    let discount = 0;
    const coupon = this.getActiveCoupon();

    if (coupon) {
      if (subtotal >= coupon.minOrder) {
        if (coupon.type === "percent") {
          discount = Math.round((subtotal * coupon.value) / 100);
        } else if (coupon.type === "fixed") {
          discount = coupon.value;
        } else if (coupon.type === "freeship") {
          discount = Math.min(shippingFee, coupon.value);
          shippingFee = Math.max(0, shippingFee - coupon.value);
        }
      } else {
        // Hủy coupon nếu không còn đủ điều kiện minOrder
        this.removeCoupon();
      }
    }

    const total = Math.max(0, subtotal + shippingFee - discount);

    return {
      subtotal,
      shippingFee,
      discount,
      total,
      coupon
    };
  }
};

// ==================== YÊU THÍCH (WISHLIST) ====================
const WishlistStorage = {
  get() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  save(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("sportix:wishlist-updated", { detail: { wishlist: list } }));
    } catch (e) {
      console.error("Lỗi lưu wishlist", e);
    }
  },

  has(productId) {
    const list = this.get();
    return list.includes(productId);
  },

  toggle(productId) {
    let list = this.get();
    const exists = list.includes(productId);
    if (exists) {
      list = list.filter(id => id !== productId);
    } else {
      list.push(productId);
    }
    this.save(list);
    return !exists; // Trả về true nếu vừa thêm, false nếu vừa xóa
  },

  getCount() {
    return this.get().length;
  }
};

// ==================== QUẢN LÝ ĐƠN HÀNG (ORDERS) ====================
const OrderStorage = {
  get() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  save(orders) {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error("Lỗi lưu đơn hàng", e);
    }
  },

  add(order) {
    const orders = this.get();
    const newOrder = {
      orderId: "SPX" + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: "Đang xử lý",
      statusColor: "#f59e0b",
      ...order
    };
    orders.unshift(newOrder);
    this.save(orders);
    return newOrder;
  },

  getById(orderId) {
    const orders = this.get();
    return orders.find(o => o.orderId === orderId) || null;
  }
};

