/**
 * ==============================================================================
 * THIỆP MỜI TỐT NGHIỆP - TÂN KHOA NGÔ MINH ĐỨC
 * File xử lý JavaScript: Nhạc nền, Đếm ngược, Hiệu ứng cuộn & Sổ lưu bút (Google Sheets)
 * ==============================================================================
 */

// ==============================================================================
// 1. CẤU HÌNH GOOGLE APPS SCRIPT CHO SỔ LƯU BÚT (QUAN TRỌNG)
// ==============================================================================
/**
 * HƯỚNG DẪN DÁN LINK:
 * Sau khi triển khai Google Apps Script từ Google Sheets (theo hướng dẫn trong file google-apps-script.js):
 * Dán link Web App (kết thúc bằng /exec) vào biến SCRIPT_URL bên dưới.
 * 
 * Ví dụ:
 * const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
 */
const SCRIPT_URL = "DÁN_LINK_WEB_APP_CỦA_BẠN_VÀO_ĐÂY";

// Cấu hình thời gian diễn ra Lễ Tốt Nghiệp (Định dạng: YYYY-MM-DDTHH:mm:ss)
// 08:30 sáng Thứ Bảy ngày 19/12/2026 tại Khu E HUTECH
const GRADUATION_DATE = new Date("2026-12-19T08:30:00+07:00").getTime();

// Dữ liệu lời chúc mẫu ban đầu (Hiển thị ngay lập tức khi chưa kết nối Google Sheet)
const INITIAL_SAMPLE_WISHES = [
  {
    name: "Ba Mẹ",
    message: "Chúc mừng con trai đã hoàn thành xuất sắc chặng đường đại học! Ba Mẹ luôn tự hào về con. Chúc con trên con đường phía trước luôn mạnh mẽ, tự tin và thành công!",
    timestamp: "2026-08-10T08:30:00.000Z"
  },
  {
    name: "Nhóm Bạn Thân IT",
    message: "Chúc mừng tân khoa Ngô Minh Đức! 4 năm chạy deadline, đồ án cùng nhau cuối cùng cũng hái quả ngọt rồi. Chúc người anh em tương lai code đâu trúng đó, thăng tiến vèo vèo nhé!",
    timestamp: "2026-08-11T14:20:00.000Z"
  },
  {
    name: "Thanh Hằng",
    message: "Chúc mừng Đức tốt nghiệp K22 HUTECH nha! Chúc bạn luôn giữ vững ngọn lửa nhiệt huyết và sớm chinh phục được mọi ước mơ đã ấp ủ!",
    timestamp: "2026-08-12T09:15:00.000Z"
  }
];

// Key lưu trữ cục bộ (Local Storage) để lưu lời chúc tạm thời
const LOCAL_STORAGE_WISHES_KEY = "graduation_wishes_minhduc";

// ==============================================================================
// 2. KHỞI TẠO KHI TẢI TRANG
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initEnvelopeIntro();
  initAudioPlayer();
  initScrollHint();
  initCountdown();
  initGuestbook();
  initQuickWishModal();
  initShareButton();
});

