
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
  $('.slider-main').slick({
    // dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
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

  const name = document.querySelector("[name='name']").value;
  const phone = document.querySelector("[name='phone']").value;
  const attachment = document.querySelector("[name='number']").value;
  const eventSelect = document.querySelector("[name='event']");
  const eventOption = eventSelect.options[eventSelect.selectedIndex].text;

  const greetings = document.querySelector("[name='greetings']").value;
  const image = document.getElementById('uploadedImage').getAttribute('src');

  const formData = { name, phone, attachment, eventOption, greetings, image };

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
      console.log(congra);
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
