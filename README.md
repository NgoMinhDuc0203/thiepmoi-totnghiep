# 🎓 Trang Web Thiệp Mời Lễ Tốt Nghiệp - Ngô Minh Đức

Trang web thiệp mời dự lễ tốt nghiệp cao cấp, tinh tế được xây dựng hoàn toàn bằng **HTML, CSS, JavaScript thuần**, lấy cảm hứng từ mẫu thiệp **Polaroid Beige** của Ivy Invi. Trang web tối ưu hoàn hảo cho hiển thị trên điện thoại di động (mobile-first), tích hợp sổ lưu bút trực tuyến kết nối với **Google Sheets** và sẵn sàng đưa lên **GitHub Pages**.

---

## 📸 Hình ảnh trong dự án
Hai bức ảnh đính kèm đã được thiết lập sẵn trong thư mục `images/`:
1. `images/chan-dung.jpg`: Ảnh chân dung tốt nghiệp của tân khoa Ngô Minh Đức — đặt trong khung Polaroid tinh tế với ghim vàng kim loại và chú thích tân khoa.
2. `images/bang-ron.jpg`: Dải băng tốt nghiệp K22 HUTECH — **thiết kế phủ dọc từ đỉnh thiệp xuống ở mép bên phải** (chuẩn theo mẫu thiệp tốt nghiệp cao cấp mà bạn yêu cầu), với ngôi sao ✦, huy hiệu HUTECH, tên tân khoa `NGÔ MINH ĐỨC` chữ dọc sang trọng, viền vàng ánh kim và đuôi nơ vát nhọn chữ V.

---

## 📁 Cấu trúc thư mục dự án
```text
thiepmoi-totnghiep-minh-duc/
├── index.html               # File giao diện chính HTML5
├── css/
│   └── style.css            # File phong cách giao diện Polaroid Beige
├── js/
│   └── script.js            # Xử lý âm nhạc, đếm ngược, cuộn trang & sổ lưu bút
├── images/
│   ├── chan-dung.jpg        # Ảnh chân dung tân khoa (Ảnh 1)
│   └── bang-ron.jpg         # Ảnh dải băng tốt nghiệp (Ảnh 2)
├── google-apps-script.js    # Mã nguồn Google Apps Script kết nối Google Sheets
└── README.md                # Tài liệu hướng dẫn sử dụng & xuất bản
```

---

## 🎨 Điểm nổi bật & Tính năng
1. **Phong cách Polaroid Beige**:
   - Tone màu nền kem ấm áp (`#FAF6F0`), màu chữ than sẫm sang trọng (`#2C2623`), cùng điểm nhấn đỏ rượu sẫm (`#7C1D24`) và vàng ánh kim (`#C29B38`) đồng điệu với màu sắc dải băng tốt nghiệp HUTECH K22.
   - Khung ảnh Polaroid cao cấp chuẩn mẫu: dán băng dính kraft washi tape chéo hai góc (top-right & bottom-left), dòng chữ dọc mép trái, chữ viết tay *"new chapter, new adventures ♡"*, hình vẽ tim doodle và con dấu bưu điện tốt nghiệp tròn *"THE NEXT CHAPTER AWAITS • 2026"*.
2. **Typography chuẩn tiếng Việt**:
   - Kết hợp giữa nét cổ điển trang trọng của **Playfair Display / Cormorant Garamond** và nét thanh thoát, hiện đại của **Be Vietnam Pro**.
3. **Hiệu ứng mượt mà**:
   - Hiệu ứng cuộn hiển thị dần từng phần (*Scroll Reveal*).
   - Nút phát nhạc nền đĩa than xoay tròn nhẹ nhàng ở góc màn hình.
4. **Sổ lưu bút trực tuyến (Guestbook)**:
   - Nhập tên và lời chúc (giới hạn 500 ký tự với bộ đếm trực quan).
   - Nút **💡 Gợi ý lời chúc** tích hợp sẵn 6 lời chúc ý nghĩa, có thể chèn nhanh chỉ bằng một chạm.
   - Nút gửi đen than bo tròn sang trọng.
   - Lưu trữ dữ liệu trực tiếp vào Google Sheets thông qua Google Apps Script (hoạt động miễn phí 100%, không cần máy chủ riêng).

---

## ⚙️ Hướng dẫn tùy chỉnh nội dung nhanh

Mở file `index.html` và chỉnh sửa các mục cần thiết (đã được đánh dấu chú thích rất rõ):
- **Tên & Thông tin tân khoa**: Tìm kiếm từ khóa `Ngô Minh Đức`, `Khóa K22`, `Ngành Công Nghệ Thông Tin`.
- **Thời gian & Địa điểm**:
  - Thời gian: `07:30 - Thứ Bảy, Ngày 15 Tháng 08 Năm 2026`
  - Địa điểm: `Hội trường Lớn (Tầng 4) - Trụ sở 475A Điện Biên Phủ, P.25, Q. Bình Thạnh, TP.HCM`
  - Đường link Google Maps: Tìm thẻ `<a href="https://maps.google.com/?q=..." class="btn btn-primary map-btn">` và dán link vị trí của bạn vào `href`.
- **Thông tin liên hệ (Footer)**:
  - Thay số điện thoại tại `tel:0900000000`
  - Thay link Zalo tại `https://zalo.me/0900000000`
  - Thay link Facebook tại `https://facebook.com/...`