// ==============================================================================
// 2B. XỬ LÝ MỞ PHONG BÌ BỨC THƯ (ENVELOPE INTRO)
// ==============================================================================
function initEnvelopeIntro() {
  const overlay = document.getElementById("envelopeOverlay");
  const envelopeCard = document.getElementById("envelopeCard");
  const openBtn = document.getElementById("openEnvelopeBtn");

  // Nếu không có màn hình phong bì thì chạy hiệu ứng cuộn luôn
  if (!overlay) {
    document.body.classList.remove("envelope-locked");
    const floatingScroll = document.getElementById("floatingScrollBtn");
    if (floatingScroll) {
      floatingScroll.classList.add("is-visible");
    }
    initScrollReveal();
    return;
  }

  let isOpened = false;

  const openEnvelope = () => {
    if (isOpened) return;
    isOpened = true;

    // PHÁT NHẠC NỀN KHI CHẠM MỞ THIỆP MỜI (Tương tác trực tiếp hợp lệ với chính sách trình duyệt)
    const audio = document.getElementById("bgAudio");
    const audioControl = document.getElementById("audioControl");
    if (audio) {
      audio.play().then(() => {
        if (audioControl) {
          audioControl.classList.add("is-visible");
          audioControl.classList.add("is-playing");
        }
      }).catch(err => {
        console.warn("Chờ tương tác bổ sung để phát nhạc:", err);
      });
    }

    // Bước 1: Mở nắp phong bì & đẩy tấm thiệp lên từ tốn, sang trọng
    overlay.classList.add("is-opening");

    // Bước 2: Sau khi nắp mở & thiệp trồi lên (~2.05s), ẩn màn hình phong bì mượt mà
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      overlay.classList.add("is-fading-out");
      document.body.classList.remove("envelope-locked");

      // Hiện nút điều khiển nhạc nền nếu có
      if (audioControl) {
        audioControl.classList.add("is-visible");
      }

      // Hiện nút gợi ý cuộn lơ lửng ở chính giữa màn hình
      const floatingScroll = document.getElementById("floatingScrollBtn");
      if (floatingScroll) {
        floatingScroll.classList.add("is-visible");
      }

      // Kích hoạt Scroll Reveal để các phần trên đầu thiệp hiện dần từng cái một
      initScrollReveal();
    }, 2050);

    // Bước 3: Gỡ overlay khỏi luồng hiển thị sau khi fade xong (2.05s + 0.95s)
    setTimeout(() => {
      overlay.style.display = "none";
    }, 3050);
  };

  if (envelopeCard) {
    envelopeCard.addEventListener("click", openEnvelope);
    envelopeCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  if (openBtn) {
    openBtn.addEventListener("click", openEnvelope);
  }
}

// ==============================================================================
// 3. XỬ LÝ NHẠC NỀN (AUDIO PLAYER)
// ==============================================================================
function initAudioPlayer() {
  const audio = document.getElementById("bgAudio");
  const audioControl = document.getElementById("audioControl");
  if (!audio || !audioControl) return;

  let isPlaying = false;

  // Lắng nghe trạng thái của audio element để đồng bộ giao diện
  audio.addEventListener("play", () => {
    isPlaying = true;
    audioControl.classList.add("is-playing");
    audioControl.classList.add("is-visible");
  });

  audio.addEventListener("pause", () => {
    isPlaying = false;
    audioControl.classList.remove("is-playing");
  });

  // Bật/tắt khi bấm vào nút tròn điều khiển nhạc
  audioControl.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      showToast("Đã tạm dừng nhạc");
    } else {
      audio.play().then(() => {
        showToast("Đang phát nhạc nền ♪");
      }).catch(err => {
        console.warn("Trình duyệt chặn tự động phát:", err);
      });
    }
  });

  // Tự động phát khi người dùng tương tác lần đầu (click/chạm vào bất kỳ đâu trên màn hình nếu chưa phát)
  const handleFirstInteraction = () => {
    if (!isPlaying) {
      audio.play().then(() => {
        audioControl.classList.add("is-playing");
        audioControl.classList.add("is-visible");
        isPlaying = true;
      }).catch(() => {
        // Trình duyệt có chính sách hạn chế autoplay
      });
    }
    // Gỡ bỏ sự kiện sau lần tương tác đầu tiên
    document.removeEventListener("click", handleFirstInteraction);
    document.removeEventListener("touchstart", handleFirstInteraction);
  };

  document.addEventListener("click", handleFirstInteraction, { once: true });
  document.addEventListener("touchstart", handleFirstInteraction, { once: true });
}

