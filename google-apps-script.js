/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT - SỔ LƯU BÚT THIỆP MỜI TỐT NGHIỆP
 * ==============================================================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT TỪNG BƯỚC:
 * ------------------------------------------------------------------------------
 * Bước 1: Mở trình duyệt, truy cập https://sheets.google.com và tạo một trang tính mới.
 *         Đặt tên trang tính (ví dụ: "SoLuuBut_TotNghiep_MinhDuc").
 * 
 * Bước 2: Trên thanh menu, chọn:
 *         Tiện ích mở rộng (Extensions) -> Apps Script
 * 
 * Bước 3: Xóa toàn bộ mã mặc định trong tệp Code.gs và DÁN TOÀN BỘ NỘI DUNG TỆP NÀY VÀO.
 * 
 * Bước 4: Nhấn biểu tượng Lưu (Save / Ctrl+S).
 * 
 * Bước 5: Bấm nút "Triển khai" (Deploy) ở góc trên bên phải -> Chọn "Tùy chọn triển khai mới" (New deployment).
 *         - Chọn loại: Nhấp vào biểu tượng bánh răng ⚙️ -> chọn "Ứng dụng web" (Web app).
 *         - Mô tả (Description): "Guestbook API"
 *         - Thực thi dưới tên (Execute as): "Tôi" (Me / your-email@gmail.com)
 *         - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone)  <--- CỰC KỲ QUAN TRỌNG!
 * 
 * Bước 6: Nhấn nút "Triển khai" (Deploy).
 *         - Google sẽ hỏi quyền: Chọn "Xem lại quyền" (Review Permissions) -> Chọn tài khoản Google của bạn.
 *         - Nếu xuất hiện màn hình "Google chưa xác minh ứng dụng này": Bấm vào "Nâng cao" (Advanced) 
 *           -> Bấm "Đi tới ... (không an toàn)" -> Bấm "Cho phép" (Allow).
 * 
 * Bước 7: Sao chép đường link "URL ứng dụng web" (Web app URL - kết thúc bằng /exec).
 * 
 * Bước 8: Mở file `js/script.js` trong thư mục dự án, tìm đến dòng:
 *         const SCRIPT_URL = "DÁN_LINK_WEB_APP_CỦA_BẠN_VÀO_ĐÂY";
 *         và thay thế bằng link vừa sao chép.
 * ==============================================================================
 */

// Hàm xử lý khi website gọi API lấy danh sách lời chúc (GET)
function doGet(e) {
  try {
    var sheet = getOrCreateSheet();
    var data = sheet.getDataRange().getValues();
    
    var wishes = [];
    
    // Bỏ qua dòng tiêu đề đầu tiên (i = 1)
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (row[1] || row[2]) { // Có tên hoặc có lời chúc
        wishes.push({
          timestamp: row[0] ? row[0].toString() : "",
          name: row[1] ? row[1].toString() : "Khách",
          message: row[2] ? row[2].toString() : ""
        });
      }
    }
    
    // Đảo ngược để lời chúc mới nhất lên đầu trang
    wishes.reverse();
    
    return createJsonResponse({
      status: "success",
      total: wishes.length,
      data: wishes
    });
    
  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

// Hàm xử lý khi website gửi lời chúc mới (POST)
function doPost(e) {
  try {
    var sheet = getOrCreateSheet();
    
    var name = "";
    var message = "";
    var timestamp = "";
    
    // Hỗ trợ cả 2 định dạng: FormData (URL-encoded) và JSON
    if (e.parameter && (e.parameter.name || e.parameter.message)) {
      name = e.parameter.name || "";
      message = e.parameter.message || "";
      timestamp = e.parameter.timestamp || Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    } else if (e.postData && e.postData.contents) {
      var postData = JSON.parse(e.postData.contents);
      name = postData.name || "";
      message = postData.message || "";
      timestamp = postData.timestamp || Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }
    
    // Nếu cả tên và nội dung đều trống thì báo lỗi
    if (!name.trim() && !message.trim()) {
      return createJsonResponse({
        status: "error",
        message: "Dữ liệu không hợp lệ!"
      });
    }
    
    // Định dạng thời gian lưu vào sheet
    var formattedDate = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");
    
    // Thêm dòng mới vào Google Sheets [Thời gian, Tên, Lời chúc]
    sheet.appendRow([formattedDate, name.trim(), message.trim()]);
    
    return createJsonResponse({
      status: "success",
      message: "Lời chúc đã được lưu thành công!"
    });
    
  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

// Hàm bổ trợ: Lấy hoặc tự động tạo trang tính và dòng tiêu đề nếu chưa có
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("LoiChuc") || ss.getActiveSheet();
  
  // Nếu trang tính đang trống, tự động tạo dòng tiêu đề đẹp mắt
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Thời gian gửi", "Tên người chúc", "Nội dung lời chúc"]);
    
    // Định dạng dòng tiêu đề
    var headerRange = sheet.getRange("A1:C1");
    headerRange.setBackground("#2C2623");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(2, 200);
    sheet.setColumnWidth(3, 450);
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

// Hàm bổ trợ: Trả về kết quả JSON với đầy đủ Header
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
