document.getElementById("wedding-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Ngăn chặn sự kiện submit mặc định


  // Lấy giá trị từ các trường input
  const name = document.querySelector("[name='name']").value;
  const phone = document.querySelector("[name='phone']").value;
  const attachment = document.querySelector("[name='number']").value;
  const eventOption = document.querySelector("[name='event']").innerText;
  const greetings = document.querySelector("[name='greetings']").value;
  const image = document.getElementById('uploadedImage').getAttribute('src');

  // Tạo object chứa dữ liệu
  const formData = { name, phone, attachment, eventOption, greetings, image};

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
      // console.log(congra);
    } else {
      // Xử lý kết quả thất bại
      const errorData = await response.json();
      console.error(errorData);
    }
  } catch (error) {
    console.error(error);
  } 
});

document.getElementById('readUrl').addEventListener('change', function(){
  if (this.files[0] ) {
    const file = this.files[0].size;

    if (!file) {
      return;
    }

    new Compressor(this.files[0], {
      quality: 0.7,
      maxHeight: 400,
      maxWidth: 400,

      success(result) {
        const compressorSize = Math.round(result.size / 1024)
        // console.log('kich thuoc truoc khi nen: ', Math.round(file / 1024));
        // console.log('sau khi nen: ', compressorSize);
        const picture = new FileReader();
        picture.readAsDataURL(result);
        picture.onload = function (event) {
          document.getElementById('uploadedImage').setAttribute('src', event.target.result);
          document.getElementById('uploadedImage').style.display = 'block';
        }
      },
      error(err) {
      console.log(err.message);
    }
    })
  }
});