// ==============================================================================
// 4. XỬ LÝ ĐẾM NGƯỢC (COUNTDOWN TIMER)
// ==============================================================================
function initCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = GRADUATION_DATE - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ==============================================================================
// 5. HIỆU ỨNG CUỘN TRANG (SCROLL REVEAL)
// ==============================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    // Trình duyệt không hỗ trợ observer thì hiển thị luôn
    revealElements.forEach(el => el.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Chỉ kích hoạt 1 lần cho mượt mà
      }
    });
  }, {
    threshold: 0.14,
    rootMargin: "0px 0px -45px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

// ==============================================================================
// 6. XỬ LÝ SỔ LƯU BÚT & GOOGLE SHEETS
// ==============================================================================
function initGuestbook() {
  const wishForm = document.getElementById("wishForm");
  const senderNameInput = document.getElementById("senderName");
  const wishMessageInput = document.getElementById("wishMessage");
  const charCount = document.getElementById("charCount");
  const submitWishBtn = document.getElementById("submitWishBtn");
  const formAlert = document.getElementById("formAlert");
  const refreshWishesBtn = document.getElementById("refreshWishesBtn");

  // Bộ đếm ký tự 0/500
  wishMessageInput.addEventListener("input", () => {
    const len = wishMessageInput.value.length;
    charCount.textContent = len;
    if (len >= 450) {
      charCount.className = "char-counter limit";
    } else if (len >= 350) {
      charCount.className = "char-counter warning";
    } else {
      charCount.className = "char-counter";
    }
  });

  // Tải danh sách lời chúc khi mở trang
  loadWishes();

  // Nút làm mới danh sách
  if (refreshWishesBtn) {
    refreshWishesBtn.addEventListener("click", () => {
      loadWishes();
      showToast("Đang làm mới danh sách lời chúc...");
    });
  }

  // Xử lý gửi Form
  wishForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = senderNameInput.value.trim();
    const message = wishMessageInput.value.trim();

    if (!name || !message) {
      showFormAlert("Vui lòng điền đầy đủ tên và lời chúc!", "error");
      return;
    }

    if (message.length > 500) {
      showFormAlert("Lời chúc không được vượt quá 500 ký tự!", "error");
      return;
    }

    // Hiển thị trạng thái đang gửi trên nút
    const originalBtnContent = submitWishBtn.innerHTML;
    submitWishBtn.disabled = true;
    submitWishBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Đang gửi lời chúc...</span>';

    const newWish = {
      name: name,
      message: message,
      timestamp: new Date().toISOString()
    };

    let sentToGoogleSheets = false;

    // Kiểm tra xem người dùng đã dán SCRIPT_URL hợp lệ chưa
    const isScriptUrlConfigured = SCRIPT_URL && 
      SCRIPT_URL !== "DÁN_LINK_WEB_APP_CỦA_BẠN_VÀO_ĐÂY" && 
      SCRIPT_URL.startsWith("https://script.google.com");

    if (isScriptUrlConfigured) {
      try {
        // Gửi dữ liệu tới Google Apps Script
        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors", // Tránh lỗi CORS từ Google Apps Script
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            name: name,
            message: message,
            timestamp: new Date().toLocaleString("vi-VN")
          })
        });
        sentToGoogleSheets = true;
      } catch (error) {
        console.error("Lỗi khi gửi lên Google Sheets:", error);
      }
    }

    // Đồng thời lưu vào LocalStorage để đảm bảo lời chúc xuất hiện ngay lập tức
    saveWishLocally(newWish);

    // Reset Form & phục hồi nút
    submitWishBtn.disabled = false;
    submitWishBtn.innerHTML = originalBtnContent;
    wishForm.reset();
    charCount.textContent = "0";
    charCount.className = "char-counter";

    // Hiển thị thông báo thành công
    if (sentToGoogleSheets) {
      showFormAlert("Cảm ơn bạn! Lời chúc đã được gửi lên Sổ lưu bút thành công 🎉", "success");
    } else {
      showFormAlert("Cảm ơn bạn! Lời chúc của bạn đã được ghi nhận 🎉", "success");
    }

    // Tải lại danh sách để hiển thị lời chúc vừa thêm ở đầu
    loadWishes();
  });
}

