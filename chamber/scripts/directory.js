const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const memberDir = document.querySelector("#member-dir");
const memberFile = 'data/members.json';

async function getMemberData(displayMode) {
	const response = await fetch(memberFile);
	const data = await response.json();
	displayMembers(data.businesses, displayMode);
}

function displayMembers(members, displayMode) {
	memberDir.innerHTML = "";
	if (displayMode === "list") {
		const memberTable = document.createElement("table");
		memberTable.classList.add("member-table");
		members.forEach((member) => {
			const memberRow = document.createElement("tr");
			const memberName = document.createElement("td");
			memberName.textContent = member.name;
			memberRow.appendChild(memberName);
			const memberAddress = document.createElement("td");
			memberAddress.textContent = member.address;
			memberRow.appendChild(memberAddress);
			const memberPhone = document.createElement("td");
			memberPhone.textContent = member.phone;
			memberRow.appendChild(memberPhone);
			const memberURL = document.createElement("td");
			const URL = document.createElement("a");
			URL.setAttribute("href", member.website);
			URL.textContent = member.website;
			memberURL.appendChild(URL);
			memberRow.appendChild(memberURL);
			memberTable.appendChild(memberRow);
		});
		memberDir.appendChild(memberTable);
	} else {
		const memberCards = document.createElement("div");
		memberCards.classList.add("member-cards");
		members.forEach(member => {
			const memberCard = document.createElement("div");
			memberCard.classList.add("member-card");
			memberCard.classList.add("member-card");
			const memberLogo = document.createElement("img");
			memberLogo.setAttribute("src", `images/${member.image}`);
			memberLogo.setAttribute("alt", `${member.name}'s logo`);
			memberLogo.setAttribute("width", "200");
			memberLogo.setAttribute("height", "200");
			memberCard.appendChild(memberLogo);
			const memberAddress = document.createElement("span");
			memberAddress.textContent = member.address;
			memberCard.appendChild(memberAddress);
			const memberPhone = document.createElement("span");
			memberPhone.textContent = member.phone;
			memberCard.appendChild(memberPhone);
			const memberURL = document.createElement("span");
			const URL = document.createElement("a");
			URL.setAttribute("href", member.website);
			URL.textContent = member.website;
			memberURL.appendChild(URL);
			memberCard.appendChild(memberURL);
			memberCards.appendChild(memberCard);
		});
		memberDir.appendChild(memberCards);
	}
}

gridBtn.addEventListener("click", () => {
	gridBtn.classList.add("active");
	listBtn.classList.remove("active");
	getMemberData("grid");
});

listBtn.addEventListener("click", () => {
	gridBtn.classList.remove("active");
	listBtn.classList.add("active");
	getMemberData("list");
});

getMemberData("grid");