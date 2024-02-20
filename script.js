const formReg = document.getElementById('formReg');
const formLogIn = document.getElementById('formLog');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');
const message2 = document.getElementById('message2');
const loginLink = document.getElementById('loginLink');
const regLink = document.getElementById('regLink');
const login = document.getElementById('login');
const register = document.getElementById('register');
const userInfo = document.getElementById('userInfo');

const infoName = document.getElementById('info-name');
const infoEmail = document.getElementById('info-email');
const infoPhone = document.getElementById('info-phone');
const infoWebsite = document.getElementById('info-website');

let isValid = false;
let passwordsMatch = false;

function validateForm() {
  isValid = formReg.checkValidity();
  
  if (!isValid) {
    message.textContent = 'Please fill out all fields.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    return;
  }
  
  if (password1El.value === password2El.value) {
    passwordsMatch = true;
  } else {
    passwordsMatch = false;
    message.textContent = 'Make sure passwords match.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    password1El.style.borderColor = 'red';
    password2El.style.borderColor = 'red';
    return;
  }
  
  if (isValid && passwordsMatch) {
    message.textContent = 'Successfully Registered!';
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
  }
}

function checkLogIn() {
  const user = {
    email: formLogIn.email.value,
    password: formLogIn.password.value
  }
  
  const getUser = JSON.parse(localStorage.getItem('user'));
  const userPassHas = generateHash(user.password)

  if (getUser === null) {
    message2.textContent = 'Email does not exist';
  } else if (user.email === getUser.email && userPassHas === getUser.password) {
    infoName.textContent = getUser.name;
    infoPhone.textContent = getUser.phone;
    infoEmail.textContent = getUser.email;
    infoWebsite.textContent = getUser.website;
    clearInputs();
    userLogIn();
  } else {
    message2.textContent = 'Password or Username is incorrect, please try again';
    formLogIn.password.value = '';
  }
}

function storeFormData() {
  const user = {
    name: formReg.name.value,
    phone: formReg.phone.value,
    email: formReg.email.value,
    website: formReg.website.value,
    password: formReg.password.value,
  };

  user.password = generateHash(user.password)
  localStorage.setItem('user', JSON.stringify(user));
  clearInputs();
}

function processSignUpFormData(e) {
  e.preventDefault();
  validateForm();
  if (isValid && passwordsMatch) {
    storeFormData();
  }
}

function processLogInData(e) {
  e.preventDefault();
  checkLogIn();
}

function logOut() {
  clearUserInfo();
  goToLogin();
}

function removeAccount() {
  if (confirm('Are you sure you want to remove this account?')) {
    localStorage.removeItem('user');
    clearUserInfo();
    goToRegister();
  }
}

function generateHash(string) {
  var hash = 0;
  if (string.length == 0)
      return hash;
  for (let i = 0; i < string.length; i++) {
      var charCode = string.charCodeAt(i);
      hash = ((hash << 7) - hash) + charCode;
      hash = hash & hash;
  }
  return hash;
}

function clearInputs() {
  formReg.name.value = '';
  formReg.phone.value = '';
  formReg.email.value = '';
  formReg.website.value = '';
  formReg.password.value = '';
  formReg.password1.value = '';

  formLogIn.email.value = '';
  formLogIn.password.value = '';
}

function clearUserInfo() {
  infoName.textContent = '';
  infoPhone.textContent = '';
  infoEmail.textContent = '';
  infoWebsite.textContent = '';
}

formReg.addEventListener('submit', processSignUpFormData);
formLogIn.addEventListener('submit', processLogInData);

function goToLogin() {
  login.style.display = 'inline';
  register.style.display = 'none';
  userInfo.style.display = 'none';
}

function goToRegister() {
  login.style.display = 'none';
  register.style.display = 'inline';
  userInfo.style.display = 'none';
  message.textContent = '';
  password1El.style.borderColor = 'red';
  password2El.style.borderColor = 'red';
}

function userLogIn() {
  login.style.display = 'none';
  userInfo.style.display = 'inline';
  message2.textContent = '';
}
