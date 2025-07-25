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


//FIXME: Actual instructions have you create an empty dialog in the HTML document,
//       then have that one box shown with JS generated content on button click.

function certDisplayTemplate(certificate) {
	const btn = document.createElement("button");
	if (certificate.completed === true) {
		btn.classList.add("completed");
	}

	btn.textContent = `${certificate.subject} ${certificate.number}`;
	const courseDetails = document.createElement("dialog");
	const closeBtn = document.createElement("button");
	closeBtn.innerText = "❌";
	closeBtn.classList.add("close-btn");

	btn.addEventListener("click", () => { courseDetails.showModal(); }, true);
	closeBtn.addEventListener("click", () => { courseDetails.close(); });

	const detailHeader = document.createElement("h2");
	detailHeader.innerText = `${certificate.subject} ${certificate.number}`;
	detailHeader.appendChild(closeBtn);

	courseDetails.appendChild(detailHeader);


	const detailTitle = document.createElement("h3");
	detailTitle.innerText = certificate.title;
	courseDetails.appendChild(detailTitle);

	const detailCredits = document.createElement("p");
	detailCredits.innerText = `${certificate.credits} credits`;
	courseDetails.appendChild(detailCredits);

	const detailCert = document.createElement("p");
	detailCert.innerText = `Certificate: ${certificate.certificate}`;
	courseDetails.appendChild(detailCert);

	const detailDescription = document.createElement("p");
	detailDescription.innerText = certificate.description;
	courseDetails.appendChild(detailDescription);

	const detailTech = document.createElement("p");
	detailTech.innerText = `Technology: ${certificate.technology.join(", ")}`;
	courseDetails.appendChild(detailTech);

	btn.appendChild(courseDetails);

	return btn;
}

// function renderCertDisplay(certs) {
// 	const htmlDivs = certs.map(certDisplayTemplate);
// 	document.querySelector("#certificate-list").innerHTML = htmlDivs.join('\n');
// }

function renderCertDisplay(certs) {
	const btnElements = certs.map(certDisplayTemplate);
	const certList = document.querySelector("#certificate-list");
	certList.innerHTML = ""; //Clear previous buttons
	btnElements.forEach(element => certList.appendChild(element));
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