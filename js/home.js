// ==========================================================================
// SPORTIX - Logic Trang Chủ (Home Page)
// ==========================================================================

document.addEventListener("DOMContentLoaded", async () => {
  const products = await getProducts();
  initCountdownTimer();
  renderFlashSale(products);
  renderFeatured(products);
  renderNewArrivals(products);
  initCategoryPills(products);
});

// Đồng hồ đếm ngược Flash Sale (tự động đếm lùi)
function initCountdownTimer() {
  const hoursEl = document.getElementById("countdownHours");
  const minsEl = document.getElementById("countdownMins");
  const secsEl = document.getElementById("countdownSecs");

  if (!hoursEl || !minsEl || !secsEl) return;

  // Đếm ngược 8 giờ từ lúc truy cập
  let targetTime = localStorage.getItem("sportix_flash_end");
  if (!targetTime || new Date(targetTime).getTime() <= Date.now()) {
    targetTime = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
    localStorage.setItem("sportix_flash_end", targetTime);
  }

  const update = () => {
    const diff = new Date(targetTime).getTime() - Date.now();
    if (diff <= 0) {
      // Reset vòng đếm mới
      const newTarget = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
      localStorage.setItem("sportix_flash_end", newTarget);
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(mins).padStart(2, "0");
    secsEl.textContent = String(secs).padStart(2, "0");
  };

  update();
  setInterval(update, 1000);
}

// Render Flash Sale
function renderFlashSale(products) {
  const container = document.getElementById("flashSaleGrid");
  if (!container) return;

  const flashItems = products.filter(p => p.isFlashSale).slice(0, 4);
  container.innerHTML = flashItems.map(renderProductCard).join("");
}

// Render Sản phẩm nổi bật
function renderFeatured(products) {
  const container = document.getElementById("featuredGrid");
  if (!container) return;

  const featured = products.filter(p => p.isFeatured).slice(0, 8);
  container.innerHTML = featured.map(renderProductCard).join("");
}

// Render Hàng mới về
function renderNewArrivals(products) {
  const container = document.getElementById("newArrivalsGrid");
  if (!container) return;

  const newItems = products.filter(p => p.isNew).slice(0, 4);
  container.innerHTML = newItems.map(renderProductCard).join("");
}

// Bộ lọc tabs danh mục nhanh trên trang chủ
function initCategoryPills(products) {
  const pills = document.querySelectorAll(".home-category-pills .filter-pill");
  const container = document.getElementById("categoryProductsGrid");
  if (!pills.length || !container) return;

  const filterAndRender = (category) => {
    let filtered = products;
    if (category !== "all") {
      filtered = products.filter(p => p.category === category);
    }
    container.innerHTML = filtered.slice(0, 8).map(renderProductCard).join("");
  };

  filterAndRender("all");

  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const cat = pill.getAttribute("data-category");
      filterAndRender(cat);
    });
  });
}

