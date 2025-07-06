const currentyear = document.querySelector("#currentyear");
const lastmodified = document.querySelector("#lastmodified");

const today = new Date();

let modifieddate = new Date(document.lastModified);

currentyear.innerHTML = `${today.getFullYear()}`;

lastmodified.innerHTML = `Last Modified: <span class="highlight">${new Intl.DateTimeFormat(
    "en-US",
    {
		//dateStyle: "short",
		month: "2-digit",
		day: '2-digit',
		year: "numeric"
    }).format(modifieddate)} ${new Intl.DateTimeFormat(
    "en-US",
    {
		timeStyle: "medium",
		hour12: false
    }).format(modifieddate)}</span>`;