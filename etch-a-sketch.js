function customizeGrid() {
    let size = obtainGridSize();

    if (size != null) {
        const gridProperties = computeGridProperties(size); 
        drawSquares(gridProperties[0]);
        alterSquareSize(gridProperties[1]);
    }
}

function obtainGridSize() {
    let size = 1000;
    do {
        size = prompt("Enter your desired grid size: ", "16");

        if (size > 100) {
            alert("Your input is too large. Please select a number smaller than 101.")
        }
    } while(size > 100);

    return size;
}

function computeGridProperties(size) {
    let numberOfSquares = size * size;

    const gridSize = document.querySelector(".grid");
    let style = getComputedStyle(gridSize);
    const exactSquareSize = removePx(style.width) / size;
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
    const gridSize = document.querySelector(".grid");
    let style = getComputedStyle(gridSize);
 
    const numberOfSquares = Array.from(document.querySelectorAll(".squares")).length;
    const size = Math.sqrt(numberOfSquares);

    const exactSquareSize = removePx(style.width) / size;
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

//Default setup. Appears as soon as user opens the webpage.
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

window.addEventListener("resize", checkWidth);