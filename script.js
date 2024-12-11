const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};

const generatePassword = () => {
  let charPool = "";
  const passLength = parseInt(lengthSlider.value, 10);
  let excludeDuplicate = false;

  options.forEach(({ id, checked }) => {
    if (!checked) return;

    if (id === "spaces") {
      charPool += " ";
    } else if (id === "exc-duplicate") {
      excludeDuplicate = true;
    } else {
      charPool += characters[id];
    }
  });

  if (!charPool) {
    passwordInput.value = "";
    return;
  }

  let generatedPassword = "";
  while (generatedPassword.length < passLength) {
    const randomChar = charPool[Math.floor(Math.random() * charPool.length)];
    if (!excludeDuplicate || !generatedPassword.includes(randomChar) || randomChar === " ") {
      generatedPassword += randomChar;
    }
  }

  passwordInput.value = generatedPassword;
};

const updatePassIndicator = () => {
  const passStrength = 
    lengthSlider.value <= 8 ? "weak" :
    lengthSlider.value <= 16 ? "medium" : 
    "strong";

  passIndicator.id = passStrength;
};

const updateSlider = () => {
  const lengthLabel = document.querySelector(".pass-length span");
  lengthLabel.innerText = lengthSlider.value;
  updatePassIndicator();
  generatePassword();
};

const copyPassword = () => {
  const password = passwordInput.value;
  if (!password) return;

  navigator.clipboard.writeText(password).then(() => {
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285F4";
    setTimeout(() => {
      copyIcon.innerText = "copy_all";
      copyIcon.style.color = "#707070";
    }, 1500);
  });
};

// Event listeners
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);

// Initialize
updateSlider();