const memberFile = 'data/members.json';
const memberBusinesses = await getMemberData();

async function getMemberData() {
	try {
		const response = await fetch(memberFile);
		if (response.ok) {
			const data = await response.json();
			return data.businesses;
		} else {
			throw Error(await response.text());
		}
	}
	catch (error) {
		console.error(error);
	}
}

export async function displayMembers(memberElement, displayMode) {
	const memberJson = await getMemberData();
	memberElement.innerHTML = "";
	if (displayMode === "list") {
		const memberTable = document.createElement("table");
		memberTable.classList.add("member-table");
		memberJson.forEach((member) => {
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
		memberElement.appendChild(memberTable);
	} else {
		const memberCards = document.createElement("div");
		memberCards.classList.add("member-cards");
		memberCards.classList.add("card");
		memberJson.forEach(member => {
			const memberCard = document.createElement("div");
			memberCard.classList.add("member-card");
			memberCard.classList.add("member-card");
			const memberLogo = document.createElement("img");
			memberLogo.setAttribute("src", `images/${member.image}`);
			memberLogo.setAttribute("alt", `${member.name}'s logo`);
			memberLogo.setAttribute("width", "200");
			memberLogo.setAttribute("height", "200");
			memberLogo.setAttribute("loading", "lazy");
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
		memberElement.appendChild(memberCards);
	}
}

function getRankFilteredMembers(minRank) {
	return memberBusinesses.filter(business => business.membership >= minRank);
}

function getRandomSelection(list, num) {
	var return_list = [];
	var used_indexes = [];
	
	if (list.length < num) {
		return list;
	}

	while (return_list.length < num) {
		const i = Math.floor(Math.random() * list.length);
		if (used_indexes.indexOf(i) == -1) {
			used_indexes.push(i);
			return_list.push(list[i]);
		}
	}
	return return_list;
}

function createMemberSpotlightCard(business) {
	const card = document.createElement("section");
	const cardHeading = document.createElement("h3");
	cardHeading.textContent = business.name;
	card.appendChild(cardHeading);
	const cardSubtitle = document.createElement("h4");
	cardSubtitle.textContent = business.tag;
	card.appendChild(cardSubtitle);
	card.appendChild(document.createElement("hr"));
	const logo = document.createElement("img");
	logo.setAttribute("src", `images/${business.image}`);
	logo.setAttribute("alt", `${business.name}'s logo`);
	logo.setAttribute("loading", "lazy");
	card.appendChild(logo);
	const email = document.createElement("p");
	email.innerHTML = `<span>EMAIL:</span> ${business.email}`;
	card.appendChild(email);
	const phone = document.createElement("p");
	phone.innerHTML = `<span>PHONE:</span> ${business.phone}`;
	card.appendChild(phone);
	const url = document.createElement("p");
	url.innerHTML = "<span>URL:</span> ";
	const link = document.createElement("a");
	link.setAttribute("href", business.website);
	link.textContent = business.website;
	url.appendChild(link);
	card.appendChild(url);
	return card;
}

export function displayMemberSpotlights(spotlightElement) {
	//Get 3 random businesses from a list of businesses that are rank 2 or higher.
	const memberList = getRandomSelection(getRankFilteredMembers(2), 3);
	memberList.forEach(business => spotlightElement.appendChild(createMemberSpotlightCard(business)));
}

export default memberBusinesses;