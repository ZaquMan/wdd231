import { compareSigns, setPlayerSign, selectRandomSign } from "./rps-3.mjs";

const threeObjRock = document.querySelector("#threeObjRock");
const threeObjPaper = document.querySelector("#threeObjPaper");
const threeObjScissors = document.querySelector("#threeObjScissors");

const threeObjOptions = [threeObjRock, threeObjPaper, threeObjScissors];
let computerSign = "";

threeObjRock.addEventListener("click", async() => {
	setPlayerSign(threeObjOptions, threeObjRock);
	computerSign = await selectRandomSign(threeObjOptions);
	alert(compareSigns("rock", computerSign));
});

threeObjPaper.addEventListener("click", async() => {
	setPlayerSign(threeObjOptions, threeObjPaper);
	computerSign = await selectRandomSign(threeObjOptions);
	alert(compareSigns("paper", computerSign));
});

threeObjScissors.addEventListener("click", async() => {
	setPlayerSign(threeObjOptions, threeObjScissors);
	computerSign = await selectRandomSign(threeObjOptions);
	alert(compareSigns("scissors", computerSign));
});