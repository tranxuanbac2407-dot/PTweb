# SPORTIX - Website Thời Trang Thể Thao Cao Cấp

> **Slogan:** *Break Your Limits - Bứt Phá Mọi Giới Hạn*

SPORTIX là trang web thương mại điện tử chuyên cung cấp quần áo và phụ kiện thể thao (Gym & Fitness, Chạy bộ, Bóng đá, Yoga/Pilates, Áo khoác & Giữ nhiệt).

---

## 🚀 Công Nghệ Sử Dụng

- **Giao diện:** HTML5 ngữ nghĩa, CSS3 (Flexbox, Grid, CSS Custom Properties, Responsive design chuẩn Mobile & Desktop).
- **Chức năng:** **Vanilla JavaScript thuần** (100% không dùng framework như React, Vue hay Angular).
- **Lưu trữ dữ liệu:** **JSON & LocalStorage** (quản lý trạng thái Client-side không phụ thuộc backend phức tạp).
- **Icon:** Font Awesome 6 CDN.
- **Typography:** Google Fonts (Montserrat + Plus Jakarta Sans).

---

## ✨ Các Tính Năng Giao Diện Nổi Bật (SPORTIX UI)

1. **Thanh Điều Hướng & Chuyển Tab Danh Mục Trực Tiếp**:
   - Header sticky, thông báo ưu đãi giờ vàng.
   - Các tab chính (*Trang chủ, Gym & Fitness, Chạy bộ, Bóng đá, Yoga / Nữ, Áo khoác gió, Sale HOT*) cho phép chuyển tab và lọc sản phẩm linh hoạt ngay trên giao diện mà không cần reload trang.
   - Các tab khác chưa cần vào trong giai đoạn này được tích hợp thông báo Toast thân thiện: *"Tab này chưa cần vào theo yêu cầu hiện tại"*.

2. **Hero Banner & Trust Proof Vận Động Viên**:
   - Slogan ấn tượng: *Break Your Limits - Bứt Phá Mọi Giới Hạn*.
   - Khối huy hiệu động giới thiệu công nghệ thoát ẩm siêu tốc QuickDry.
   - Chỉ số tin cậy 4.9★ từ hơn 50.000 vận động viên thể hình và điền kinh.
   - Nút kêu gọi hành động cuộn mượt xuống bộ sưu tập và Flash Sale.

3. **Danh Mục Thể Thao Nổi Bật (Showcase)**:
   - 5 bộ sưu tập trọng tâm: Gym, Running, Football, Yoga, Windbreaker.
   - Tương tác click danh mục tự động cuộn và lọc tab tương ứng.

4. **Khối Flash Sale Giờ Vàng**:
   - Đồng hồ đếm ngược thời gian thực (Giờ : Phút : Giây).
   - Thanh tiến độ hiển thị số lượng đã bán và suất ưu đãi còn lại trên từng card.

5. **Card Sản Phẩm & Modal Xem Nhanh (Quick View)**:
   - Ảnh góc rộng tỉ lệ thể thao 4:5, huy hiệu giảm giá và mác NEW / HOT.
   - Đốm chọn màu sắc trực quan (Color Swatches).
   - Modal xem nhanh chi tiết sản phẩm, chọn size, xem chất liệu mà không cần chuyển trang.

6. **Bảng Quy Chuẩn Chọn Size (Size Guide Modal)**:
   - Modal tra cứu kích cỡ chuẩn từ S đến XXL dựa trên cân nặng, chiều cao, số đo ngực và form dáng (Slim-fit, Regular, Athletic, Oversize).

7. **Khối Giới Thiệu 4 Trụ Cột Công Nghệ Sợi Dệt**:
   - *ProDry™ Micro-Channel*: Thoát ẩm siêu tốc.
   - *Ultra-Flex 360°*: Co giãn 4 chiều vận động tối đa.
   - *Anti-Odor Silver-Ion*: Kháng khuẩn ion bạc ngăn mùi.
   - *HydroShield DWR*: Cản gió và kháng nước trượt mưa phùn.

8. **Đánh Giá Trải Nghiệm Thực Tế (Testimonials)**:
   - Lời nhận xét và chứng thực chất lượng từ các huấn luyện viên thể hình (PT), vận động viên marathon và đội trưởng bóng đá.

---

## 📁 Cấu Trúc Thư Mục

```
PTweb/
├── index.html                 # Trang chủ nổi bật
├── products.html              # Cửa hàng, bộ lọc & tìm kiếm
├── product-detail.html        # Chi tiết sản phẩm & đánh giá
├── cart.html                  # Giỏ hàng & áp dụng mã giảm giá
├── checkout.html              # Thanh toán & tạo đơn hàng
├── orders.html                # Quản lý lịch sử đơn hàng đã đặt
├── css/
│   ├── style.css              # Hệ thống biến màu sắc, typography, reset & layout
│   └── components.css         # UI components: Product card, Hero, Drawer, Modal, Toast
├── js/
│   ├── products-data.js       # Dữ liệu sản phẩm mẫu (hỗ trợ cả file:// và http://)
│   ├── storage.js             # Quản lý LocalStorage (Cart, Wishlist, Orders, Voucher)
│   ├── main.js                # Core logic: Header, Drawer, Toast, QuickView modal
│   ├── home.js                # Logic trang chủ (Countdown, Flash sale, Featured)
│   ├── products.js            # Logic trang shop (Filter đa chiều, Search, Sort)
│   ├── product-detail.js      # Logic trang chi tiết (Gallery, Tabs, Size, Reviews)
│   ├── cart.js                # Logic trang giỏ hàng (Progress bar freeship, Coupon)
│   ├── checkout.js            # Logic thanh toán (Form validation, Order creation)
│   └── orders.js              # Logic lịch sử đơn hàng
└── data/
    └── products.json          # File JSON dữ liệu sản phẩm gốc
```

---

## 💻 Cách Khởi Chạy Website

Website được thiết kế hoàn toàn bằng HTML, CSS và JavaScript thuần nên bạn có thể chạy theo bất kỳ cách nào:

### Cách 1: Mở trực tiếp (Không cần cài đặt)
Chỉ cần nhấp đúp vào tệp **`index.html`** trên máy tính để mở trên trình duyệt (Chrome, Safari, Edge, Firefox).

### Cách 2: Chạy với Live Server hoặc Local HTTP Server
```bash
# Sử dụng Python có sẵn trên máy:
python3 -m http.server 8000

# Hoặc dùng npx serve:
npx serve .
```
Sau đó truy cập: `http://localhost:8000` trên trình duyệt.
