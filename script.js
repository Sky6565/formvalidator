const form = document.getElementById("form");
const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("Email");
const passwordEl = document.getElementById("password");
const confirmPasswordEl = document.getElementById("password2");

// ShowError message
function ShowError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// ShowSuccess Message
function ShowSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check Email outline
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    ShowSuccess(input);
  } else {
    ShowError(input, "email is not valid");
  }
}
// Check Required field
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      ShowError(input, `${getFieldName(input)} is required `);
    } else {
      ShowSuccess(input);
    }
  });
}

// Check Length
function CheckLength(input, min, max) {
  if (input.value.length < min) {
    ShowError(
      input,
      `${getFieldName(input)} must be more than ${min} characters `
    );
  } else if (input.value.length > max) {
    ShowError(
      input,
      `${getFieldName(input)} must be at least ${max} characters `
    );
  } else {
    ShowSuccess(input);
  }
}

// Check Password Match
function passwordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    ShowError(input2, "Password do not match");
  } else {
    ShowSuccess(input2);
  }
}

// GEt field Name outlibe
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([usernameEl, emailEl, passwordEl, confirmPasswordEl]);
  CheckLength(usernameEl, 3, 15);
  CheckLength(passwordEl, 6, 25);
  checkEmail(emailEl);
  passwordMatch(passwordEl, confirmPasswordEl);
});
