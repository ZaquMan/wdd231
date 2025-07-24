const courseFile = "data/courses.json";
const courses = await getCourseData();

async function getCourseData() {
    try {
        const response = await fetch(courseFile);
        if (response.ok) {
            const data = await response.json();
            return data.courses;
        } else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.error(error);
    }
}

function certDisplayTemplate(certificate) {
	let completion = "";
	if (certificate.completed === true) {
		completion = 'class="completed"'
	}

	return `<div ${completion}>${certificate.subject} ${certificate.number}</div>`
}

function renderCertDisplay(certs) {
	const htmlDivs = certs.map(certDisplayTemplate);
	document.querySelector("#certificate-list").innerHTML = htmlDivs.join('\n');
}

const allBtn = document.querySelector("#all");
const cseBtn = document.querySelector("#cse");
const wddBtn = document.querySelector("#wdd");
const credits = document.querySelector("#course-credits");

let courseList = courses;
renderCertDisplay(courseList);
credits.textContent = courseList.reduce((credit, course) => credit + course.credits, 0);

allBtn.addEventListener("click", () => {
	allBtn.classList.add("active");
	cseBtn.classList.remove("active");
	wddBtn.classList.remove("active");
	courseList = courses;
	renderCertDisplay(courseList);
	credits.textContent = courseList.reduce((credit, course) => credit + course.credits, 0);
});

cseBtn.addEventListener("click", () => {
	allBtn.classList.remove("active");
	cseBtn.classList.add("active");
	wddBtn.classList.remove("active");
	courseList = courses.filter((course) => course.subject.toLowerCase() === "cse");
	renderCertDisplay(courseList);
	credits.textContent = courseList.reduce((credit, course) => credit + course.credits, 0);
});

wddBtn.addEventListener("click", () => {
	allBtn.classList.remove("active");
	cseBtn.classList.remove("active");
	wddBtn.classList.add("active");
	courseList = courses.filter((course) => course.subject.toLowerCase() === "wdd");
	renderCertDisplay(courseList);
	credits.textContent = courseList.reduce((credit, course) => credit + course.credits, 0);
});


//TEST
const modal = document.querySelector("#test-dialog");
const openBtn = document.querySelector("#test-btn");
const closeBtn = document.querySelector("#test-close");

openBtn.addEventListener("click", () => {
	modal.show();
});

closeBtn.addEventListener("click", () => {
	modal.close();
})