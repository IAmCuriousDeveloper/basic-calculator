var runningTotal = 0;
var buffer = "0";
var previousOperator = null;
var screen = document.querySelector(".screen");

var value = document.querySelector(".calc-buttons");

var actualValue = value.addEventListener("click", (e) => {
  buttonValue(e.target.innerText);
});

function buttonValue(actualValue) {
  if (isNaN(parseInt(actualValue))) {
    handleSymbol(actualValue);
  } else {
    handleNumber(actualValue);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;

    case "=":
      if (previousOperator === null) {
        return;
      }

      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    default:
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  const intbuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intbuffer;
  } else {
    flushOperation(intbuffer);
  }
  previousOperator = value;

  buffer = "0";
}

function flushOperation(intbuffer) {
  if (previousOperator === "+") {
    runningTotal += intbuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intbuffer;
  } else if (previousOperator === "ˣ") {
    runningTotal *= intbuffer;
  } else {
    runningTotal /= intbuffer;
  }
}

function rerender() {
  screen.innerText = buffer;
}
