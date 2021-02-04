const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


// To show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// To show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Checks to see if email is valid
function isValidEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid!')
    };
}

// Checks to see if passwords match
function checkPassword(input1, input2) {
    if (input1.value === input2.value) {
        showSuccess(input1)
    } else {
        showError(input2, 'Passwords do not match!');
    };
}

// This is a check to make sure each input is filled out
function checkInput(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input)
        }
    })
}

// This checks to make sure that all lengths of inputs are correct 
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min}
        characters.`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// This grabs the fieldname that is currently being used
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (e) {
    e.preventDefault();

    checkInput([username, email, password, password2]);
    checkPassword(password, password2);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    isValidEmail(email);
})