// ==========================================================================
// SPORTIX - Logic Thanh Toán & Đặt Hàng (Checkout Page)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const cart = CartStorage.get();

  if (cart.length === 0) {
    document.getElementById("checkoutMainContainer").innerHTML = `
      <div class="empty-state" style="background: #fff; padding: 60px 20px; border-radius: var(--radius-xl); border: 1px solid var(--color-border);">
        <div class="empty-icon"><i class="fa-solid fa-basket-shopping"></i></div>
        <h2 class="empty-title">Không có sản phẩm nào để thanh toán!</h2>
        <p class="empty-desc">Giỏ hàng đang trống. Hãy thêm sản phẩm trước khi thanh toán nhé.</p>
        <a href="products.html" class="btn btn-primary">Mua sắm ngay</a>
      </div>
    `;
    return;
  }

  renderCheckoutSummary();
  initPaymentMethodSelector();
  initCheckoutForm();
});

function renderCheckoutSummary() {
  const container = document.getElementById("checkoutOrderReview");
  if (!container) return;

  const cart = CartStorage.get();
  const bill = CartStorage.calculateBill();

  container.innerHTML = `
    <div style="background: #ffffff; border-radius: var(--radius-xl); padding: 24px; border: 1px solid var(--color-border); position: sticky; top: 100px;">
      <h3 style="font-size: 1.25rem; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border);">
        Đơn Hàng Của Bạn (${CartStorage.getCount()})
      </h3>

      <div style="max-height: 280px; overflow-y: auto; padding-right: 6px; margin-bottom: 20px; display: flex; flex-direction: column; gap: 14px;">
        ${cart.map(item => `
          <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; font-size: 0.9rem;">
            <div style="display: flex; gap: 10px; align-items: center;">
              <img src="${item.image}" alt="${item.name}" style="width: 48px; height: 58px; border-radius: 6px; object-fit: cover;">
              <div>
                <strong style="display: block; font-size: 0.88rem; max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</strong>
                <span style="font-size: 0.78rem; color: var(--color-text-muted);">Size: ${item.size} • x${item.quantity}</span>
              </div>
            </div>
            <strong style="font-family: var(--font-heading); color: var(--color-dark);">${formatCurrency(item.price * item.quantity)}</strong>
          </div>
        `).join("")}
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.92rem; border-top: 1px solid var(--color-border); padding-top: 16px; margin-bottom: 16px;">
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
            <span>Mã giảm giá (${bill.coupon.code}):</span>
            <strong>-${formatCurrency(bill.discount)}</strong>
          </div>
        ` : ""}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 2px dashed var(--color-border); padding-top: 16px;">
        <span style="font-size: 1.1rem; font-weight: 800;">Tổng thanh toán:</span>
        <span style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 900; color: var(--color-primary);">
          ${formatCurrency(bill.total)}
        </span>
      </div>
    </div>
  `;
}

function initPaymentMethodSelector() {
  const radios = document.querySelectorAll("input[name='paymentMethod']");
  const qrBox = document.getElementById("bankQrBox");

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "banking" && qrBox) {
        qrBox.style.display = "block";
      } else if (qrBox) {
        qrBox.style.display = "none";
      }
    });
  });
}

function initCheckoutForm() {
  const form = document.getElementById("checkoutForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const email = document.getElementById("custEmail").value.trim();
    const address = document.getElementById("custAddress").value.trim();
    const city = document.getElementById("custCity").value.trim();
    const notes = document.getElementById("custNotes").value.trim();
    const paymentMethodEl = document.querySelector("input[name='paymentMethod']:checked");

    if (!fullName || !phone || !address || !city) {
      showToast("Lỗi thông tin", "Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng!", "error");
      return;
    }

    // Kiểm tra định dạng số điện thoại Việt Nam cơ bản
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(phone)) {
      showToast("Lỗi số điện thoại", "Vui lòng nhập đúng số điện thoại di động (10 số)!", "error");
      return;
    }

    const bill = CartStorage.calculateBill();
    const cart = CartStorage.get();
    const paymentMethod = paymentMethodEl ? paymentMethodEl.value : "cod";

    let paymentMethodName = "Thanh toán khi nhận hàng (COD)";
    if (paymentMethod === "banking") paymentMethodName = "Chuyển khoản QR Ngân hàng";
    if (paymentMethod === "card") paymentMethodName = "Thẻ Quốc Tế (Visa / Mastercard)";

    // Lưu vào LocalStorage Orders
    const newOrder = OrderStorage.add({
      customer: {
        fullName,
        phone,
        email,
        address,
        city,
        notes
      },
      items: cart,
      subtotal: bill.subtotal,
      shippingFee: bill.shippingFee,
      discount: bill.discount,
      total: bill.total,
      coupon: bill.coupon ? bill.coupon.code : null,
      paymentMethod: paymentMethodName
    });

    // Dọn sạch giỏ hàng
    CartStorage.clear();

    // Hiển thị giao diện Đặt hàng thành công
    showOrderSuccess(newOrder);
  });
}

function showOrderSuccess(order) {
  const main = document.getElementById("checkoutMainContainer");
  if (!main) return;

  main.innerHTML = `
    <div style="max-width: 680px; margin: 40px auto; background: #ffffff; border-radius: var(--radius-xl); padding: 40px 30px; border: 1px solid var(--color-border); text-align: center; box-shadow: var(--shadow-lg);">
      <div style="width: 80px; height: 80px; background: #ecfdf5; color: var(--color-new); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 2.5rem; margin-bottom: 20px;">
        <i class="fa-solid fa-circle-check"></i>
      </div>
      <h1 style="font-size: 2rem; margin-bottom: 8px; text-transform: uppercase;">Đặt Hàng Thành Công!</h1>
      <p style="color: var(--color-text-muted); font-size: 1rem; margin-bottom: 24px;">
        Cảm ơn bạn <strong>${order.customer.fullName}</strong> đã tin tưởng và lựa chọn <strong>SPORTIX</strong>.
      </p>

      <div style="background: var(--color-bg-body); border-radius: var(--radius-lg); padding: 20px; text-align: left; margin-bottom: 30px; font-size: 0.92rem; border: 1px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: var(--color-text-muted);">Mã đơn hàng:</span>
          <strong style="color: var(--color-primary); font-family: var(--font-heading); font-size: 1.1rem;">#${order.orderId}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: var(--color-text-muted);">Ngày đặt:</span>
          <span>${new Date(order.createdAt).toLocaleString("vi-VN")}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: var(--color-text-muted);">Người nhận:</span>
          <strong>${order.customer.fullName} (${order.customer.phone})</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: var(--color-text-muted);">Địa chỉ giao:</span>
          <span>${order.customer.address}, ${order.customer.city}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: var(--color-text-muted);">Phương thức thanh toán:</span>
          <strong>${order.paymentMethod}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 1px dashed var(--color-border); padding-top: 12px; margin-top: 10px; font-size: 1.05rem;">
          <span style="font-weight: 800;">Tổng tiền thanh toán:</span>
          <strong style="color: var(--color-primary); font-family: var(--font-heading); font-size: 1.3rem;">${formatCurrency(order.total)}</strong>
        </div>
      </div>

      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <a href="orders.html" class="btn btn-outline">
          <i class="fa-solid fa-receipt"></i> Xem Lịch Sử Đơn Hàng
        </a>
        <a href="products.html" class="btn btn-primary">
          Tiếp tục mua hàng <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
}

