const hamBtn = document.querySelector(".hamburger");
const hamNavMenu = document.querySelector(".ham-nav");

hamBtn.addEventListener("click", () => {
	hamBtn.classList.toggle("show");
	console.log("Clicked the Ham Nav Button")
	hamNavMenu.classList.toggle("show");
});