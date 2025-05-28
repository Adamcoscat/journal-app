export default function renderMain() {
	
	const website = document.querySelector('main');
	const journalBody = `
		<div class="journal-cont">
			<textarea class="journal"></textarea>
			<footer>
				<button class="save-btn">save entry</button>
				<button class="clear-btn">clear entry</button>
				<button class="new-entry">new entry</button>
			</footer>
		</div>
	`;
	document.querySelectorAll('li').forEach(sec => {
		sec.addEventListener('click', () => {
			if (sec.innerText === 'journal') {
				website.innerHTML = journalBody;
				sec.classList.add("clicked");
				document.querySelector('.clear-btn').addEventListener('click', () => {
					renderMain();
				})
			}
		})
		if (sec.innerText === 'journal') {
			sec.click();
		}
	})

}