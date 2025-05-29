let colorMake = document.querySelector(".color-make");
let conventerCon = document.querySelector("#conventer_con")

colorMake.addEventListener("input", (e) => {
  const target = e.target;
  const color = target.value;
  if (
    target.getAttribute("id") === "r-input" ||
    target.getAttribute("id") === "g-input" ||
    target.getAttribute("id") === "b-input"
  ) {
    // RGB小字(前
    const colorFont = target.parentElement.children[0];
    // RGB顏色格(後
    const colorBox = target.parentElement.children[2];
    // RGB整格
    const rgbs = target.parentElement.parentElement;
    // Hex字
    let hex = "#";
    for (let i = 0; i < 3; i++) {
      let rgb = parseInt(rgbs.children[i].children[1].value);
      rgb = rgb.toString(16);
      if (rgb.length < 2) {
        rgb = "0" + rgb;
      }
      hex += rgb;
    }
    const hexText =
      target.parentElement.parentElement.parentElement.children[1].children[0];
    hexText.innerText = hex.toUpperCase();
    conventerCon.setAttribute("style", `background-color:${hex};`);

    //前後顏色格顏色變化
    let bgColorR = 0;
    let bgColorG = 0;
    let bgColorB = 0;
    let colorR = 255;
    let colorG = 255;
    let colorB = 255;
    if (target.getAttribute("id") === "r-input") {
      bgColorR = color;
      colorR = color;
    } else if (target.getAttribute("id") === "g-input") {
      bgColorG = color;
      colorG = color;
    } else {
      bgColorB = color;
      colorB = color;
    }
    colorFont.setAttribute(
      "style",
      `background-color:rgb(${bgColorR},${bgColorG},${bgColorB});
        color:rgb(${colorR},${colorG},${colorB});`
    );
    colorBox.setAttribute(
      "style",
      `background-color:rgb(${bgColorR},${bgColorG},${bgColorB});
        color:rgb(${colorR},${colorG},${colorB});`
    );
    // 顏色格數字變化
    colorBox.innerText = color;
  }
});
