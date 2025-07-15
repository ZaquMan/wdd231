const navButton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#mobile-nav");
const darkModeBtn = document.querySelector("#darkmode-btn");

navButton.addEventListener("click", () => {
	if (navButton.classList.contains("show")) {
		removeNavList(navBar);
	} else {
		makeNavList(navBar);
	}
	navButton.classList.toggle("show");
	navBar.classList.toggle("show");
});

darkModeBtn.addEventListener("click", () => {
	alert("Dark Mode is not functional at this time.")
	darkModeBtn.classList.toggle("show");
});

function makeNavList(parentElement) {
	// Appends the nav list to an element
	navDiv = document.createElement('div');
	navDiv.classList.add("nav-links");
	const links = ['Home', 'Directory', 'Join', 'Discover'];
	links.forEach((link) => {
		const aLink = document.createElement('a');
		const linkPath = `${link.toLowerCase()}.html`
		aLink.setAttribute('href', linkPath);
		const currentPath = window.location.pathname;
		if (linkPath === currentPath.substring(currentPath.lastIndexOf('/') + 1))
		{
			aLink.classList.add("active");
		}
		aLink.textContent = link;
		navDiv.appendChild(aLink);
	});
	parentElement.appendChild(navDiv);
}

function removeNavList(parentElement) {
	parentElement.innerHTML = "";
}