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
    let squareSize = Math.floor(exactSquareSize * 100) / 100; //Floored to not allow any excess.

    return [numberOfSquares, squareSize];
}

function drawSquares(numberOfSquares) {
    //Delete all the squares in the previous grid so that we can place a new one.
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    }
    
    for (let i=0; i<numberOfSquares; i++) {
        const div = document.createElement("div");
        div.classList.add("squares");
        div.style.background = `${backgroundColorPicker.toHEXAString()}`;
        div.textContent = "";
        grid.appendChild(div);
    }

    const squares = Array.from(document.querySelectorAll(".squares"));
    squares.forEach(square => square.addEventListener("mouseover", fillColor));
}

function checkWidth() {
    let gridSize = getComputedStyle(grid);
 
    const numberOfSquares = Array.from(document.querySelectorAll(".squares")).length;
    const dim = Math.sqrt(numberOfSquares);

    const exactSquareSize = removePx(gridSize.width) / dim;
    let squareSize = Math.floor(exactSquareSize * 100) / 100;
    alterSquareSize(squareSize);
}

function removePx(gridSize) {
    //A function that removes the word "px" after using getComputedStyle
    const array = gridSize.split("");
    const newArray = array.slice(0, (array.length-2));
    return newArray.toString().replace(/,/g, "");
}

function alterSquareSize(squareSize) {
    const sq = Array.from(document.querySelectorAll(".squares"));
    sq.forEach(square => 
        square.setAttribute("style", `width: ${squareSize}px; height: ${squareSize}px;
            background: ${getComputedStyle(square).background};`));

    //Set height of the grid to be the same as its width
    grid.style.height = getComputedStyle(grid).width;
}

function setMouseDown() {
    mouseDown = true;
}

function setMouseUp() {
    mouseDown = false;
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
const grid = document.querySelector(".grid");

for (let i=0; i<256; i++) {
    const div = document.createElement("div");
    div.classList.add("squares");
    div.textContent = "";
    grid.appendChild(div);
}

let mouseDown = false;
let eraserActivated = false;
window.addEventListener("resize", checkWidth);

const colorPicker = new jscolor(".pen-color", {preset: "dark", format: "hexa", value: "#000000", padding:12,
    palette:"#fff #808080 #000 #996e36 #f55525 #ffe438 #88dd20 #22e0cd #269aff #bb1cd4"});
const backgroundColorPicker = new jscolor(".background-color", {preset: "dark", format: "hexa", padding:12,
    palette:"#fff #808080 #000 #996e36 #f55525 #ffe438 #88dd20 #22e0cd #269aff #bb1cd4"});
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
const eraserButton = document.querySelector(".eraser");

penButton.addEventListener("click", () => {
    eraserActivated = false;
    penButton.classList.add("selected");
    eraserButton.classList.remove("selected");
});
eraserButton.addEventListener("click", () => {
    eraserActivated = true;
    penButton.classList.remove("selected");
    eraserButton.classList.add("selected");
});