// ==========================================================================
// SPORTIX - Core Shared Logic (Vanilla JavaScript)
// Quản lý Header, Cart Drawer, Wishlist, QuickView Modal & Toast Notifications
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initCartDrawer();
  initWishlistBadges();
  initSearch();
  initQuickViewModal();
  renderMiniCart();

  // Lắng nghe sự kiện cập nhật giỏ hàng từ bất kỳ đâu
  window.addEventListener("sportix:cart-updated", () => {
    updateBadges();
    renderMiniCart();
  });

  // Lắng nghe sự kiện yêu thích
  window.addEventListener("sportix:wishlist-updated", () => {
    updateBadges();
  });

  updateBadges();
});

// ==================== TOAST NOTIFICATION ====================
function showToast(title, message, type = "info") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let iconHtml = '<i class="fa-solid fa-bell"></i>';
  if (type === "success") iconHtml = '<i class="fa-solid fa-circle-check"></i>';
  if (type === "error") iconHtml = '<i class="fa-solid fa-circle-xmark"></i>';

  toast.innerHTML = `
    <div class="toast-icon">${iconHtml}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==================== HEADER & MOBILE MENU ====================
function initHeader() {
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // Mobile menu button
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav-drawer");
  const mobileOverlay = document.querySelector(".mobile-nav-overlay");
  const closeMobileNav = document.querySelector(".close-mobile-nav");

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener("click", () => {
      mobileNav.classList.add("active");
      if (mobileOverlay) mobileOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  const hideMobileNav = () => {
    if (mobileNav) mobileNav.classList.remove("active");
    if (mobileOverlay) mobileOverlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (closeMobileNav) closeMobileNav.addEventListener("click", hideMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener("click", hideMobileNav);
}

// ==================== BADGES ====================
function updateBadges() {
  const cartBadge = document.querySelectorAll(".cart-count-badge");
  const wishlistBadge = document.querySelectorAll(".wishlist-count-badge");

  const cartCount = CartStorage.getCount();
  const wishlistCount = WishlistStorage.getCount();

  cartBadge.forEach(el => {
    el.textContent = cartCount;
    el.style.display = cartCount > 0 ? "flex" : "none";
  });

  wishlistBadge.forEach(el => {
    el.textContent = wishlistCount;
    el.style.display = wishlistCount > 0 ? "flex" : "none";
  });
}

function initWishlistBadges() {
  updateBadges();
}

// ==================== SEARCH BAR ====================
function initSearch() {
  const searchInputs = document.querySelectorAll(".header-search-input");
  searchInputs.forEach(input => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
          window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  });

  const searchBtns = document.querySelectorAll(".header-search-btn");
  searchBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const wrap = btn.closest(".header-search-wrap");
      const input = wrap ? wrap.querySelector(".header-search-input") : null;
      if (input && input.value.trim()) {
        window.location.href = `products.html?search=${encodeURIComponent(input.value.trim())}`;
      }
    });
  });
}

// ==================== CART DRAWER ====================
function initCartDrawer() {
  const cartTriggers = document.querySelectorAll(".open-cart-drawer");
  const cartDrawer = document.querySelector(".cart-drawer");
  const cartOverlay = document.querySelector(".cart-overlay");
  const closeBtn = document.querySelector(".close-drawer-btn");

  const openDrawer = (e) => {
    if (e) e.preventDefault();
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add("active");
      cartOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
      renderMiniCart();
    }
  };

  const closeDrawer = () => {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove("active");
      cartOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  cartTriggers.forEach(btn => btn.addEventListener("click", openDrawer));
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (cartOverlay) cartOverlay.addEventListener("click", closeDrawer);

  window.SPORTIX_OPEN_CART = openDrawer;
  window.SPORTIX_CLOSE_CART = closeDrawer;

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer();
      closeQuickView();
    }
  });
}

// Render nội dung giỏ hàng trong Mini Cart Slide-over
function renderMiniCart() {
  const body = document.querySelector(".cart-drawer .drawer-body");
  const footer = document.querySelector(".cart-drawer .drawer-footer");
  if (!body) return;

  const cart = CartStorage.get();

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="empty-state" style="padding: 40px 10px;">
        <div class="empty-icon" style="width: 60px; height: 60px; font-size: 1.6rem;">
          <i class="fa-solid fa-bag-shopping"></i>
        </div>
        <h4 style="font-size: 1.1rem; margin-bottom: 6px;">Giỏ hàng đang trống</h4>
        <p style="color: var(--color-text-muted); font-size: 0.85rem; margin-bottom: 20px;">
          Khám phá ngay bộ sưu tập đồ tập thể thao SPORTIX đỉnh cao!
        </p>
        <a href="products.html" class="btn btn-primary btn-sm" onclick="window.SPORTIX_CLOSE_CART && window.SPORTIX_CLOSE_CART()">
          Mua sắm ngay
        </a>
      </div>
    `;
    if (footer) footer.style.display = "none";
    return;
  }

  if (footer) footer.style.display = "block";

  body.innerHTML = cart.map((item, index) => `
    <div class="cart-drawer-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <div>
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-variant">
            <span>Size: <strong>${item.size}</strong></span> | 
            <span>Màu: <strong>${item.color}</strong></span>
          </div>
        </div>
        <div class="cart-item-price-row">
          <div class="qty-control">
            <button type="button" class="qty-btn" onclick="handleUpdateCartQty(${index}, ${item.quantity - 1})">-</button>
            <input type="text" class="qty-input" value="${item.quantity}" readonly>
            <button type="button" class="qty-btn" onclick="handleUpdateCartQty(${index}, ${item.quantity + 1})">+</button>
          </div>
          <span style="font-weight: 800; color: var(--color-primary); font-family: var(--font-heading);">
            ${formatCurrency(item.price * item.quantity)}
          </span>
          <button type="button" class="cart-remove-btn" onclick="handleRemoveCartItem(${index})" title="Xóa">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("");

  const bill = CartStorage.calculateBill();
  if (footer) {
    footer.innerHTML = `
      <div class="cart-summary-line">
        <span>Tạm tính (${CartStorage.getCount()} món):</span>
        <strong>${formatCurrency(bill.subtotal)}</strong>
      </div>
      ${bill.discount > 0 ? `
        <div class="cart-summary-line" style="color: var(--color-sale);">
          <span>Giảm giá:</span>
          <strong>-${formatCurrency(bill.discount)}</strong>
        </div>
      ` : ""}
      <div class="cart-summary-line total">
        <span>Tổng cộng:</span>
        <span class="price-highlight">${formatCurrency(bill.total)}</span>
      </div>
      <div style="display: flex; gap: 10px; margin-top: 16px;">
        <a href="cart.html" class="btn btn-outline btn-block" onclick="window.SPORTIX_CLOSE_CART()">
          Xem giỏ hàng
        </a>
        <a href="checkout.html" class="btn btn-primary btn-block" onclick="window.SPORTIX_CLOSE_CART()">
          Thanh toán
        </a>
      </div>
    `;
  }
}

window.handleUpdateCartQty = function(index, newQty) {
  CartStorage.updateQuantity(index, newQty);
};

window.handleRemoveCartItem = function(index) {
  CartStorage.remove(index);
  showToast("Đã xóa sản phẩm", "Sản phẩm đã được loại khỏi giỏ hàng", "info");
};

// ==================== QUICK VIEW MODAL ====================
function initQuickViewModal() {
  const modal = document.querySelector("#quickViewModal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".modal-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeQuickView);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeQuickView();
  });
}

function closeQuickView() {
  const modal = document.querySelector("#quickViewModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

window.openQuickView = function(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const modal = document.querySelector("#quickViewModal");
  if (!modal) return;

  const content = modal.querySelector(".modal-box-content");
  if (!content) return;

  let selectedSize = product.sizes ? product.sizes[0] : "M";
  let selectedColor = product.colors ? product.colors[0].name : "Tiêu chuẩn";

  content.innerHTML = `
    <div class="quick-view-grid">
      <div class="quick-view-img-box">
        <img id="qvMainImage" src="${product.images[0]}" alt="${product.name}">
      </div>
      <div class="quick-view-info">
        <span class="product-category">${product.categoryName}</span>
        <h2 style="font-size: 1.4rem; margin-bottom: 8px;">${product.name}</h2>
        
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div class="product-rating">
            <i class="fa-solid fa-star"></i>
            <span>${product.rating}</span>
          </div>
          <span style="color: var(--color-text-muted); font-size: 0.85rem;">(${product.reviewsCount} đánh giá)</span>
          <span style="color: var(--color-text-muted); font-size: 0.85rem;">• Đã bán ${product.sold}</span>
        </div>

        <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px;">
          <span style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--color-primary);">
            ${formatCurrency(product.price)}
          </span>
          ${product.originalPrice ? `
            <span style="font-size: 1.1rem; color: var(--color-text-light); text-decoration: line-through;">
              ${formatCurrency(product.originalPrice)}
            </span>
            <span class="badge badge-sale">-${product.discount}%</span>
          ` : ""}
        </div>

        <p style="font-size: 0.92rem; color: var(--color-text-muted); margin-bottom: 20px; line-height: 1.6;">
          ${product.description}
        </p>

        <!-- Màu sắc -->
        ${product.colors ? `
          <div style="margin-bottom: 16px;">
            <div class="option-label">
              <span>Màu sắc: <strong id="qvSelectedColorName">${selectedColor}</strong></span>
            </div>
            <div class="color-picker" id="qvColorPicker">
              ${product.colors.map((c, i) => `
                <div class="color-choice ${i === 0 ? "active" : ""}" 
                     style="background: ${c.hex};" 
                     data-color="${c.name}" 
                     title="${c.name}"></div>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Kích thước -->
        ${product.sizes ? `
          <div style="margin-bottom: 24px;">
            <div class="option-label">
              <span>Kích cỡ: <strong id="qvSelectedSizeName">${selectedSize}</strong></span>
              <a href="javascript:void(0)" onclick="openSizeGuide()" style="color: var(--color-primary); font-size: 0.8rem; text-transform: none;">
                <i class="fa-solid fa-ruler-horizontal"></i> Hướng dẫn chọn size
              </a>
            </div>
            <div class="size-picker" id="qvSizePicker">
              ${product.sizes.map((s, i) => `
                <button type="button" class="size-btn ${i === 0 ? "active" : ""}" data-size="${s}">${s}</button>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Số lượng & Nút thêm giỏ hàng -->
        <div style="display: flex; gap: 12px; align-items: center;">
          <div class="qty-control" style="height: 48px;">
            <button type="button" class="qty-btn" id="qvQtyMinus" style="width: 40px;">-</button>
            <input type="text" class="qty-input" id="qvQtyInput" value="1" readonly style="width: 44px; font-size: 1rem;">
            <button type="button" class="qty-btn" id="qvQtyPlus" style="width: 40px;">+</button>
          </div>
          <button type="button" class="btn btn-primary" id="qvAddToCartBtn" style="flex: 1; height: 48px;">
            <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
          </button>
        </div>

        <div style="margin-top: 16px; text-align: center;">
          <a href="product-detail.html?id=${product.id}" style="color: var(--color-dark); font-weight: 700; font-size: 0.88rem; text-decoration: underline;">
            Xem chi tiết sản phẩm đầy đủ →
          </a>
        </div>
      </div>
    </div>
  `;

  // Gắn sự kiện chọn màu
  const colorDots = content.querySelectorAll("#qvColorPicker .color-choice");
  colorDots.forEach(dot => {
    dot.addEventListener("click", () => {
      colorDots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
      selectedColor = dot.getAttribute("data-color");
      const nameEl = content.querySelector("#qvSelectedColorName");
      if (nameEl) nameEl.textContent = selectedColor;
    });
  });

  // Gắn sự kiện chọn size
  const sizeBtns = content.querySelectorAll("#qvSizePicker .size-btn");
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sizeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.getAttribute("data-size");
      const nameEl = content.querySelector("#qvSelectedSizeName");
      if (nameEl) nameEl.textContent = selectedSize;
    });
  });

  // Số lượng
  let qty = 1;
  const qtyInput = content.querySelector("#qvQtyInput");
  content.querySelector("#qvQtyMinus").addEventListener("click", () => {
    if (qty > 1) {
      qty--;
      qtyInput.value = qty;
    }
  });
  content.querySelector("#qvQtyPlus").addEventListener("click", () => {
    if (qty < 99) {
      qty++;
      qtyInput.value = qty;
    }
  });

  // Nút Thêm vào giỏ hàng
  content.querySelector("#qvAddToCartBtn").addEventListener("click", () => {
    CartStorage.add(product, selectedSize, selectedColor, qty);
    closeQuickView();
    showToast("Đã thêm vào giỏ hàng!", `${product.name} (Size: ${selectedSize})`, "success");
    if (window.SPORTIX_OPEN_CART) {
      window.SPORTIX_OPEN_CART();
    }
  });

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

// ==================== CARD PRODUCT RENDER HELPER ====================
function renderProductCard(product) {
  const isWish = WishlistStorage.has(product.id);
  const discountBadge = product.discount ? `<span class="badge badge-sale">-${product.discount}%</span>` : "";
  const newBadge = product.isNew ? `<span class="badge badge-new">NEW</span>` : "";
  const hotBadge = product.isFlashSale ? `<span class="badge badge-hot"><i class="fa-solid fa-bolt"></i> HOT</span>` : "";

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-thumb">
        <a href="product-detail.html?id=${product.id}">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        </a>
        <div class="product-badges">
          ${discountBadge}
          ${newBadge}
          ${hotBadge}
        </div>
        <div class="product-actions">
          <button type="button" class="action-btn ${isWish ? "active" : ""}" 
                  onclick="handleToggleWishlist('${product.id}', this)" 
                  title="${isWish ? "Bỏ yêu thích" : "Yêu thích"}">
            <i class="fa-${isWish ? "solid" : "regular"} fa-heart"></i>
          </button>
          <button type="button" class="action-btn" 
                  onclick="openQuickView('${product.id}')" 
                  title="Xem nhanh">
            <i class="fa-regular fa-eye"></i>
          </button>
        </div>
        <div class="product-quick-add">
          <button type="button" class="btn btn-primary btn-sm btn-block" 
                  onclick="handleQuickAdd('${product.id}')">
            <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
          </button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${product.categoryName}</span>
        <h3 class="product-title">
          <a href="product-detail.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-meta">
          <div class="product-rating">
            <i class="fa-solid fa-star"></i>
            <span>${product.rating}</span>
          </div>
          <span class="product-sold">Đã bán ${product.sold}</span>
        </div>
        <div class="product-price-row">
          <span class="current-price">${formatCurrency(product.price)}</span>
          ${product.originalPrice ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ""}
        </div>
        ${product.colors ? `
          <div class="color-swatches">
            ${product.colors.map(c => `<span class="color-dot" style="background: ${c.hex};" title="${c.name}"></span>`).join("")}
          </div>
        ` : ""}
      </div>
    </div>
  `;
}

window.handleToggleWishlist = function(productId, btn) {
  const added = WishlistStorage.toggle(productId);
  const product = getProductById(productId);
  const name = product ? product.name : "Sản phẩm";

  if (added) {
    btn.classList.add("active");
    btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    showToast("Đã lưu yêu thích", `${name} đã được thêm vào danh sách yêu thích!`, "success");
  } else {
    btn.classList.remove("active");
    btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    showToast("Đã xóa khỏi yêu thích", `${name} đã được xóa khỏi danh sách yêu thích`, "info");
  }
};

window.handleQuickAdd = function(productId) {
  const product = getProductById(productId);
  if (!product) return;
  const size = product.sizes ? product.sizes[0] : "M";
  const color = product.colors ? product.colors[0].name : "Tiêu chuẩn";
  CartStorage.add(product, size, color, 1);
  showToast("Thêm vào giỏ thành công!", `${product.name} (Size: ${size})`, "success");
  if (window.SPORTIX_OPEN_CART) {
    window.SPORTIX_OPEN_CART();
  }
};

window.openSizeGuide = function() {
  alert("BẢNG CHỌN SIZE SPORTIX:\n- Size S: 50 - 58kg (Cao 1m55 - 1m64)\n- Size M: 59 - 67kg (Cao 1m65 - 1m72)\n- Size L: 68 - 75kg (Cao 1m73 - 1m78)\n- Size XL: 76 - 84kg (Cao 1m78 - 1m85)\n- Size XXL: Trên 85kg\n\n*Nếu đang ở giữa 2 size, bạn nên chọn tăng 1 size để mặc thoải mái khi vận động thể thao!");
};

