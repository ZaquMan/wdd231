const timestampField = document.querySelector("#timestamp");
const now = new Date();
timestampField.value = now.toLocaleString()

const nonProfitCard = document.querySelector("#non-profit-card");
const bronzeCard = document.querySelector("#bronze-card");
const silverCard = document.querySelector("#silver-card");
const goldCard = document.querySelector("#gold-card");

const memberLevelCards = [nonProfitCard, bronzeCard, silverCard, goldCard];

memberLevelCards.forEach((memberCard) => {
	const dialogId = memberCard.id.replace("card","modal");
	const dialog = document.querySelector(`#${dialogId}`);
	memberCard.addEventListener("click", () => {
		console.log(`Click registered for ${dialogId}`);
		dialog.showModal();
	});
	const closeBtn = document.querySelector(`#${dialogId} button`);
	closeBtn.addEventListener("click", () => { dialog.close(); });
});