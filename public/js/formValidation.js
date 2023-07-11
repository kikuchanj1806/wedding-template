const username = document.querySelector('#username')
const phone = document.querySelector('#phone')
const form = document.querySelector('form')

function showError(input, message) {
    let parent = input.parentElement ;
    let small = parent.querySelector('small')


    parent.classList.add('error')
    small.innerText = message;
}

function showSucces(input) {
    let parent = input.parentElement ;
    let small = parent.querySelector('small')

    parent.classList.remove('error')
    small.innerText = '';
}

function checkLengthError(input, min, max) {
    input.value = input.value.trim()

    if(input.value.length < min) {
        showError(input, `Phải có ít nhất ${min} ký tự`)
        return true
    }

    if(input.value.length > max) {
        showError(input, `Không được quá ${max} ký tự`)
        return true
    }

    showSucces(input)
    return false
}

function checkPhoneError(input) {
    const regexPhone = /^(?:\+?84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8-9]|9[0-9])\d{7}$/;
    input.value = input.value.trim()
    
    const isPhoneError = !regexPhone.test(input.value);

    if(regexPhone.test(input.value)) {
        showSucces()
    }else {
        showError(input, 'so dien thoai khong hop le')
    }

    return isPhoneError
}

function checkEmtyError(listInput) {
    let isEmptyError = false;
    listInput.forEach(input => {
        input.value = input.value.trim()

        if(input.value == '') {
            isEmptyError = true
            showError(input, 'Vui lòng nhập trường này')
        } else {
            showSucces(input)
        }
    });
    return isEmptyError
}


form.addEventListener('submit', function(e) {
    e.preventDefault()


   let isEmptyError =  checkEmtyError([username, phone])
   let isPhoneError =  checkPhoneError(phone)
   let isUsernameLengthError = checkLengthError(username)
})


