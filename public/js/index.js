
$(document).ready(function () {
  let countdownInterval;
  let countdownValue = 10;

  const amountScrolled = 200;
  const amountScrolledNav = 25;
  const $backToTopBtn = $('button.back-to-top');
  const $cataMusicBtn = $('.cata-music-toggle-btn');
  const iframe = document.querySelector("#sc-widget");

  // Khởi tạo SoundCloud Widget API
  const scWidget = SC.Widget(iframe);

  const musicDialog = $.confirm({
    title: "Âm Nhạc!!!",
    content: "Do trình duyệt chặn tự động phát âm thanh nên bạn hãy nhấn nghe nhạc để thưởng thức các bài hát nhé.",
    type: "purple",
    closeIcon: false,
    buttons: {
      turnOffMusic: {
        text: "Tắt Nhạc (" + countdownValue + ")",
        btnClass: "btn-default",
        action: function () {
          scWidget.pause();
          clearInterval(countdownInterval);
        },
      },
      playMusic: {
        text: "Nghe Nhạc",
        btnClass: "btn-default",
        action: function () {
          scWidget.play();
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
  $('a[href^="#"]').on('click', function (event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });

  $(window).scroll(function () {
    const scrollTop = $(window).scrollTop();

    if (scrollTop > amountScrolled) {
      $backToTopBtn.addClass('show');
    } else {
      $backToTopBtn.removeClass('show');
    }
  });

  $backToTopBtn.on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    return false;
  });

  $cataMusicBtn.on('click', function () {
    $(this).toggleClass('active');
  });
  $('[data-fancybox="gallery-1"]').fancybox({
    buttons: [
      "slideShow",
      "thumbs",
      "zoom",
      "fullScreen",
      "share",
      "close"
    ],
    loop: false,
    protect: true
  });
  $('.slider').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
  });
});
document.getElementById("wedding-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = checkLength(document.getElementById('username'));
  const phone = checkPhoneError(document.getElementById('phone'));
  const attachment = document.querySelector("[name='number']").value;
  const eventSelect = document.querySelector("[name='event']");
  const eventOption = eventSelect.options[eventSelect.selectedIndex].text;
  const greetings = checkLengthError(document.getElementById('greetings'), 6);
  const image = document.getElementById('uploadedImage').getAttribute('src');
  let formData;

  if (name && phone && greetings) {
    formData = { name, phone, attachment, eventOption, greetings, image };
  } else {
    return;
  }

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
      alert('Cảm ơn bạn đã gửi lời chúc mừng!');
    } else {
      const errorData = await response.json();
      console.error(errorData);
    }
  } catch (error) {
    console.error(error);
  }
});

document.getElementById('readUrl').addEventListener('change', function () {
  if (this.files[0]) {
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


function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector('small')

  parent.classList.add('error')
  small.innerText = message;
}

function checkLengthError(input, min) {
  clearError(input);
  let valueGreet = input.value.length;
  let greetingsText = input.value;
  if (valueGreet < min) {
    showError(input, `Phải có ít nhất ${min} ký tự`);
    return false;
  } else {
    return greetingsText
  }
}

function checkPhoneError(input) {
  clearError(input);
  const regexPhone = /^(?:\+?84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8-9]|9[0-9])\d{7}$/;
  const value = input.value;

  if (value === '') {
    showError(input, 'Trường này là bắt buộc');
    return false;
  }

  const isPhoneError = !regexPhone.test(value);

  if (isPhoneError) {
    showError(input, 'Số điện thoại không hợp lệ');
    return false;
  } else {
    return value;
  }

  return value;
}

function checkLength(input) {
  clearError(input);
  let userNameValue = input.value;
  if (userNameValue === "") {
    showError(input, "Trường này là bắt buộc");
    return false;
  } else {
    return userNameValue;
  }
}
function clearError(input) {
  const parent = input.parentElement;
  const small = parent.querySelector('small');

  parent.classList.remove('error');
  small.innerText = '';
}