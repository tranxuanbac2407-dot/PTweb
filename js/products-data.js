// Dữ liệu sản phẩm SPORTIX cho toàn bộ website
// Hỗ trợ cả việc mở file trực tiếp (file://) lẫn chạy qua Web Server (http://)
window.SPORTIX_PRODUCTS = [
  {
    id: "SP01",
    name: "Áo Thun Tập Gym SPORTIX ProDry Elite",
    category: "gym",
    categoryName: "Tập Gym & Fitness",
    gender: "nam",
    price: 289000,
    originalPrice: 390000,
    discount: 26,
    rating: 4.9,
    reviewsCount: 184,
    sold: 1250,
    isFeatured: true,
    isNew: true,
    isFlashSale: true,
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Đen Carbon", hex: "#1a1a1a" },
      { name: "Xám Khói", hex: "#707070" },
      { name: "Cam Sportix", hex: "#ff5e14" }
    ],
    description: "Áo thun thể thao chuyên dụng dòng ProDry với công nghệ dệt sợi microfiber thoát mồ hôi siêu tốc. Co giãn 4 chiều mang lại sự thoải mái tuyệt đối trong từng hiệp tập cường độ cao.",
    features: [
      "Vải 88% Polyester & 12% Spandex công nghệ dệt ProDry",
      "Kháng khuẩn, khử mùi hiệu quả cả ngày dài",
      "Đường may phẳng 4 kim chống cọ sát kích ứng da",
      "Logo phản quang phát sáng trong điều kiện thiếu sáng"
    ]
  },
  {
    id: "SP02",
    name: "Quần Short Chạy Bộ SPORTIX AeroSpeed 2-in-1",
    category: "running",
    categoryName: "Chạy Bộ & Điền Kinh",
    gender: "nam",
    price: 329000,
    originalPrice: 450000,
    discount: 27,
    rating: 4.8,
    reviewsCount: 142,
    sold: 980,
    isFeatured: true,
    isNew: false,
    isFlashSale: true,
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Đen Midnight", hex: "#111827" },
      { name: "Xanh Navy", hex: "#1e3a8a" }
    ],
    description: "Quần short thể thao 2 lớp thông minh. Lớp lót nén cơ bên trong ngăn ngừa chấn thương đùi, tích hợp túi để điện thoại chắc chắn không lo rung lắc khi chạy marathon.",
    features: [
      "Thiết kế 2 lớp: Quần gió ngoài siêu nhẹ + Lớp bó trong chống trầy",
      "Túi phụ chống trượt giữ chặt smartphone đến 6.7 inch",
      "Lưng thun dệt kim mềm mại kèm dây rút ẩn điều chỉnh",
      "Xẻ gấu tà bên tăng biên độ sải chân tối đa"
    ]
  },
  {
    id: "SP03",
    name: "Áo Khoác Gió Thể Thao WindShield Pro",
    category: "jacket",
    categoryName: "Áo Khoác & Giữ Nhiệt",
    gender: "unisex",
    price: 489000,
    originalPrice: 690000,
    discount: 29,
    rating: 5.0,
    reviewsCount: 215,
    sold: 1450,
    isFeatured: true,
    isNew: true,
    isFlashSale: false,
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Xanh Rêu Đậm", hex: "#2e4a3d" },
      { name: "Đen Nhám", hex: "#1c1c1c" },
      { name: "Trắng Băng", hex: "#f1f5f9" }
    ],
    description: "Áo khoác gió thể thao cao cấp cản gió và chống nước trượt nước vượt trội với lớp phủ DWR. Trọng lượng siêu nhẹ chỉ 180g, có thể gấp gọn vào túi áo dễ dàng mang theo.",
    features: [
      "Công nghệ phủ trượt nước HydroShield kháng mưa phùn",
      "Lỗ thông hơi laser thông minh sau lưng giúp không bị bí bách",
      "Mũ trùm 3 mảnh ôm đầu chống gió tạt hiệu quả",
      "Khóa kéo YKK chống kẹt siêu bền bỉ"
    ]
  },
  {
    id: "SP04",
    name: "Quần Legging Thể Thao Nữ PowerFit Nâng Mông",
    category: "yoga",
    categoryName: "Yoga & Pilates",
    gender: "nu",
    price: 359000,
    originalPrice: 490000,
    discount: 27,
    rating: 4.9,
    reviewsCount: 320,
    sold: 2100,
    isFeatured: true,
    isNew: true,
    isFlashSale: true,
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Tím Khói Pastel", hex: "#7c6f8a" },
      { name: "Xanh Olive", hex: "#556b2f" },
      { name: "Đen Obsidian", hex: "#111827" }
    ],
    description: "Quần legging định hình vóc dáng với cạp cao giấu bụng và đường gân vòm nâng mông tự nhiên. Chất vải mềm mịn như làn da thứ hai (second-skin feel), co giãn đàn hồi 4 chiều không lộ viền.",
    features: [
      "Chất vải Nulu cao cấp pha Spandex 25% siêu co giãn",
      "Cạp quần cao 11cm nén nhẹ vòng 2 không gây hằn ngấn",
      "Công nghệ may Seamless không đường viền gây cộm",
      "Độ che phủ 100% không bị xuyên thấu khi squat"
    ]
  },
  {
    id: "SP05",
    name: "Áo Bra Thể Thao Nữ High-Impact ShockProof",
    category: "yoga",
    categoryName: "Yoga & Pilates",
    gender: "nu",
    price: 279000,
    originalPrice: 380000,
    discount: 26,
    rating: 4.8,
    reviewsCount: 167,
    sold: 890,
    isFeatured: false,
    isNew: false,
    isFlashSale: false,
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Hồng San Hô", hex: "#f87171" },
      { name: "Đen Classic", hex: "#18181b" },
      { name: "Xanh Pastel", hex: "#93c5fd" }
    ],
    description: "Áo bra trợ lực cao cấp dành riêng cho các bài tập chạy bộ, nhảy dây, HIIT cường độ mạnh. Dây đan chéo lưng chữ X tôn dáng và phân bổ lực đều.",
    features: [
      "Đệm ngực đúc liền khối thoáng khí có thể tháo rời",
      "Dây đai bản to chống trượt và không siết vai",
      "Công nghệ Quick-Drying thấm hút mồ hôi tối đa",
      "Chống rung lắc vòng 1 lên đến 85% khi vận động"
    ]
  },
  {
    id: "SP06",
    name: "Bộ Quần Áo Bóng Đá SPORTIX StrikePro",
    category: "football",
    categoryName: "Bóng Đá & Đội Tuyển",
    gender: "nam",
    price: 299000,
    originalPrice: 420000,
    discount: 28,
    rating: 4.9,
    reviewsCount: 278,
    sold: 1640,
    isFeatured: true,
    isNew: true,
    isFlashSale: false,
    images: [
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Đỏ Rực Lửa", hex: "#dc2626" },
      { name: "Trắng Thanh Lịch", hex: "#f8fafc" },
      { name: "Xanh Hoàng Gia", hex: "#2563eb" }
    ],
    description: "Bộ trang phục thi đấu bóng đá chuyên nghiệp với họa tiết dập nổi 3D hiện đại. Vải gai dệt tổ ong kim cương siêu nhẹ và siêu thoáng khí.",
    features: [
      "Combo gồm cả áo và quần thi đấu đồng bộ",
      "Chất liệu Mè lục giác nhập khẩu thấm hút tức thì",
      "In chuyển nhiệt sắc nét không bong tróc khi giặt máy",
      "Độ bền cơ học cao, chống sờn rách trong các pha tranh chấp"
    ]
  },
  {
    id: "SP07",
    name: "Áo Ba Lỗ Thể Thao SPORTIX Beast Tank",
    category: "gym",
    categoryName: "Tập Gym & Fitness",
    gender: "nam",
    price: 199000,
    originalPrice: 260000,
    discount: 23,
    rating: 4.7,
    reviewsCount: 98,
    sold: 730,
    isFeatured: false,
    isNew: false,
    isFlashSale: true,
    images: [
      "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd208?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Xám Xi Măng", hex: "#64748b" },
      { name: "Đen Nhám", hex: "#1e293b" },
      { name: "Trắng Tinh", hex: "#ffffff" }
    ],
    description: "Áo ba lỗ gym khoét nách rộng kiểu dáng Stringer chuẩn gymer, giúp lộ cơ xô và vai tối đa. Chất vải cotton pha spandex co giãn cực tốt.",
    features: [
      "Form dáng Drop-Armhole khoe trọn vóc dáng tập luyện",
      "95% Cotton Organic mềm mát + 5% Spandex đàn hồi",
      "Hút mồ hôi tự nhiên và êm dịu cho da",
      "Đường lai bo cong tinh tế chống cuộn mép"
    ]
  },
  {
    id: "SP08",
    name: "Áo Polo Thể Thao Thấm Hút PrimePolo",
    category: "gym",
    categoryName: "Tập Gym & Fitness",
    gender: "unisex",
    price: 339000,
    originalPrice: 460000,
    discount: 26,
    rating: 4.9,
    reviewsCount: 110,
    sold: 820,
    isFeatured: true,
    isNew: true,
    isFlashSale: false,
    images: [
      "https://images.unsplash.com/photo-1625910513413-5b822dca8433?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Trắng Phối Đen", hex: "#ffffff" },
      { name: "Xanh Navy Lịch Lãm", hex: "#0f172a" },
      { name: "Đỏ Đô Nổi Bật", hex: "#881337" }
    ],
    description: "Chiếc áo polo thể thao đa năng - mặc đi đánh tennis, chơi golf hoặc đi làm, đi chơi đều lịch sự và thoải mái. Cổ bẻ dệt bo mềm chống quăn.",
    features: [
      "Vải Pique thể thao dệt mắt chim siêu thông thoáng",
      "Khuy cài khắc laser logo SPORTIX sang trọng",
      "Chống tia UV UPF 50+ bảo vệ da khi chơi ngoài trời",
      "Không nhăn, không xù lông sau hàng trăm lần giặt"
    ]
  },
  {
    id: "SP09",
    name: "Quần Dài Jogger Nỉ Thể Thao TechFleece",
    category: "gym",
    categoryName: "Tập Gym & Fitness",
    gender: "unisex",
    price: 389000,
    originalPrice: 520000,
    discount: 25,
    rating: 4.8,
    reviewsCount: 175,
    sold: 1130,
    isFeatured: false,
    isNew: false,
    isFlashSale: false,
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Xám Tiêu", hex: "#94a3b8" },
      { name: "Đen Khói", hex: "#1e293b" }
    ],
    description: "Quần jogger dáng suông bo gấu trẻ trung, chất vải nỉ da cá cao cấp dày dặn nhưng thoáng khí, thích hợp khởi động trước giờ tập hoặc mặc giữ ấm ngày se lạnh.",
    features: [
      "Chất nỉ chân cua 2 da mềm mịn, không bai dão đầu gối",
      "2 túi bên sâu có khóa zip giọt lệ an toàn đựng ví, điện thoại",
      "Ống quần bo chun co giãn ôm mắt cá chân tôn dáng giày",
      "Dây thắt eo thời trang đính đầu kim loại cao cấp"
    ]
  },
  {
    id: "SP10",
    name: "Áo Dài Tay Chạy Bộ Chống Nắng UV-Guard",
    category: "running",
    categoryName: "Chạy Bộ & Điền Kinh",
    gender: "unisex",
    price: 319000,
    originalPrice: 420000,
    discount: 24,
    rating: 4.9,
    reviewsCount: 134,
    sold: 950,
    isFeatured: false,
    isNew: true,
    isFlashSale: false,
    images: [
      "https://images.unsplash.com/photo-1483721074577-0130dbb703e0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Xanh Băng Ice Blue", hex: "#bae6fd" },
      { name: "Xám Trắng", hex: "#e2e8f0" },
      { name: "Đen Stealth", hex: "#0f172a" }
    ],
    description: "Áo dài tay chống nắng với chỉ số UPF 50+, ngăn chặn 99% tác hại của tia cực tím. Thiết kế xỏ ngón tay cái thông minh bảo vệ mu bàn tay khi chạy dưới trời nắng.",
    features: [
      "Chỉ số chống nắng UPF 50+ đã qua kiểm định",
      "Lỗ xỏ ngón cái ở ống tay giữ tay áo không bị co xếch",
      "Vải mát lạnh Cooling Touch giảm 3°C nhiệt độ bề mặt da",
      "Vệt phản quang 360 độ an toàn khi chạy đêm"
    ]
  },
  {
    id: "SP11",
    name: "Áo Croptop Thể Thao Nữ ActiveFlow",
    category: "yoga",
    categoryName: "Yoga & Pilates",
    gender: "nu",
    price: 229000,
    originalPrice: 320000,
    discount: 28,
    rating: 4.8,
    reviewsCount: 89,
    sold: 640,
    isFeatured: false,
    isNew: false,
    isFlashSale: true,
    images: [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Hồng Baby", hex: "#fbcfe8" },
      { name: "Trắng Tinh Khôi", hex: "#ffffff" },
      { name: "Đen Huyền Bí", hex: "#111827" }
    ],
    description: "Áo croptop tay ngắn thời thượng phối cùng legging tạo set đồ tập gym/yoga cực năng động. Chiều dài vừa vặn chạm eo trên, khéo léo khoe cơ bụng săn chắc.",
    features: [
      "Vải thun cotton tăm co giãn 4 chiều mềm mại",
      "Form ôm sát cơ thể vừa vặn không gây gò bó",
      "Khử mùi hôi và thông thoáng khi tập bài nặng",
      "Dễ phối với quần short, chân váy tennis hoặc legging"
    ]
  },
  {
    id: "SP12",
    name: "Áo Hoodie Tập Luyện Heavyweight WarmUp",
    category: "jacket",
    categoryName: "Áo Khoác & Giữ Nhiệt",
    gender: "unisex",
    price: 549000,
    originalPrice: 750000,
    discount: 27,
    rating: 5.0,
    reviewsCount: 162,
    sold: 920,
    isFeatured: true,
    isNew: true,
    isFlashSale: false,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Đen Đậm", hex: "#09090b" },
      { name: "Xám Tro", hex: "#475569" },
      { name: "Cam Đất Nổi Bật", hex: "#c2410c" }
    ],
    description: "Áo hoodie thể thao phom rộng oversize với chất nỉ dày 380gsm giữ ấm hoàn hảo cho vận động viên trước và sau giờ thi đấu hoặc tập gym mùa đông.",
    features: [
      "Định lượng vải 380gsm dày dặn đứng form cực đẹp",
      "Túi kangaroo lớn phía trước giữ ấm đôi bàn tay",
      "Mũ trùm 2 lớp có dây rút bọc kim loại",
      "Hình in slogan 'BREAK YOUR LIMITS' dập nổi bền màu"
    ]
  }
];

// Helper lấy danh sách sản phẩm (đồng bộ hoặc fetch từ products.json nếu có)
async function getProducts() {
  if (window.SPORTIX_PRODUCTS && window.SPORTIX_PRODUCTS.length > 0) {
    return window.SPORTIX_PRODUCTS;
  }
  try {
    const res = await fetch("data/products.json");
    if (res.ok) {
      const data = await res.json();
      window.SPORTIX_PRODUCTS = data;
      return data;
    }
  } catch (e) {
    console.warn("Using fallback products", e);
  }
  return window.SPORTIX_PRODUCTS || [];
}

function getProductById(id) {
  const products = window.SPORTIX_PRODUCTS || [];
  return products.find(p => p.id === id) || null;
}

