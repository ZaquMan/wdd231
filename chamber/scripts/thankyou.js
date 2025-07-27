const params = new URLSearchParams(window.location.search);
const confirmation = document.querySelector("#confirmation");

const keyLabelMap = {
	"first-name": "First Name",
	"last-name": "Last Name",
	"organization-title": "Organization Title",
	"email": "Email Address",
	"phone": "Phone Number",
	"organization-name": "Organization Name",
	"member-level": "Membership Level",
	"description": "Organization Description",
	"timestamp": "Time Submitted"
}

function letterTemplateHTML(params) {
	const orgName = params.get('organization-name');
	if (orgName != null) {
		proxyApp = `, on behalf of ${orgName}`
		applicant = `${orgName}`;
	}

	const firstName = params.get('first-name');
	const lastName = params.get('last-name');

	const letter = document.createElement('div');
	const line1 = document.createElement('p');
	line1.innerText = `${firstName} ${lastName}, thank you for your application to join	the Cypress Chamber of Commerce${proxyApp}.`;
	letter.appendChild(line1);

	const line2 = document.createElement('p');
	line2.innerText = `We will reach out to you after we've reviewed your application to address the
	next steps for ${applicant} to join our members.`;
	letter.appendChild(line2);

	const line3 = document.createElement('p');
	line3.innerHTML = `Faithfully,<br>
	Zach Barnett<br>
	Head Chairperson<br>
	Cypress Chamber of Commerce`;
	letter.appendChild(line3);

	return letter;	
}

function formTemplateHTML(params) {
	const form = document.createElement('div');
	form.classList.add("form");
	const header = document.createElement('div');
	header.textContent = "Your Application";
	form.appendChild(header);

	params.keys().forEach((key) => {
		const keyDiv = document.createElement('div');
		keyDiv.classList.add('form-key');
		keyDiv.textContent = keyLabelMap[key];
		form.appendChild(keyDiv);

		const valueDiv = document.createElement('div');
		valueDiv.classList.add('form-value');
		if (key == "member-level") {
			let value = params.get(key);
			value = value.substring(0,1).toUpperCase() + value.substring(1);
			valueDiv.textContent = value;
		} else {
			valueDiv.textContent = params.get(key);
		}
		form.appendChild(valueDiv);
	});

	return form;
}

confirmation.appendChild(letterTemplateHTML(params));
confirmation.appendChild(formTemplateHTML(params));