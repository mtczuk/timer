let threadID = null;

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
  display.innerText = formatTime(0);
  startButton.onclick = function() {
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
}