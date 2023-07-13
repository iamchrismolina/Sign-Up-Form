const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmpassword");
// const errorMsg = document.querySelector(".form__submit-errorMsg");
// const successMsg = document.querySelector(".form__submit-successMsg");
const submitBtn = document.querySelector("#form__submit-btn");
const formMsg = document.querySelector("#formMsg");

const inputs = [firstName, lastName, email, phone, password, confirmPassword];

const form = document.querySelector("#formContent");

// Remove default error messages
inputs.forEach((input) => {
  input.addEventListener("focusin", () => {
    formMsg.textContent = "";
    if (input.classList.contains("error")) {
      input.classList.remove("error");
    }
    if (input.classList.contains("success")) {
      input.classList.remove("success");
    }
  });
});

submitBtn.addEventListener("click", function (e) {
  // form.submit(handleSubmit(e));
  handleSubmit();
});

function handleSubmit(event) {
  // event.preventDefault();

  if (!firstName.value) {
    handleError(firstName);
    handleErrorMsg("Fill up First Name");
  } else if (!lastName.value) {
    handleError(lastName);
    handleErrorMsg("Fill up Last Name");
  } else if (!email.value.includes("@")) {
    handleError(email);
    handleErrorMsg("Invalid Email");
  } else if (!(phone.value.length == 11)) {
    /* Phone Regex
        -!phone.value.match(
         /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/
       )
    */
    handleError(phone);
    handleErrorMsg("Invalid Phone number must be of length 11");
  } else if (password.value === "") {
    handleError(password);
    handleErrorMsg("Password is empty");
  } else if (!(password.value.length > 7)) {
    handleError(password);
    handleErrorMsg("Password needs to be at least 8 characters long.");
  } else if (!password.value.match(/[a-z]/)) {
    handleError(password);
    handleErrorMsg("Password needs to have at least 1 lowercase letter.");
  } else if (!password.value.match(/[A-Z]/)) {
    handleError(password);
    handleErrorMsg("Password needs to have at least 1 uppercase letter.");
  } else if (!password.value.match(/\d+/g)) {
    handleError(password);
    handleErrorMsg("Password needs to have at least 1 number.");
  } else if (confirmPassword.value === "") {
    handleError(confirmPassword);
    handleErrorMsg("Confirm Password is empty");
  } else if (password.value !== confirmPassword.value) {
    handleError(password, confirmPassword);
    handleErrorMsg("Passwords doesn't match");
  } else {
    handleSuccessMsg(formMsg);
    handleSuccessMsg("Registration Success");
    setTimeout(() => {
      window.location.reload();
    }, 5000);
    form.submit(e.preventDefault());
  }
}

const handleError = (...inputTargets) => {
  inputTargets.forEach((target) => {
    if (target.classList.contains("success")) {
      target.classList.remove("success");
    }
    target.classList.add("error");
  });
};

const handleSuccess = (...inputTargets) => {
  inputTargets.forEach((target) => {
    if (target.classList.contains("error")) {
      target.classList.remove("error");
    }
    target.classList.add("success");
  });
};

const handleErrorMsg = (message) => {
  if (formMsg.classList.contains("form__submit-successMsg")) {
    formMsg.classList.remove("form__submit-successMsg");
  }
  formMsg.classList.add("form__submit-errorMsg");
  formMsg.textContent = message;
};

const handleSuccessMsg = (message) => {
  if (formMsg.classList.contains("form__submit-errorMsg")) {
    formMsg.classList.remove("form__submit-errorMsg");
  }
  formMsg.classList.add("form__submit-successMsg");
  formMsg.textContent = message;
};
