// ==========================================================================
// SPORTIX - Logic Chi Tiết Sản Phẩm (Product Detail Page)
// ==========================================================================

let currentProduct = null;
let selectedSize = "";
let selectedColor = "";
let quantity = 1;

document.addEventListener("DOMContentLoaded", async () => {
  const products = await getProducts();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || (products[0] && products[0].id);

  currentProduct = getProductById(id);

  if (!currentProduct) {
    document.getElementById("productDetailContainer").innerHTML = `
      <div class="empty-state">
        <h2 class="empty-title">Không tìm thấy sản phẩm!</h2>
        <p class="empty-desc">Sản phẩm này có thể đã ngừng kinh doanh hoặc đường dẫn không đúng.</p>
        <a href="products.html" class="btn btn-primary">Xem các sản phẩm khác</a>
      </div>
    `;
    return;
  }

  renderProductDetails(currentProduct);
  renderRelatedProducts(products, currentProduct);
  initTabs();
  initReviewsSection(currentProduct);
});

function renderProductDetails(product) {
  document.title = `${product.name} | SPORTIX Official`;

  selectedSize = product.sizes ? product.sizes[0] : "M";
  selectedColor = product.colors ? product.colors[0].name : "Tiêu chuẩn";

  const container = document.getElementById("productDetailContainer");
  if (!container) return;

  const isWish = WishlistStorage.has(product.id);

  container.innerHTML = `
    <!-- Breadcrumb -->
    <nav class="breadcrumb" style="margin-bottom: 24px; font-size: 0.88rem; color: var(--color-text-muted);">
      <a href="index.html">Trang chủ</a> <span style="margin: 0 8px;">/</span>
      <a href="products.html?category=${product.category}">${product.categoryName}</a> <span style="margin: 0 8px;">/</span>
      <span style="color: var(--color-dark); font-weight: 600;">${product.name}</span>
    </nav>

    <div class="detail-grid" style="display: grid; grid-template-columns: 1fr; gap: 40px;">
      <!-- Left: Gallery -->
      <div class="gallery-col">
        <div class="main-img-box" style="border-radius: var(--radius-xl); overflow: hidden; background: #f1f5f9; position: relative; margin-bottom: 16px;">
          <img id="detailMainImg" src="${product.images[0]}" alt="${product.name}" style="width: 100%; height: 500px; object-fit: cover;">
          <div class="product-badges" style="position: absolute; top: 16px; left: 16px;">
            ${product.discount ? `<span class="badge badge-sale">-${product.discount}% OFF</span>` : ""}
            ${product.isNew ? `<span class="badge badge-new">NEW ARRIVAL</span>` : ""}
          </div>
        </div>
        <div class="thumbnail-row" style="display: flex; gap: 12px; overflow-x: auto;">
          ${product.images.map((img, i) => `
            <div class="thumb-item ${i === 0 ? "active" : ""}" 
                 onclick="switchDetailImage('${img}', this)"
                 style="width: 80px; height: 95px; border-radius: var(--radius-md); overflow: hidden; cursor: pointer; border: 2px solid ${i === 0 ? "var(--color-primary)" : "transparent"}; flex-shrink: 0; background: #f8fafc;">
              <img src="${img}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Right: Info & Actions -->
      <div class="info-col">
        <span class="product-category" style="font-size: 0.88rem; letter-spacing: 0.05em;">${product.categoryName}</span>
        <h1 style="font-size: 2rem; margin: 6px 0 12px; line-height: 1.3;">${product.name}</h1>
        
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px; font-size: 0.92rem;">
          <div class="product-rating" style="display: flex; align-items: center; gap: 4px; color: #f59e0b; font-weight: 700;">
            <i class="fa-solid fa-star"></i>
            <span>${product.rating}</span>
          </div>
          <span style="color: var(--color-text-muted);">(${product.reviewsCount} đánh giá từ khách hàng)</span>
          <span style="color: var(--color-text-muted);">•</span>
          <span style="color: var(--color-text-muted); font-weight: 600;">Đã bán ${product.sold}</span>
        </div>

        <div style="display: flex; align-items: baseline; gap: 14px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--color-border);">
          <span style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 900; color: var(--color-primary);">
            ${formatCurrency(product.price)}
          </span>
          ${product.originalPrice ? `
            <span style="font-size: 1.25rem; color: var(--color-text-light); text-decoration: line-through;">
              ${formatCurrency(product.originalPrice)}
            </span>
            <span class="badge badge-sale" style="font-size: 0.82rem;">Tiết kiệm ${formatCurrency(product.originalPrice - product.price)}</span>
          ` : ""}
        </div>

        <!-- Color Selector -->
        ${product.colors ? `
          <div style="margin-bottom: 20px;">
            <div class="option-label">
              <span>Màu sắc: <strong id="detailColorLabel" style="color: var(--color-primary);">${selectedColor}</strong></span>
            </div>
            <div class="color-picker" id="detailColorList">
              ${product.colors.map((c, i) => `
                <div class="color-choice ${i === 0 ? "active" : ""}" 
                     style="background: ${c.hex};" 
                     data-color="${c.name}"
                     onclick="selectColor('${c.name}', this)" 
                     title="${c.name}"></div>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Size Selector -->
        ${product.sizes ? `
          <div style="margin-bottom: 28px;">
            <div class="option-label">
              <span>Chọn Kích Cỡ: <strong id="detailSizeLabel" style="color: var(--color-primary);">${selectedSize}</strong></span>
              <a href="javascript:void(0)" onclick="openSizeGuide()" style="color: var(--color-primary); font-size: 0.85rem; text-transform: none; font-weight: 600;">
                <i class="fa-solid fa-ruler-horizontal"></i> Bảng hướng dẫn chọn size
              </a>
            </div>
            <div class="size-picker" id="detailSizeList">
              ${product.sizes.map((s, i) => `
                <button type="button" class="size-btn ${i === 0 ? "active" : ""}" 
                        data-size="${s}"
                        onclick="selectSize('${s}', this)">${s}</button>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Quantity & Buy buttons -->
        <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 30px;">
          <div style="display: flex; gap: 16px; align-items: center;">
            <div class="qty-control" style="height: 52px;">
              <button type="button" class="qty-btn" onclick="updateQty(-1)" style="width: 44px; font-size: 1.1rem;">-</button>
              <input type="text" class="qty-input" id="detailQtyInput" value="1" readonly style="width: 50px; font-size: 1.1rem;">
              <button type="button" class="qty-btn" onclick="updateQty(1)" style="width: 44px; font-size: 1.1rem;">+</button>
            </div>
            <button type="button" class="btn btn-primary" onclick="handleAddToCart(false)" style="flex: 1; height: 52px; font-size: 1rem;">
              <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
            </button>
            <button type="button" class="icon-btn ${isWish ? "active" : ""}" 
                    id="detailWishBtn"
                    onclick="toggleDetailWishlist()" 
                    style="width: 52px; height: 52px; border: 1px solid var(--color-border); border-radius: var(--radius-md);" 
                    title="Yêu thích">
              <i class="fa-${isWish ? "solid" : "regular"} fa-heart" style="font-size: 1.3rem;"></i>
            </button>
          </div>
          <button type="button" class="btn btn-dark btn-block" onclick="handleAddToCart(true)" style="height: 52px; font-size: 1.05rem;">
            <i class="fa-solid fa-bolt"></i> Mua ngay (Thanh toán tức thì)
          </button>
        </div>

        <!-- Cam kết chất lượng -->
        <div style="background: var(--color-bg-body); border-radius: var(--radius-lg); padding: 18px 20px; border: 1px solid var(--color-border);">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 0.88rem;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-truck-fast" style="color: var(--color-primary); font-size: 1.1rem;"></i>
              <span>Freeship đơn từ 500k</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-rotate" style="color: var(--color-primary); font-size: 1.1rem;"></i>
              <span>Đổi trả miễn phí 30 ngày</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-shield-halved" style="color: var(--color-primary); font-size: 1.1rem;"></i>
              <span>Chính hãng 100% SPORTIX</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-certificate" style="color: var(--color-primary); font-size: 1.1rem;"></i>
              <span>Vải QuickDry cao cấp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Apply responsive grid layout for desktop
  const grid = container.querySelector(".detail-grid");
  if (window.innerWidth >= 992 && grid) {
    grid.style.gridTemplateColumns = "1.1fr 1fr";
  }
}

window.switchDetailImage = function(src, thumbEl) {
  const mainImg = document.getElementById("detailMainImg");
  if (mainImg) {
    mainImg.style.opacity = "0.4";
    setTimeout(() => {
      mainImg.src = src;
      mainImg.style.opacity = "1";
    }, 150);
  }
  document.querySelectorAll(".thumb-item").forEach(t => {
    t.style.borderColor = "transparent";
  });
  if (thumbEl) thumbEl.style.borderColor = "var(--color-primary)";
};

window.selectColor = function(colorName, el) {
  selectedColor = colorName;
  document.querySelectorAll("#detailColorList .color-choice").forEach(c => c.classList.remove("active"));
  if (el) el.classList.add("active");
  const label = document.getElementById("detailColorLabel");
  if (label) label.textContent = colorName;
};

window.selectSize = function(sizeVal, el) {
  selectedSize = sizeVal;
  document.querySelectorAll("#detailSizeList .size-btn").forEach(b => b.classList.remove("active"));
  if (el) el.classList.add("active");
  const label = document.getElementById("detailSizeLabel");
  if (label) label.textContent = sizeVal;
};

window.updateQty = function(delta) {
  const input = document.getElementById("detailQtyInput");
  if (!input) return;
  quantity = Math.min(99, Math.max(1, quantity + delta));
  input.value = quantity;
};

window.handleAddToCart = function(isBuyNow = false) {
  if (!currentProduct) return;
  CartStorage.add(currentProduct, selectedSize, selectedColor, quantity);

  if (isBuyNow) {
    window.location.href = "checkout.html";
  } else {
    showToast("Đã thêm vào giỏ hàng!", `${currentProduct.name} - Size: ${selectedSize}`, "success");
    if (window.SPORTIX_OPEN_CART) {
      window.SPORTIX_OPEN_CART();
    }
  }
};

window.toggleDetailWishlist = function() {
  if (!currentProduct) return;
  const added = WishlistStorage.toggle(currentProduct.id);
  const btn = document.getElementById("detailWishBtn");
  if (btn) {
    if (added) {
      btn.innerHTML = '<i class="fa-solid fa-heart" style="font-size: 1.3rem; color: var(--color-sale);"></i>';
      showToast("Đã thêm vào yêu thích", currentProduct.name, "success");
    } else {
      btn.innerHTML = '<i class="fa-regular fa-heart" style="font-size: 1.3rem;"></i>';
      showToast("Đã xóa khỏi yêu thích", currentProduct.name, "info");
    }
  }
};

// Tabs mô tả, thông số & đánh giá
function initTabs() {
  const tabs = document.querySelectorAll(".product-tab-btn");
  const panels = document.querySelectorAll(".product-tab-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetId = tab.getAttribute("data-tab");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });
}

// Đánh giá sản phẩm & Viết nhận xét
function initReviewsSection(product) {
  const descEl = document.getElementById("tabDescriptionContent");
  const specsEl = document.getElementById("tabSpecsContent");
  const reviewsList = document.getElementById("reviewsList");

  if (descEl) {
    descEl.innerHTML = `
      <p style="margin-bottom: 16px; font-size: 1rem; line-height: 1.8;">${product.description}</p>
      <div style="background: #f8fafc; border-left: 4px solid var(--color-primary); padding: 16px 20px; border-radius: 4px; margin-top: 20px;">
        <h4 style="margin-bottom: 8px;">Dòng sản phẩm thể thao cao cấp SPORTIX Elite</h4>
        <p style="font-size: 0.92rem; color: var(--color-text-muted);">
          Được nghiên cứu và thử nghiệm trực tiếp cùng các huấn luyện viên thể hình và vận động viên điền kinh chuyên nghiệp, đảm bảo độ co giãn, thông thoáng và thoải mái cao nhất trong suốt quá trình tập luyện.
        </p>
      </div>
    `;
  }

  if (specsEl && product.features) {
    specsEl.innerHTML = `
      <ul style="display: flex; flex-direction: column; gap: 12px;">
        ${product.features.map(f => `
          <li style="display: flex; align-items: center; gap: 12px; font-size: 0.95rem;">
            <i class="fa-solid fa-circle-check" style="color: var(--color-new); font-size: 1.1rem;"></i>
            <span>${f}</span>
          </li>
        `).join("")}
      </ul>
    `;
  }

  // Danh sách đánh giá mẫu trong LocalStorage
  const storageReviewKey = `sportix_reviews_${product.id}`;
  let reviews = [];
  try {
    const saved = localStorage.getItem(storageReviewKey);
    reviews = saved ? JSON.parse(saved) : [
      { name: "Nguyễn Hoàng Nam", rating: 5, date: "Hôm qua", comment: "Vải cực kỳ thoáng khí, thấm hút mồ hôi siêu nhanh. Mặc tập tạ nặng rất thoải mái không bị dính bết!" },
      { name: "Trần Mai Anh", rating: 5, date: "3 ngày trước", comment: "Form dáng may chuẩn, tôn dáng cực kỳ. Giao hàng nhanh chỉ 1 ngày là có hàng rồi. Sẽ ủng hộ shop dài lâu!" }
    ];
  } catch {
    reviews = [];
  }

  const renderReviews = () => {
    if (!reviewsList) return;
    reviewsList.innerHTML = reviews.map(r => `
      <div style="padding: 16px 0; border-bottom: 1px solid var(--color-border-subtle);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <div>
            <strong>${r.name}</strong>
            <span style="display: inline-block; background: #e0f2fe; color: #0284c7; font-size: 0.72rem; padding: 2px 8px; border-radius: 10px; margin-left: 8px;">Đã mua hàng</span>
          </div>
          <span style="font-size: 0.8rem; color: var(--color-text-muted);">${r.date}</span>
        </div>
        <div style="color: #f59e0b; font-size: 0.85rem; margin-bottom: 8px;">
          ${Array(r.rating).fill('<i class="fa-solid fa-star"></i>').join("")}
        </div>
        <p style="font-size: 0.92rem; color: var(--color-text-main);">${r.comment}</p>
      </div>
    `).join("");
  };

  renderReviews();

  // Xử lý gửi đánh giá mới
  const reviewForm = document.getElementById("addReviewForm");
  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("reviewAuthor");
      const commentInput = document.getElementById("reviewContent");
      const ratingSelect = document.getElementById("reviewRatingSelect");

      if (!nameInput.value.trim() || !commentInput.value.trim()) {
        showToast("Lỗi", "Vui lòng nhập họ tên và nhận xét!", "error");
        return;
      }

      reviews.unshift({
        name: nameInput.value.trim(),
        rating: Number(ratingSelect.value) || 5,
        date: "Vừa xong",
        comment: commentInput.value.trim()
      });

      localStorage.setItem(storageReviewKey, JSON.stringify(reviews));
      renderReviews();
      nameInput.value = "";
      commentInput.value = "";
      showToast("Thành công", "Cảm ơn bạn đã gửi đánh giá!", "success");
    });
  }
}

// Render Sản phẩm liên quan
function renderRelatedProducts(products, current) {
  const container = document.getElementById("relatedProductsGrid");
  if (!container) return;

  const related = products
    .filter(p => p.id !== current.id && (p.category === current.category || p.gender === current.gender))
    .slice(0, 4);

  container.innerHTML = related.map(renderProductCard).join("");
}