/**
 * Tải danh sách lời chúc (từ Google Sheets hoặc fallback LocalStorage)
 */
async function loadWishes() {
  const wishesList = document.getElementById("wishesList");
  const wishesLoading = document.getElementById("wishesLoading");
  const totalWishesCount = document.getElementById("totalWishesCount");

  if (!wishesList) return;

  wishesLoading.style.display = "flex";

  let wishes = [];

  const isScriptUrlConfigured = SCRIPT_URL && 
    SCRIPT_URL !== "DÁN_LINK_WEB_APP_CỦA_BẠN_VÀO_ĐÂY" && 
    SCRIPT_URL.startsWith("https://script.google.com");

  if (isScriptUrlConfigured) {
    try {
      const response = await fetch(SCRIPT_URL, { method: "GET" });
      if (response.ok) {
        const result = await response.json();
        if (result && Array.isArray(result.data)) {
          wishes = result.data;
        }
      }
    } catch (error) {
      console.warn("Không thể tải trực tiếp từ Google Sheets, sử dụng bộ nhớ nội bộ:", error);
    }
  }

  // Kết hợp với lời chúc lưu cục bộ (Local Storage) và lời chúc mẫu
  const localWishes = getLocalWishes();
  
  // Gộp danh sách và loại bỏ trùng lặp nếu có
  const allWishes = [...localWishes, ...wishes];
  if (allWishes.length === 0) {
    allWishes.push(...INITIAL_SAMPLE_WISHES);
  }

  // Đảo ngược để lời chúc mới nhất nằm trên cùng
  const uniqueWishes = removeDuplicateWishes(allWishes);

  wishesLoading.style.display = "none";
  renderWishes(uniqueWishes);

  if (totalWishesCount) {
    totalWishesCount.textContent = uniqueWishes.length;
  }
}

/**
 * Render danh sách lời chúc ra giao diện HTML
 */
function renderWishes(wishes) {
  const wishesList = document.getElementById("wishesList");
  if (!wishesList) return;

  if (wishes.length === 0) {
    wishesList.innerHTML = `
      <div class="empty-wishes">
        <i class="fa-regular fa-comments"></i>
        <p>Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc mừng tân khoa nhé!</p>
      </div>
    `;
    return;
  }

  wishesList.innerHTML = wishes.map((item) => {
    const initial = (item.name || "A").trim().charAt(0).toUpperCase();
    const formattedTime = formatWishTime(item.timestamp);
    const escapedName = escapeHtml(item.name || "Người bạn");
    const escapedMsg = escapeHtml(item.message || "");

    return `
      <article class="wish-item">
        <div class="wish-item-header">
          <div class="wish-sender-info">
            <div class="sender-avatar">${initial}</div>
            <span class="sender-name">${escapedName}</span>
          </div>
          <time class="wish-time">${formattedTime}</time>
        </div>
        <div class="wish-item-message">${escapedMsg}</div>
      </article>
    `;
  }).join("");
}

/**
 * Lưu lời chúc vào LocalStorage
 */
