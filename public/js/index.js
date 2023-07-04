document.getElementById("wedding-form").addEventListener("submit", async (event) => {
  event.preventDefault();



  const name = document.querySelector("[name='name']").value;
  const phone = document.querySelector("[name='phone']").value;
  const attachment = document.querySelector("[name='number']").value;
  const eventSelect = document.querySelector("[name='event']");
  const eventOption = eventSelect.options[eventSelect.selectedIndex].text;

  const greetings = document.querySelector("[name='greetings']").value;
  const image = document.getElementById('uploadedImage').getAttribute('src');

  const formData = { name, phone, attachment, eventOption, greetings, image};

  try {
    const response = await fetch("/api/congratulations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const congra = await response.json();
    } else {
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
$(document).ready(function () {
  let countdownInterval;
  let countdownValue = 10;

  const musicDialog = $.confirm({
    title: "Âm Nhạc!!!",
    content: "Do trình duyệt chặn tự động phát âm thanh nên bạn hãy nhấn nghe nhạc để thưởng thức các bài hát nhé.",
    type: "green",
    closeIcon: false,
    buttons: {
      turnOffMusic: {
        text: "Tắt Nhạc (" + countdownValue + ")",
        btnClass: "btn-default",
        action: function () {
          clearInterval(countdownInterval);
        },
      },
      playMusic: {
        text: "Nghe Nhạc",
        btnClass: "btn-default",
        action: function () {
          clearInterval(countdownInterval);
        },
      },
    },
    onOpen: function () {
      const self = this;

      countdownInterval = setInterval(function () {
        countdownValue--;

        self.buttons.turnOffMusic.setText("Tắt Nhạc (" + countdownValue + ")");

        if (countdownValue === 0) {
          clearInterval(countdownInterval);
          musicDialog.close();
        }
      }, 1000);
    },
  });
});