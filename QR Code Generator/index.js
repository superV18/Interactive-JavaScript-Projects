const container = document.querySelector(".container");
/* Code written by Vishal Garg aka SuperV on 02-Apr-2022 */
const generatebtn = document.querySelector(".form button");
const qrinput = document.querySelector(".form input");
const qrimg = document.querySelector(".img_ img");
const qrimg1 = document.querySelector(".img_");
const refreshbtn = document.querySelector(".refresh_btn");
generatebtn.innerHTML = `\u{1F449} Click To Generate QR Code \u{1F448}`;

generatebtn.addEventListener("click", () => {
  generatebtn.innerHTML = "Generating QR Code............ \u{1F92A} ";
  generatebtn.style.background =
    "linear-gradient(to top, rgb(28 26 26), rgb(30 92 255 / 88%))";
  let qrvalue = qrinput.value;
  if (!qrvalue) {
    generatebtn.innerHTML =
      " \u{1F644} PLEASE! Enter Something..... \u{1F644} ";
    generatebtn.style.background =
      "linear-gradient(to top, rgb(28 26 26), rgb(237, 70, 70))";
    refreshbtn.style.display = "block";
    return;
  }
  qrimg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrvalue}`;
  console.log(qrvalue);
  qrimg.addEventListener("load", () => {
    container.classList.add("active");
    qrimg1.style.display = "flex";
    qrimg1.style.justifyContent = "center";
    generatebtn.innerHTML = " QR Code Generated....😍";
    generatebtn.style.background =
      "linear-gradient(to top, rgb(28 26 26), rgb(16 200 124))";
    refreshbtn.style.display = "block";
  });
});

qrinput.addEventListener("keyup", () => {
  if (!qrvalue) {
    container.classList.remove("active");
  }
});

refreshbtn.addEventListener("click", () => {
  qrinput.value = "";
  qrimg1.style.display = "none";
  generatebtn.innerHTML = `\u{1F449} Click To Generate QR Code \u{1F448}`;
  generatebtn.style.background =
    "linear-gradient(to top, rgb(28 26 26), rgb(30 92 255 / 88%))";
  refreshbtn.style.display = "none";
});
