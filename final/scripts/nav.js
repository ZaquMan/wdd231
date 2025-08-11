const hamBtn = document.querySelector(".hamburger");
const hamNavMenu = document.querySelector(".ham-nav");

hamBtn.addEventListener("click", () => {
	hamBtn.classList.toggle("show");
	console.log("Clicked the Ham Nav Button")
	hamNavMenu.classList.toggle("show");
});

// Shared Footer Elements
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();
const modifiedDate = new Date(document.lastModified);

currentYear.textContent = today.getFullYear();
lastModified.textContent = `${new Intl.DateTimeFormat(
	"en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric"
}).format(modifiedDate)} ${new Intl.DateTimeFormat(
	"en-US", {
			timeStyle: "short"
		}
	).format(modifiedDate)}`