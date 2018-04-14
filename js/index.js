let threadID = null;

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength,padString) {
      targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
      padString = String((typeof padString !== 'undefined' ? padString : ' '));
      if (this.length > targetLength) {
          return String(this);
      }
      else {
          targetLength = targetLength-this.length;
          if (targetLength > padString.length) {
              padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
          }
          return padString.slice(0,targetLength) + String(this);
      }
  };
}

function formatTime(t) {
  t = parseInt(t);
  const m = 60;
  const h = 60 * m;
  const hours = parseInt(t / h);
  t -= hours * h;
  const minutes = parseInt(t / m);
  t -= minutes * m;
  const seconds = t;
  return String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");
}

window.onload = function() {
  const startButton = document.querySelector(".start");
  const display = document.querySelector(".display");
  const container = this.document.querySelector(".container");
  display.innerText = formatTime(0);
  const timerHandler = function() {
    console.log("the button was clicked");
    if (startButton.hasAttribute("running")) {
      startButton.removeAttribute("running");
      startButton.innerText = "START";
      clearInterval(threadID);
    }
    else {
      startButton.setAttribute("running", "true");
      startButton.innerText = "STOP";
      display.setAttribute("counter", "0");
      display.innerText = formatTime(0);
      threadID = setInterval(function() {
        display.setAttribute("counter", String(parseInt(display.getAttribute("counter")) + 1));
        display.innerText = formatTime(display.getAttribute("counter"));
      }, 10);
    }
  }
  startButton.onclick = timerHandler;
  document.addEventListener("keypress", function(e) {
    if (e.which !== 13 && e.which !== 32) return;
    timerHandler();
    startButton.classList.add("hover");
    setTimeout(function() {
      startButton.classList.remove("hover");
      startButton.classList.add("active");
      container.classList.add("active");
      setTimeout(function() {
        startButton.classList.remove("active");
        container.classList.remove("active");
      }, 200);
    }, 100);
  });
}