// ==========================================================================
// SPORTIX - Logic Lịch Sử Đơn Hàng (Orders Page)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  renderOrdersList();
});

function renderOrdersList() {
  const container = document.getElementById("ordersContainer");
  if (!container) return;

  const orders = OrderStorage.get();

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="background: #fff; padding: 60px 20px; border-radius: var(--radius-xl); border: 1px solid var(--color-border);">
        <div class="empty-icon"><i class="fa-solid fa-box-open"></i></div>
        <h2 class="empty-title">Bạn chưa có đơn hàng nào!</h2>
        <p class="empty-desc">Toàn bộ đơn hàng bạn đặt tại SPORTIX sẽ được lưu trữ và theo dõi tại đây.</p>
        <a href="products.html" class="btn btn-primary">Khám phá sản phẩm ngay</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h2 style="font-size: 1.5rem; text-transform: uppercase;">Danh Sách Đơn Hàng (${orders.length})</h2>
      <button type="button" onclick="handleClearOrders()" style="color: var(--color-sale); font-size: 0.88rem; font-weight: 600; cursor: pointer;">
        <i class="fa-regular fa-trash-can"></i> Xóa lịch sử
      </button>
    </div>

    <div style="display: flex; flex-direction: column; gap: 24px;">
      ${orders.map(order => `
        <div style="background: #ffffff; border-radius: var(--radius-xl); border: 1px solid var(--color-border); overflow: hidden; box-shadow: var(--shadow-sm);">
          <!-- Order Header -->
          <div style="padding: 18px 24px; background: #f8fafc; border-bottom: 1px solid var(--color-border); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; color: var(--color-dark);">#${order.orderId}</span>
              <span style="color: var(--color-text-muted); font-size: 0.85rem;">• ${new Date(order.createdAt).toLocaleString("vi-VN")}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="background: #fef3c7; color: #b45309; font-weight: 700; font-size: 0.82rem; padding: 4px 10px; border-radius: var(--radius-full);">
                <i class="fa-solid fa-clock"></i> ${order.status || "Đang xử lý"}
              </span>
              <strong style="font-family: var(--font-heading); color: var(--color-primary); font-size: 1.15rem;">
                ${formatCurrency(order.total)}
              </strong>
            </div>
          </div>

          <!-- Order Body Items -->
          <div style="padding: 20px 24px; border-bottom: 1px solid var(--color-border-subtle);">
            ${order.items.map(item => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed var(--color-border-subtle);">
                <div style="display: flex; gap: 12px; align-items: center;">
                  <img src="${item.image}" alt="${item.name}" style="width: 48px; height: 58px; border-radius: 6px; object-fit: cover;">
                  <div>
                    <h4 style="font-size: 0.92rem; margin-bottom: 2px;">${item.name}</h4>
                    <span style="font-size: 0.8rem; color: var(--color-text-muted);">Size: ${item.size} | Màu: ${item.color} | Số lượng: x${item.quantity}</span>
                  </div>
                </div>
                <strong style="font-family: var(--font-heading); font-size: 0.95rem;">${formatCurrency(item.price * item.quantity)}</strong>
              </div>
            `).join("")}
          </div>

          <!-- Order Footer Info -->
          <div style="padding: 16px 24px; background: #fff; font-size: 0.85rem; color: var(--color-text-muted); display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px;">
            <div>
              <span>Người nhận: <strong>${order.customer.fullName}</strong> (${order.customer.phone})</span><br>
              <span>Địa chỉ: <strong>${order.customer.address}, ${order.customer.city}</strong></span>
            </div>
            <div style="text-align: right;">
              <span>Phương thức: <strong>${order.paymentMethod}</strong></span><br>
              ${order.coupon ? `<span>Mã giảm giá: <strong style="color: var(--color-sale);">${order.coupon}</strong></span>` : ""}
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

window.handleClearOrders = function() {
  if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử đơn hàng đã lưu?")) {
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    renderOrdersList();
  }
};

