function customizeGrid() {
    let dimensions = obtainGridDimensions();

    if (dimensions != null) {
        const gridProperties = computeGridProperties(dimensions); 
        drawSquares(gridProperties[0]);
        alterSquareSize(gridProperties[1]);
    }
}

function obtainGridDimensions() {
    let dimensions = 1000;
    do {
        dimensions = prompt("Enter your desired grid dimensions: ", "16");

        if (dimensions > 100) {
            alert("Your input is too large. Please select a number smaller than 101.")
        }
    } while(dimensions > 100);

    return dimensions;
}

function computeGridProperties(dim) {
    let numberOfSquares = dim * dim;

    const gridSize = document.querySelector(".grid");
    const styleGridSize = getComputedStyle(gridSize);
    const exactSquareSize = removePx(styleGridSize.width) / dim;
    let squareSize = Math.floor(exactSquareSize * 1000) / 1000; //Floored to not allow any excess.

    return [numberOfSquares, squareSize];
}

function drawSquares(numberOfSquares) {
    //Delete all the squares in the previous grid so that we can place a new one.
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
    
    for (let i=0; i<numberOfSquares; i++) {
        const div = document.createElement("div");
        div.classList.add("squares");
        div.textContent = "";
        container.appendChild(div);
    }

    const squares = Array.from(document.querySelectorAll(".squares"));
    squares.forEach(square => square.addEventListener("mouseover", fillColor));
}

function checkWidth() {
    const grid = document.querySelector(".grid");
    let gridSize = getComputedStyle(grid);
 
    const numberOfSquares = Array.from(document.querySelectorAll(".squares")).length;
    const dim = Math.sqrt(numberOfSquares);

    const exactSquareSize = removePx(gridSize.width) / dim;
    let squareSize = Math.floor(exactSquareSize * 1000) / 1000;
    alterSquareSize(squareSize);
}

function removePx(gridSize) {
    const array = gridSize.split("");
    const newArray = array.slice(0, (array.length-2));
    return newArray.toString().replace(/,/g, "");
}

function alterSquareSize(squareSize) {
    const sq = Array.from(document.querySelectorAll(".squares"));
    sq.forEach(square => 
        square.setAttribute("style", `width: ${squareSize}px; height: ${squareSize}px;`));
}

function setMouseDown() {
    mouseDown = true;
}

function setMouseUp() {
    mouseDown = false;
}

function activateEraser() {
    eraserActivated = true;
}

function deactivateEraser() {
    eraserActivated = false;
}

function fillColor(e) {
    if (mouseDown && !eraserActivated) {
        e.target.style.background = `${colorPicker.toHEXAString()}`;
    }
    else if (mouseDown && eraserActivated) {
        e.target.style.background = `${backgroundColorPicker.toHEXAString()}`;
    }
}

function clearGrid() {
    const squares = Array.from(document.querySelectorAll(".squares"));
    squares.forEach(square => square.style.background = `${backgroundColorPicker.toHEXAString()}`);
}

function toggleGridLines() {
    const squares = Array.from(document.querySelectorAll(".squares"));
    squares.forEach(square => square.classList.toggle("no-outline"));
}

function updateBgColor() {
    const squares = Array.from(document.querySelectorAll(".squares"));
    squares.forEach(square => square.style.background = `${backgroundColorPicker.toHEXAString()}`);
}

function eraseSquare() {
    e.target.style.background = `${backgroundColorPicker.toHEXAString()}`;   
}

//Default setup. Appears as soon as the user opens the webpage.
const container = document.querySelector(".grid");

for (let i=0; i<256; i++) {
    const div = document.createElement("div");
    div.classList.add("squares");
    div.textContent = "";
    container.appendChild(div);
}

let mouseDown = false;
let eraserActivated = false;
window.addEventListener("resize", checkWidth);

const colorPicker = new jscolor(".pen-color", {preset: "dark", format: "hexa", value: "#000000", padding:12});
const backgroundColorPicker = new jscolor(".background-color", {preset: "dark", format: "hexa", padding:12});
jscolor.trigger("input change");

const squares = Array.from(document.querySelectorAll(".squares"));
squares.forEach(square => square.addEventListener("mouseover", fillColor));

const sizeButton = document.querySelector(".size");
sizeButton.addEventListener("click", customizeGrid);

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearGrid);

const gridLineButton = document.querySelector(".grid-lines");
gridLineButton.addEventListener("click", toggleGridLines);


const penButton = document.querySelector(".pen");
penButton.addEventListener("click", deactivateEraser);

const eraserButton = document.querySelector(".eraser");
eraserButton.addEventListener("click", activateEraser);