const originsDiv = document.querySelector("#origins");
const gameplayDiv = document.querySelector("#gameplay");
const competitionDiv = document.querySelector("#competition");
const modalBox = document.querySelector("#learning-modal");

const card_content = {
	"origins": {
		"image": "images/mushi-ken-signs.webp",
		"image_alt": "The slug, frog and snake hand-signs for Mushi-ken",
		"title": "Origins of Rock, Paper, Scissors",
		"content": "The game Rock, Paper, Scissors has evolved from hand games known as Ken, popular in East Asia.  The earliest known mention of these hand games comes from the 17th century with claims that the games date back as far as 200 BC in China.  Of these hand games, a category known as Sansukumi-ken, or ken of the three who are afraid of one another, emerged.  The oldest known Sansukumi-ken is Mushi-ken, or Bug hands.  In this version, different fingers are used to represent a slug/centipede, frog, and snake (see image).  The slug beat the snake, the snake beat the frog, and the frog beat the slug.  These games originally were played by adults as drinking games, but by the 1800s, authors were writing of children playing the games too.  The version of Rock, Paper, Scissors that we know now is thought to have originated in the late 19th century as Jan-Ken-Pon.  By the early 20th century, through Japan's increased contact with Western nations, Rock, Paper, Scissors was able to spread and gain popularity."
	},
	"gameplay": {
		"image": "images/rock-paper-scissors-diagram.webp",
		"image_alt": "Hands making a rock, paper, and scissors arranged in a circle",
		"title": "How to Play Rock Paper Scissors",
		"content": "Rock, Paper, Scissors is typically played between two people.  Holding their hands in a loose fist, both players chant 'Rock, Paper, Scissors,' pumping their fist with each word.After chanting 'Rock, Paper, Scissors,' both players call out 'Shoot!' while making one of the three hand signs shown in the image.  As indicated by the arrows, rock beats scissors, scissors beat paper, and paper beats rock.  In the event that both players chose the same hand sign, they would repeat the game until a winner is chosen."
	},
	"competition": {
		"image": "images/rsp-2009-toronto-tournament.webp",
		"image_alt": "Two competitors of the 2009 Toronto Rock, Paper, Scissors tournament",
		"title": "Rock, Paper, Scissors Competitions",
		"content": "Rock, Paper, Scissor tournaments have a wide level of organization.  The largest tournament took place in 2019 in Tianjin Joy City, China.  This 4-day tournament included over 10,000 people, and was recognized by the Guinness World Records as the largest Rock, Paper, Scissors tournament.  More recent tournaments have been organized as parts of larger events, such as the 2024 Southern-Fried Gaming Expo.  Often times, cities or other smaller groups will organize more local tournaments that do not have as much publicity.  If you're looking to participate in, or even host, a tournament, check with your local City Hall and see if they can help!"
	}
}

function drawModal(jsonContent) {
	//Clear dialog modal box
	modalBox.innerHTML = "";

	const title = document.createElement("h2");
	title.textContent = jsonContent.title;
	

	const closeBtn = document.createElement("button");
	closeBtn.textContent = "X";
	closeBtn.addEventListener("click", () => modalBox.close());
	title.appendChild(closeBtn);

	modalBox.appendChild(title);

	const image = document.createElement("img");
	image.setAttribute("src", jsonContent.image);
	image.setAttribute("alt", jsonContent.image_alt);
	image.setAttribute("loading", "lazy");
	image.setAttribute("width", "300");
	image.setAttribute("height", "200");
	modalBox.appendChild(image);

	const text = document.createElement("p");
	text.textContent = jsonContent.content;
	modalBox.appendChild(text);

	modalBox.showModal();
}

originsDiv.addEventListener("click", () => drawModal(card_content.origins));

gameplayDiv.addEventListener("click", () => drawModal(card_content.gameplay));

competitionDiv.addEventListener("click", () => drawModal(card_content.competition));