// ==========================================================================
// SPORTIX - Logic Trang Cửa Hàng / Danh Sách Sản Phẩm (Products Page)
// ==========================================================================

let allProducts = [];
let currentFilters = {
  category: "all",
  gender: "all",
  maxPrice: 1000000,
  size: "all",
  sort: "default",
  search: ""
};

document.addEventListener("DOMContentLoaded", async () => {
  allProducts = await getProducts();
  parseUrlParams();
  initFilterControls();
  applyFiltersAndRender();
});

// Đọc query param từ URL (ví dụ: ?category=gym hoặc ?search=ao)
function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("category")) {
    currentFilters.category = params.get("category");
  }
  if (params.has("gender")) {
    currentFilters.gender = params.get("gender");
  }
  if (params.has("search")) {
    currentFilters.search = params.get("search");
    const searchInput = document.getElementById("shopSearchInput");
    if (searchInput) searchInput.value = currentFilters.search;
  }
}

// Khởi tạo các sự kiện bộ lọc
function initFilterControls() {
  // 1. Radio / Buttons Danh mục
  const catLinks = document.querySelectorAll("[data-filter-cat]");
  catLinks.forEach(el => {
    if (el.getAttribute("data-filter-cat") === currentFilters.category) {
      el.classList.add("active");
    }
    el.addEventListener("click", (e) => {
      e.preventDefault();
      catLinks.forEach(l => l.classList.remove("active"));
      el.classList.add("active");
      currentFilters.category = el.getAttribute("data-filter-cat");
      applyFiltersAndRender();
    });
  });

  // 2. Lọc Giới tính
  const genderRadios = document.querySelectorAll("input[name='filterGender']");
  genderRadios.forEach(radio => {
    if (radio.value === currentFilters.gender) radio.checked = true;
    radio.addEventListener("change", () => {
      currentFilters.gender = radio.value;
      applyFiltersAndRender();
    });
  });

  // 3. Slider Khoảng giá
  const priceSlider = document.getElementById("priceRangeInput");
  const priceLabel = document.getElementById("priceRangeValue");
  if (priceSlider && priceLabel) {
    priceSlider.addEventListener("input", () => {
      currentFilters.maxPrice = Number(priceSlider.value);
      priceLabel.textContent = formatCurrency(currentFilters.maxPrice);
      applyFiltersAndRender();
    });
  }

  // 4. Lọc Size
  const sizeBtns = document.querySelectorAll(".filter-size-btn");
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
        currentFilters.size = "all";
      } else {
        sizeBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilters.size = btn.getAttribute("data-size");
      }
      applyFiltersAndRender();
    });
  });

  // 5. Sắp xếp (Sort)
  const sortSelect = document.getElementById("productSortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentFilters.sort = sortSelect.value;
      applyFiltersAndRender();
    });
  }

  // 6. Tìm kiếm trong trang cửa hàng
  const shopSearchInput = document.getElementById("shopSearchInput");
  if (shopSearchInput) {
    shopSearchInput.addEventListener("input", (e) => {
      currentFilters.search = e.target.value.trim();
      applyFiltersAndRender();
    });
  }

  // 7. Nút đặt lại bộ lọc
  const resetBtn = document.getElementById("resetFiltersBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      currentFilters = {
        category: "all",
        gender: "all",
        maxPrice: 1000000,
        size: "all",
        sort: "default",
        search: ""
      };
      if (shopSearchInput) shopSearchInput.value = "";
      if (priceSlider && priceLabel) {
        priceSlider.value = 1000000;
        priceLabel.textContent = formatCurrency(1000000);
      }
      catLinks.forEach(l => l.classList.remove("active"));
      const allCat = document.querySelector("[data-filter-cat='all']");
      if (allCat) allCat.classList.add("active");
      genderRadios.forEach(r => r.checked = r.value === "all");
      sizeBtns.forEach(b => b.classList.remove("active"));
      if (sortSelect) sortSelect.value = "default";
      applyFiltersAndRender();
    });
  }

  // Toggle filter drawer trên di động
  const mobileFilterBtn = document.getElementById("toggleMobileFilter");
  const filterSidebar = document.querySelector(".shop-sidebar");
  const closeFilterBtn = document.getElementById("closeMobileFilter");
  if (mobileFilterBtn && filterSidebar) {
    mobileFilterBtn.addEventListener("click", () => {
      filterSidebar.classList.add("active");
    });
  }
  if (closeFilterBtn && filterSidebar) {
    closeFilterBtn.addEventListener("click", () => {
      filterSidebar.classList.remove("active");
    });
  }
}

// Áp dụng bộ lọc và render danh sách
function applyFiltersAndRender() {
  let result = [...allProducts];

  // Lọc theo từ khóa
  if (currentFilters.search) {
    const q = currentFilters.search.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(q) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  // Lọc danh mục
  if (currentFilters.category !== "all") {
    result = result.filter(p => p.category === currentFilters.category);
  }

  // Lọc giới tính
  if (currentFilters.gender !== "all") {
    result = result.filter(p => p.gender === currentFilters.gender || p.gender === "unisex");
  }

  // Lọc mức giá
  result = result.filter(p => p.price <= currentFilters.maxPrice);

  // Lọc theo size
  if (currentFilters.size !== "all") {
    result = result.filter(p => p.sizes && p.sizes.includes(currentFilters.size));
  }

  // Sắp xếp
  if (currentFilters.sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (currentFilters.sort === "rating-desc") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (currentFilters.sort === "newest") {
    result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  // Cập nhật số lượng
  const countEl = document.getElementById("productsCountText");
  if (countEl) {
    countEl.textContent = `Hiển thị ${result.length} sản phẩm`;
  }

  // Render lưới sản phẩm
  const grid = document.getElementById("shopProductsGrid");
  if (!grid) return;

  if (result.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; background: #fff; border-radius: var(--radius-lg); padding: 50px 20px;">
        <div class="empty-icon">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <h3 class="empty-title">Không tìm thấy sản phẩm nào!</h3>
        <p class="empty-desc">
          Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh lại các tiêu chí bộ lọc.
        </p>
        <button type="button" class="btn btn-outline" id="emptyResetBtn" onclick="document.getElementById('resetFiltersBtn').click()">
          Đặt lại bộ lọc
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = result.map(renderProductCard).join("");
}

