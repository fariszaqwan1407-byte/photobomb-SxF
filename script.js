const scriptURL = "https://script.google.com/macros/s/AKfycbzjlzq6UiaXVNhqAPPMqP13kBUccsjxVf0jor-Kr07hAG0rlZvj1Ll5YXl6NXgkbuZmWA/exec";

let stream;
let images = [];

document.getElementById("startBtn").onclick = async function () {
  document.getElementById("cameraBox").style.display = "block";

  stream = await navigator.mediaDevices.getUserMedia({ video: true });
  document.getElementById("video").srcObject = stream;
};

document.getElementById("captureBtn").onclick = function () {
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let countdown = 3;
  document.getElementById("countdown").innerText = countdown;

  let timer = setInterval(() => {
    countdown--;
    document.getElementById("countdown").innerText = countdown;

    if (countdown === 0) {
      clearInterval(timer);
      document.getElementById("countdown").innerText = "";

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0);

      images.push(canvas.toDataURL("image/png"));

      if (images.length < 2) {
        alert("Ambil gambar lagi!");
      } else {
        send();
      }
    }
  }, 1000);
};

function send() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({
      name,
      message,
      images
    })
  })
  .then(() => {
    document.getElementById("result").innerHTML =
      "<h2>Terima Kasih 💖</h2>";
  });
}