const container = document.querySelector(".container");

for (let i=0; i<256; i++) {
    const div = document.createElement("div");
    div.classList.add('content');
    div.textContent = "";
    container.appendChild(div);
}