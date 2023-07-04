document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const username = loginForm.querySelector('input[name="username"]').value;
      const password = loginForm.querySelector('input[name="password"]').value;
  
      if (validate(username, password)) {
        await sendData(username, password);
      }
    });
  
    function validate(username, password) {
      if (!username || !password) {
        alert('Username và Password không được để trống.');
        return false;
      }
      return true;
    }
  
    async function sendData(username, password) {
      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          window.location.href = '/admin';
        } else {
          // Xử lý kết quả thất bại
          const errorData = await response.json();
          alert('Đăng nhập không thành công: ' + errorData.error);
        }
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
      }
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const iosToggles = document.querySelectorAll('.ios-toggle');
  
    iosToggles.forEach((iosToggle) => {
      iosToggle.addEventListener('change', function () {
        const userId = this.getAttribute('data-id');
        const iosToggleLabel = this.closest('.ios-toggle-container').querySelector('.ios-toggle-label');
        if (this.checked) {
          iosToggleLabel.classList.add('active');
          // Perform any actions needed for the user with userId
        } else {
          iosToggleLabel.classList.remove('active');
          // Perform any actions needed for the user with userId
        }
      });
    });
});
document.addEventListener("DOMContentLoaded", function () {
  const visibilityChanges = [];

  document.querySelectorAll(".ios-toggle").forEach((toggle) => {
    toggle.addEventListener("change", function () {
      const userId = this.getAttribute("data-id");
      const isVisible = this.checked;

      const changeIndex = visibilityChanges.findIndex((change) => change.id === userId);

      if (changeIndex === -1) {
        visibilityChanges.push({ id: userId, isVisible: isVisible });
      } else {
        visibilityChanges[changeIndex].isVisible = isVisible;
      }
    });
  });

  const saveButton = document.querySelector(".save-button");
  if (saveButton) {
    saveButton.addEventListener("click", function () {
      updateVisibility(visibilityChanges);
    });
  }

  function updateVisibility(actions) {
    fetch("/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actions),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.reload(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});