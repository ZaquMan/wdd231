import { displayMembers } from "./members.mjs";

const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const memberDir = document.querySelector("#member-dir");

gridBtn.addEventListener("click", () => {
	gridBtn.classList.add("active");
	listBtn.classList.remove("active");
	displayMembers(memberDir, "grid");
});

listBtn.addEventListener("click", () => {
	gridBtn.classList.remove("active");
	listBtn.classList.add("active");
	displayMembers(memberDir, "list");
});

displayMembers(memberDir, "grid");