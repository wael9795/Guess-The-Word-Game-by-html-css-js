let randomWords = ["window", "market", "animal", "laptop", "hunter", "energy", "mirror", "flower", "garden", "office", "memory", "nature", "banana", "orange", "camera", "winter", "summer", "galaxy", "yellow", "planet"];

// create the random word
let randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
console.log(randomWord.toUpperCase());

const trysNumber = 5;
const lettersNumber = 6;
let hintNumber = 4;
let currentTryNumber = 1;

let checkButton = document.querySelector(".check-word");
let hintButton = document.querySelector(".hint-button");

let divsContainer = document.querySelector(".left .divs-container");
hintButton.querySelector("span").innerHTML = `${hintNumber} `;

function generateAllRows() {
  // create the rows and inputs
  for (let i = 1; i <= trysNumber; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.id = `try-number-${i}`;
    tryDiv.classList.add("try-div");
    let tryDivHead = document.createElement("h3");
    tryDivHead.innerHTML = `Try ${i}`;
    tryDiv.appendChild(tryDivHead);

    // create row of inputs
    for (let j = 1; j <= lettersNumber; j++) {
      let inputSquare = document.createElement("input");
      inputSquare.type = "text";
      inputSquare.style.outline = "none";
      inputSquare.style.border = "none";
      inputSquare.style.borderBottom = "3px solid #4e4e4eff";
      inputSquare.maxLength = 1;
      inputSquare.id = `try-number-${i}-input-number-${j}`;
      tryDiv.appendChild(inputSquare);
    }
    divsContainer.appendChild(tryDiv);
  }
}

window.onload = () => {
  generateAllRows();
  transitionBetweenInputs();
  makeAllRowsDisabledExceptFirstOne();
};

function makeAllRowsDisabledExceptFirstOne() {
  divsContainer.querySelectorAll(".try-div").forEach((div) => {
    let currentHead = div.querySelector("h3");
    let currentInputs = div.querySelectorAll("input");
    if (div.id !== `try-number-${currentTryNumber}`) {
      currentHead.classList.add("half-opacity-head");
      currentInputs.forEach((input) => {
        input.disabled = true;
      });
    } else {
      currentHead.classList.remove("half-opacity-head");
      currentInputs.forEach((input) => {
        input.disabled = false;
      });
      currentInputs[0].focus();
    }
  });
}

checkButton.addEventListener("click", () => {
  checkWord();
});
function getCurrentInputsArray() {
  return Array.from(document.querySelector(`#try-number-${currentTryNumber}`).querySelectorAll("input"));
}
function transitionBetweenInputs() {
  let currentInputs = getCurrentInputsArray();
  currentInputs.forEach((input, indexOfInput, arrayOfInput) => {
    input.addEventListener("input", () => {
      let nextInput = arrayOfInput[indexOfInput + 1];
      if (nextInput) {
        nextInput.focus();
      }
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === `ArrowRight`) {
        let nextInput = arrayOfInput[indexOfInput + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
      if (event.key === `ArrowLeft`) {
        let previusInput = arrayOfInput[indexOfInput - 1];
        if (previusInput) {
          previusInput.focus();
        }
      }
      if (event.key === `Backspace`) {
        event.preventDefault();
        input.value = "";
        let preInput = arrayOfInput[indexOfInput - 1];
        if (preInput) {
          preInput.focus();
        }
      }
    });
  });
}
function setColorsToInputs() {
  let currentInputs = getCurrentInputsArray();
  let userWord = Array.from(currentInputs)
    .map((input) => {
      return input.value;
    })
    .join("");
  currentInputs.forEach((input, index) => {
    if (userWord[index] === randomWord[index]) {
      input.classList.add("in-place", "half-opacity");
    } else if (randomWord.includes(userWord[index])) {
      input.classList.add("out-place", "half-opacity");
    } else {
      input.classList.add("not-place", "half-opacity");
    }
  });
}

function checkWord() {
  let userWord = Array.from(document.querySelectorAll(".try-div")[currentTryNumber - 1].querySelectorAll("input"))
    .map((input) => {
      return input.value;
    })
    .join("");
  let wordLength = userWord.length;
  let currentInputs = getCurrentInputsArray();
  if (wordLength === lettersNumber) {
    setColorsToInputs();
    if (userWord.toUpperCase() === randomWord.toUpperCase()) {
      setTimeout(() => {
        window.alert(`You win the word is ${randomWord.toUpperCase()}`);
        location.reload();
      }, 300);
    } else {
      if (currentTryNumber === trysNumber) {
        setTimeout(() => {
          window.alert(`Sorry You lose the word is ${randomWord.toUpperCase()}`);
          location.reload();
        }, 300);
      } else {
        currentTryNumber++;
        makeAllRowsDisabledExceptFirstOne();
        transitionBetweenInputs();
      }
    }
  }
}
hintButton.addEventListener("click", () => {
  giveHint();
});

let hintArray = [];
function giveHint() {
  let randomNumber = Math.floor(Math.random() * lettersNumber);
  if (hintArray.includes(randomNumber)) {
    giveHint();
  } else {
    hintArray.push(randomNumber);
    let currentInputs = getCurrentInputsArray();
    let randomLetter = randomWord[randomNumber];
    console.log(`random number = ${randomNumber} ,,,, random letter = ${randomLetter}`);
    currentInputs.forEach((input, index) => {
      if (input.value.length === 0 && index === randomNumber) {
        input.value = randomLetter;
        input.classList.add("in-place");
        input.disabled = true;
      }
    });
    hintNumber--;
    hintButton.querySelector("span").innerHTML = `${hintNumber} `;
    if (hintNumber === 0) {
      hintButton.disabled = true;
      hintButton.classList.add("hint-close");
    }
  }
}
