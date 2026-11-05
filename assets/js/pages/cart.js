// ==========================================================================
// SPORTIX - Logic Trang Giỏ Hàng Chi Tiết (Full Cart Page)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  renderFullCart();
  initCouponHandler();

  window.addEventListener("sportix:cart-updated", () => {
    renderFullCart();
  });
});

function renderFullCart() {
  const container = document.getElementById("cartItemsList");
  const summaryBox = document.getElementById("cartSummaryContainer");
  const freeshipProgressBox = document.getElementById("freeshipProgressBar");
  if (!container) return;

  const cart = CartStorage.get();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="background: #ffffff; border-radius: var(--radius-xl); padding: 60px 20px; border: 1px solid var(--color-border);">
        <div class="empty-icon">
          <i class="fa-solid fa-basket-shopping"></i>
        </div>
        <h2 class="empty-title">Giỏ hàng của bạn đang trống</h2>
        <p class="empty-desc">
          Bạn chưa chọn sản phẩm nào vào giỏ hàng. Hãy khám phá các mẫu quần áo thể thao mới nhất của SPORTIX nhé!
        </p>
        <a href="products.html" class="btn btn-primary btn-lg">
          <i class="fa-solid fa-arrow-left"></i> Khám phá sản phẩm ngay
        </a>
      </div>
    `;
    if (summaryBox) summaryBox.style.display = "none";
    if (freeshipProgressBox) freeshipProgressBox.style.display = "none";
    return;
  }

  if (summaryBox) summaryBox.style.display = "block";
  if (freeshipProgressBox) freeshipProgressBox.style.display = "block";

  // Thanh tiến trình Miễn phí vận chuyển
  const bill = CartStorage.calculateBill();
  const freeshipTarget = 500000;
  const percent = Math.min(100, Math.round((bill.subtotal / freeshipTarget) * 100));
  const remaining = freeshipTarget - bill.subtotal;

  if (freeshipProgressBox) {
    freeshipProgressBox.innerHTML = `
      <div style="background: #ffffff; border-radius: var(--radius-lg); padding: 18px 24px; border: 1px solid var(--color-border); margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 0.92rem;">
          <span style="font-weight: 700;">
            ${remaining <= 0 ? `
              <span style="color: var(--color-new);"><i class="fa-solid fa-circle-check"></i> Chúc mừng! Bạn đã đủ điều kiện được <strong>MIỄN PHÍ VẬN CHUYỂN</strong></span>
            ` : `
              Mua thêm <strong>${formatCurrency(remaining)}</strong> để được <span style="color: var(--color-primary); font-weight: 800;">FREESHIP TOÀN QUỐC</span>
            `}
          </span>
          <span style="font-weight: 800; color: var(--color-primary);">${percent}%</span>
        </div>
        <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
          <div style="width: ${percent}%; height: 100%; background: linear-gradient(90deg, #ff8c42, var(--color-primary)); transition: width 0.4s ease;"></div>
        </div>
      </div>
    `;
  }

  // Danh sách sản phẩm trong giỏ
  container.innerHTML = `
    <div style="background: #ffffff; border-radius: var(--radius-xl); border: 1px solid var(--color-border); overflow: hidden;">
      <div style="padding: 18px 24px; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; background: #f8fafc;">
        <h3 style="font-size: 1.15rem;">Sản phẩm (${CartStorage.getCount()} món)</h3>
        <button type="button" onclick="handleClearAllCart()" style="color: var(--color-sale); font-size: 0.88rem; font-weight: 600;">
          <i class="fa-regular fa-trash-can"></i> Xóa tất cả
        </button>
      </div>

      <div style="padding: 10px 24px;">
        ${cart.map((item, index) => `
          <div style="display: grid; grid-template-columns: 80px 1fr auto; gap: 20px; align-items: center; padding: 20px 0; border-bottom: ${index === cart.length - 1 ? "none" : "1px solid var(--color-border-subtle)"};">
            <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 95px; border-radius: var(--radius-md); object-fit: cover; background: #f1f5f9;">
            <div>
              <h4 style="font-size: 1.05rem; margin-bottom: 4px;">
                <a href="product-detail.html?id=${item.id}" style="color: var(--color-dark);">${item.name}</a>
              </h4>
              <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 8px;">
                <span>Size: <strong>${item.size}</strong></span> | 
                <span>Màu: <strong>${item.color}</strong></span>
              </div>
              <div style="font-weight: 700; color: var(--color-primary); font-size: 1.05rem; font-family: var(--font-heading);">
                ${formatCurrency(item.price)}
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 12px;">
              <div class="qty-control" style="height: 38px;">
                <button type="button" class="qty-btn" onclick="CartStorage.updateQuantity(${index}, ${item.quantity - 1})" style="width: 32px;">-</button>
                <input type="text" class="qty-input" value="${item.quantity}" readonly style="width: 38px;">
                <button type="button" class="qty-btn" onclick="CartStorage.updateQuantity(${index}, ${item.quantity + 1})" style="width: 32px;">+</button>
              </div>
              <span style="font-family: var(--font-heading); font-weight: 800; font-size: 1.15rem; color: var(--color-dark);">
                ${formatCurrency(item.price * item.quantity)}
              </span>
              <button type="button" onclick="CartStorage.remove(${index})" style="color: #94a3b8; font-size: 0.85rem; cursor: pointer;">
                <i class="fa-regular fa-trash-can"></i> Xóa
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  // Render Tóm tắt thanh toán
  renderSummary(bill);
}

function renderSummary(bill) {
  const summaryBox = document.getElementById("cartSummaryContainer");
  if (!summaryBox) return;

  const activeCoupon = CartStorage.getActiveCoupon();

  summaryBox.innerHTML = `
    <div style="background: #ffffff; border-radius: var(--radius-xl); padding: 24px; border: 1px solid var(--color-border); position: sticky; top: 100px;">
      <h3 style="font-size: 1.25rem; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border);">
        Tóm Tắt Đơn Hàng
      </h3>

      <!-- Khung nhập mã giảm giá -->
      <div style="margin-bottom: 24px;">
        <label style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 8px;">Mã Ưu Đãi / Voucher</label>
        <div style="display: flex; gap: 8px;">
          <input type="text" id="couponCodeInput" placeholder="Ví dụ: SPORTIX10" value="${activeCoupon ? activeCoupon.code : ""}" 
                 style="flex: 1; padding: 10px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: 0.9rem; text-transform: uppercase; font-weight: 700;">
          <button type="button" class="btn btn-dark btn-sm" id="applyCouponBtn" onclick="handleApplyCoupon()">Áp dụng</button>
        </div>
        ${activeCoupon ? `
          <div style="display: flex; align-items: center; justify-content: space-between; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 8px 12px; border-radius: var(--radius-md); margin-top: 10px; font-size: 0.82rem; color: #065f46;">
            <span><i class="fa-solid fa-tag"></i> Đã áp dụng mã: <strong>${activeCoupon.code}</strong></span>
            <button type="button" onclick="CartStorage.removeCoupon()" style="color: #ef4444; font-weight: 700; cursor: pointer;">Gỡ</button>
          </div>
        ` : `
          <div style="margin-top: 8px; font-size: 0.8rem; color: var(--color-text-muted);">
            Gợi ý: Nhập <strong>SPORTIX10</strong> (giảm 10%), <strong>FREESHIP</strong>
          </div>
        `}
      </div>

      <!-- Các dòng tính toán -->
      <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--color-text-muted);">Tạm tính:</span>
          <strong>${formatCurrency(bill.subtotal)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--color-text-muted);">Phí vận chuyển:</span>
          <span>${bill.shippingFee === 0 ? '<strong style="color: var(--color-new);">Miễn phí</strong>' : formatCurrency(bill.shippingFee)}</span>
        </div>
        ${bill.discount > 0 ? `
          <div style="display: flex; justify-content: space-between; color: var(--color-sale);">
            <span>Giảm giá voucher:</span>
            <strong>-${formatCurrency(bill.discount)}</strong>
          </div>
        ` : ""}
      </div>

      <div style="border-top: 2px dashed var(--color-border); padding-top: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-size: 1.1rem; font-weight: 800;">Tổng thanh toán:</span>
        <span style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 900; color: var(--color-primary);">
          ${formatCurrency(bill.total)}
        </span>
      </div>

      <a href="checkout.html" class="btn btn-primary btn-block btn-lg" style="margin-bottom: 12px;">
        Tiến hành thanh toán <i class="fa-solid fa-arrow-right"></i>
      </a>

      <a href="products.html" class="btn btn-outline btn-block btn-sm">
        Tiếp tục mua hàng
      </a>
    </div>
  `;
}

window.handleClearAllCart = function() {
  if (confirm("Bạn có chắc chắn muốn xóa toàn bộ sản phẩm trong giỏ hàng?")) {
    CartStorage.clear();
    showToast("Đã dọn dẹp giỏ hàng", "Toàn bộ sản phẩm đã được xóa", "info");
  }
};

window.handleApplyCoupon = function() {
  const input = document.getElementById("couponCodeInput");
  if (!input) return;
  const res = CartStorage.applyCoupon(input.value);
  if (res.success) {
    showToast("Áp dụng mã thành công!", res.message, "success");
  } else {
    showToast("Không thể áp dụng mã", res.message, "error");
  }
};

function initCouponHandler() {}

