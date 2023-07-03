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