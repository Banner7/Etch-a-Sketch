const sizeValue = document.getElementById("sizevalue");
const grid = document.getElementById("grid");
const eraser = document.getElementById("button1");
const clear = document.getElementById("button3");
const rainbowMode = document.getElementById("colorbutton2");
const shadeMode = document.getElementById("colorbutton4");
const sizeSlider = document.getElementById("sizeslider");
// Grid

const default_size = 16;
let currentSize = default_size;
sizeSlider.oninput = (e) => {
  currentSize = e.target.value;
  sizeValue.innerHTML = `${currentSize} x ${currentSize}`; //to display
  grid.innerHTML = ""; //remove old grid
  creatGrid(currentSize);
};
function creatGrid(size) {
  let gridSize = `${500 / size}px`;
  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.setAttribute("id", "gridElement");
    gridElement.style.width = gridSize;
    gridElement.style.height = gridSize;
    gridElement.style.display = "block";
    grid.appendChild(gridElement);
  }
}

// Filling on press

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const default_mode = "rainbow";
let currentMode = default_mode;
rainbowMode.onclick = () => {
  currentMode = "rainbow";
  shadeMode.classList.remove("selected");
  eraser.classList.remove("selected");
  rainbowMode.classList.add("selected");
};
shadeMode.onclick = () => {
  currentMode = "shade";
  eraser.classList.remove("selected");
  rainbowMode.classList.remove("selected");
  shadeMode.classList.add("selected");
};
eraser.onclick = () => {
  currentMode = "eraser";
  shadeMode.classList.remove("selected");
  rainbowMode.classList.remove("selected");
  eraser.classList.add("selected");
};
// I dont even know whoat does "..." do , oh its like "split" for htmlcollection
clear.onclick = () => {
  [...grid.children].forEach((child) => {
    child.style.backgroundColor = "azure";
  });
};
grid.addEventListener("mouseover", filling);
function filling(e) {
  if (e.target.id === "gridElement") {
    if (currentMode === "rainbow") {
      e.target.style.backgroundColor = getRandomColor();
    } else if (currentMode === "shade") {
      let shadecount = parseFloat(e.target.style.opacity) || 0;
      shadecount = shadecount + 0.1;
      console.log(parseFloat(e.target.style.opacity));
      e.target.style.backgroundColor = "#000000";
      e.target.style.opacity = shadecount;
    } else if (currentMode === "eraser") {
      e.target.style.backgroundColor = "azure";
      e.target.style.opacity = 1;
    }
  }
}
window.onload = () => {
  creatGrid(currentSize);
};
