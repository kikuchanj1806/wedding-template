document.getElementById("wedding-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Ngăn chặn sự kiện submit mặc định

  // Lấy giá trị từ các trường input
  const name = document.querySelector("[name='name']").value;
  const phone = document.querySelector("[name='phone']").value;
  const attachment = document.querySelector("[name='number']").value;
  const eventOption = document.querySelector("[name='event']").innerText;
  const greetings = document.querySelector("[name='greetings']").value;

  // Tạo object chứa dữ liệu
  const formData = { name, phone, attachment, eventOption, greetings };

  try {
    // Gửi request POST đến API
    const response = await fetch("/api/congratulations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const congra = await response.json();
      // Xử lý kết quả thành công
      console.log(congra);
    } else {
      // Xử lý kết quả thất bại
      const errorData = await response.json();
      console.error(errorData);
    }
  } catch (error) {
    console.error(error);
  } 
});
