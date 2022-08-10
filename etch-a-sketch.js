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
    squares.forEach(square => square.addEventListener("mouseover", changeColor));
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

function changeColor(e) {
    e.target.style.background = "black";
}

function clearGrid(e) {
    squares.forEach(square => square.style.background = "silver");
}

function toggleGridLines(e) {
    squares.forEach(square => square.classList.toggle("no-outline"));
}

//Default setup. Appears as soon as the user opens the webpage.
const container = document.querySelector(".grid");

for (let i=0; i<256; i++) {
    const div = document.createElement("div");
    div.classList.add("squares");
    div.textContent = "";
    container.appendChild(div);
}

const squares = Array.from(document.querySelectorAll(".squares"));
squares.forEach(square => square.addEventListener("mouseover", changeColor));

const sizeButton = document.querySelector(".size");
sizeButton.addEventListener("click", customizeGrid);

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearGrid);

const GridLineButton = document.querySelector(".grid-lines");
GridLineButton.addEventListener("click", toggleGridLines);

window.addEventListener("resize", checkWidth);