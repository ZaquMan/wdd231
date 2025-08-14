import { compareSigns, setPlayerSign, selectRandomSign } from "./rps-3.mjs";
import { createSigns } from "./rps-11.mjs";

const threeObjRock = document.querySelector("#threeObjRock");
const threeObjPaper = document.querySelector("#threeObjPaper");
const threeObjScissors = document.querySelector("#threeObjScissors");

const threeObjOptions = [threeObjRock, threeObjPaper, threeObjScissors];
let computerSign = "";

threeObjRock.addEventListener("click", async() => {
	setPlayerSign(threeObjOptions, threeObjRock);
	computerSign = await selectRandomSign(threeObjOptions);
	computerSign = computerSign.substring(8);
	alert(compareSigns("rock", computerSign));
});

threeObjPaper.addEventListener("click", async() => {
	setPlayerSign(threeObjOptions, threeObjPaper);
	computerSign = await selectRandomSign(threeObjOptions);
	computerSign = computerSign.substring(8);
	alert(compareSigns("paper", computerSign));
});

threeObjScissors.addEventListener("click", async() => {
	setPlayerSign(threeObjOptions, threeObjScissors);
	computerSign = await selectRandomSign(threeObjOptions);
	computerSign = computerSign.substring(8);
	alert(compareSigns("scissors", computerSign));
});


//TODO: Generate elements for the 11 signs.
//TODO: Give signs click events
//TODO: Adjust compareSigns to accept my list from data

const elevenObjPartDiv = document.querySelector("#elevenObjParts");

createSigns(elevenObjPartDiv);