- **Thời gian đếm ngược**:
  - Mở `js/script.js`, dòng 25: sửa lại biến `GRADUATION_DATE = new Date("2026-08-15T07:30:00+07:00").getTime();`.

---

## 📊 Hướng dẫn kết nối Google Sheets cho Sổ lưu bút

Để lưu lại tất cả lời chúc của bạn bè vào bảng tính Google Sheets của bạn:

1. Truy cập [Google Sheets](https://sheets.google.com) và tạo một trang tính mới (Đặt tên: `SoLuuBut_TotNghiep`).
2. Trên thanh menu, chọn **Tiện ích mở rộng (Extensions)** > **Apps Script**.
3. Xóa đoạn mã mặc định trong file `Code.gs`, mở file `google-apps-script.js` trong thư mục dự án và sao chép toàn bộ nội dung dán vào.
4. Nhấn **Ctrl + S** (hoặc biểu tượng Đĩa mềm) để lưu lại.
5. Nhấn nút **Triển khai (Deploy)** ở góc trên bên phải > Chọn **Tùy chọn triển khai mới (New deployment)**.
   - Nhấn vào biểu tượng bánh răng ⚙️ bên cạnh mục "Chọn loại" > Chọn **Ứng dụng web (Web app)**.
   - **Mô tả**: Nhập "Guestbook API".
   - **Thực thi dưới tên (Execute as)**: Chọn **Tôi (Me / email của bạn)**.
   - **Ai có quyền truy cập (Who has access)**: Chọn **Bất kỳ ai (Anyone)** *(Rất quan trọng để bạn bè gửi được lời chúc)*.
6. Nhấn nút **Triển khai (Deploy)**. Google sẽ yêu cầu ủy quyền: Chọn **Xem lại quyền** > Chọn tài khoản Google của bạn > Chọn **Nâng cao (Advanced)** > Nhấn vào liên kết **Đi tới ... (không an toàn)** > Chọn **Cho phép (Allow)**.
7. Google sẽ cung cấp cho bạn một **URL ứng dụng web** (kết thúc bằng `/exec`). Hãy sao chép link này!
8. Mở file `js/script.js`, tìm dòng số 18:
   ```javascript
   const SCRIPT_URL = "DÁN_LINK_WEB_APP_CỦA_BẠN_VÀO_ĐÂY";
   ```
   và thay bằng link của bạn:
   ```javascript
   const SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
9. Lưu file lại. Giờ đây mọi lời chúc gửi từ website sẽ tự động lưu vào Google Sheets của bạn theo thời gian thực!

---

## 🚀 Hướng dẫn đưa lên GitHub Pages để chạy trực tiếp

Trang web sử dụng 100% mã nguồn tĩnh (HTML, CSS, JS thuần) nên cực kỳ thích hợp để chạy miễn phí trên GitHub Pages:

1. **Khởi tạo Git & Đưa mã nguồn lên GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Thiệp mời lễ tốt nghiệp Ngô Minh Đức"
   git branch -M main
   git remote add origin https://github.com/TÊN_GITHUB_CỦA_BẠN/TÊN_REPO.git
   git push -u origin main
   ```
2. **Kích hoạt GitHub Pages**:
   - Trên trình duyệt, vào trang Repository của bạn trên GitHub.
   - Nhấp vào tab **Settings** (Cài đặt) > Mục menu bên trái chọn **Pages**.
   - Tại mục **Build and deployment** > **Branch**: Chọn nhánh `main` (hoặc `master`), thư mục chọn `/ (root)` > Nhấn **Save**.
3. **Nhận link website**:
   - Sau khoảng 1-2 phút, GitHub sẽ cấp cho bạn đường link website có dạng:
     `https://ten-cua-ban.github.io/ten-repo/`
   - Bạn có thể gửi đường link này qua Zalo, Messenger, Facebook để mời bạn bè và người thân!

---

## 💌 Cách làm khung xem trước thiệp mời (Link Preview Card) trên Zalo / Messenger

Để khi bạn dán đường link thiệp gửi cho bạn bè qua Zalo hoặc Messenger mà nó **tự động đóng khung đẹp mắt** (gồm Tiêu đề in đậm, Lời nhắn & Ảnh chân dung thumbnail) y hệt như các trang thiệp mời chuyên nghiệp:

1. Mở file `index.html`, tìm dòng 22 (thẻ `og:image`):
   ```html
   <meta property="og:image" content="./images/chan-dung.jpg">
   ```
2. Thay bằng đường link online tuyệt đối của GitHub Pages của bạn:
   ```html
   <meta property="og:image" content="https://ten-cua-ban.github.io/ten-repo/images/chan-dung.jpg">
   ```
   *(Zalo & Facebook yêu cầu đường link ảnh đầy đủ bắt đầu bằng `https://` thì hệ thống mới tải được ảnh hiển thị lên khung tin nhắn)*.
3. **Mẹo nếu Zalo chưa hiện khung ngay**:
   - Do Zalo có bộ nhớ đệm (cache), lần đầu gửi thử bạn có thể thêm đuôi `?v=1` vào sau link (ví dụ: `https://ten-cua-ban.github.io/ten-repo/?v=1`), Zalo sẽ lập tức tải lại và hiện khung xem trước cực kỳ sang trọng!