function saveWishLocally(wish) {
  try {
    const list = getLocalWishes();
    list.unshift(wish);
    localStorage.setItem(LOCAL_STORAGE_WISHES_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Lỗi khi lưu vào LocalStorage:", e);
  }
}

/**
 * Đọc lời chúc từ LocalStorage
 */
function getLocalWishes() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_WISHES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Loại bỏ lời chúc trùng lặp theo tên và nội dung
 */
function removeDuplicateWishes(wishes) {
  const seen = new Set();
  return wishes.filter(w => {
    const key = `${(w.name || '').trim()}___${(w.message || '').trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Định dạng thời gian gửi lời chúc hiển thị thân thiện (Vừa xong, 5 phút trước, ...)
 */
function formatWishTime(timestamp) {
  if (!timestamp) return "Vừa xong";

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return timestamp; // Nếu chuỗi dạng text thường

  const now = new Date();
  const diffSec = Math.floor((now - date) / 1000);

  if (diffSec < 60) return "Vừa xong";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} phút trước`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} giờ trước`;
  if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)} ngày trước`;

  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

/**
 * Hiển thị thông báo trạng thái của form
 */
function showFormAlert(message, type) {
  const alertEl = document.getElementById("formAlert");
  if (!alertEl) return;

  alertEl.textContent = message;
  alertEl.className = `form-alert ${type}`;
  alertEl.style.display = "block";

  setTimeout(() => {
    alertEl.style.display = "none";
  }, 5000);
}

// ==============================================================================
// 7. MODAL GỢI Ý LỜI CHÚC NHANH (💡)
// ==============================================================================
function initQuickWishModal() {
  const quickWishBtn = document.getElementById("quickWishBtn");
  const quickWishModal = document.getElementById("quickWishModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const wishMessageInput = document.getElementById("wishMessage");
  const charCount = document.getElementById("charCount");
  const suggestionItems = document.querySelectorAll(".suggestion-item");

  if (!quickWishBtn || !quickWishModal) return;

  // Mở Modal
  quickWishBtn.addEventListener("click", () => {
    quickWishModal.classList.add("active");
  });

  // Đóng Modal
  const closeModal = () => {
    quickWishModal.classList.remove("active");
  };

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

  // Đóng bằng phím ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && quickWishModal.classList.contains("active")) {
      closeModal();
    }
  });

  // Khi chọn một lời chúc gợi ý
  suggestionItems.forEach(item => {
    item.addEventListener("click", () => {
      const selectedText = item.textContent.trim();
      wishMessageInput.value = selectedText;
      charCount.textContent = selectedText.length;
      closeModal();
      wishMessageInput.focus();
      showToast("Đã chèn gợi ý lời chúc! Bạn có thể chỉnh sửa thêm.");
    });
  });
}

// ==============================================================================
// 8. NÚT CHIA SẺ THIỆP & TOAST NOTIFICATION
// ==============================================================================
function initShareButton() {
  const shareBtn = document.getElementById("shareBtn");
  if (!shareBtn) return;

  shareBtn.addEventListener("click", () => {
    const url = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        showToast("Đã sao chép liên kết thiệp mời! ✨");
      }).catch(() => {
        fallbackCopyTextToClipboard(url);
      });
    } else {
      fallbackCopyTextToClipboard(url);
    }
  });
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    showToast("Đã sao chép liên kết thiệp mời! ✨");
  } catch (err) {
    showToast("Không thể tự động chép, vui lòng copy đường dẫn trên thanh trình duyệt!");
  }
  document.body.removeChild(textArea);
}

// ==============================================================================
// 9. XỬ LÝ GỢI Ý CUỘN LƠ LỬNG Ở CHÍNH GIỮA (FLOATING SCROLL HINT)
// ==============================================================================
function initScrollHint() {
  const scrollBtn = document.getElementById("floatingScrollBtn");
  const targetSection = document.getElementById("portrait-section");
  if (!scrollBtn) return;

  // Khi bấm vào nút thì cuộn mượt xuống phần ảnh & lời ngỏ
  scrollBtn.addEventListener("click", () => {
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Khi cuộn xuống sâu vào trang, ẩn nút lơ lửng để không che nội dung
  window.addEventListener("scroll", () => {
    if (window.scrollY > 250) {
      scrollBtn.classList.add("is-hidden");
    } else {
      if (!document.body.classList.contains("envelope-locked")) {
        scrollBtn.classList.remove("is-hidden");
      }
    }
  }, { passive: true });
}

/**
 * Hiển thị Toast thông báo ngắn ở dưới màn hình
 */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

/**
 * Chống tấn công XSS khi hiển thị text do người dùng nhập
 */
function escapeHtml(string) {
  const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
  };
  return String(string).replace(/[&<>"'\/]/g, (s) => entityMap[s]);
}
