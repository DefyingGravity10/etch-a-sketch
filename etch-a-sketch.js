function changeColor(e) {
    e.target.style.background = "black";
}

const container = document.querySelector(".container");

for (let i=0; i<256; i++) {
    const div = document.createElement("div");
    div.classList.add("content");
    div.textContent = "";
    container.appendChild(div);
}

const squares = Array.from(document.querySelectorAll(".content"));
squares.forEach(square => square.addEventListener("mouseover", changeColor));