export default function renderMain() {
	const website = document.querySelector('main');
	let entries = JSON.parse(localStorage.getItem("savedEntries")) || [];;
	
	function getEntries() {
		return JSON.parse(localStorage.getItem("savedEntries"));
	}
	
	function clearClicked() {
		document.querySelectorAll("li").forEach(sec => {
			if (sec.classList.contains("clicked")) {
				sec.classList.remove("clicked")
			}
		})
	}
	
	function saveArray(entry) {
		entries.push(entry);
		localStorage.setItem("savedEntries", JSON.stringify(entries));
	}	
	
	function renderJournal() {
		clearClicked();
		const journalBody = `
			<div class="journal-cont">
				<textarea class="journal">${localStorage.getItem("savedEntry") || ""}</textarea>
				<footer>
					<button class="save-btn">save entry</button>
					<button class="clear-btn">clear entry</button>
					<button class="new-entry">new entry</button>
				</footer>
			</div>
		`;
	
		website.innerHTML = journalBody;
		const journal = document.querySelector('.journal');
		document.querySelector('.clear-btn').addEventListener('click', () => {
			localStorage.removeItem("savedEntry")
			renderJournal();
		})
		document.querySelector('.save-btn').addEventListener('click', () => {
			const journalText = journal.value
			localStorage.setItem("savedEntry", journalText);
		})
		document.querySelector('.new-entry').addEventListener("click", () => {
			saveArray(journal.value)
			console.log(getEntries());
			localStorage.removeItem("savedEntry");
			renderJournal();
		})
	}
	
	function renderEntries() {
		clearClicked();
		let HTML = ``
		let i = 0;
		
		function loadEntry(id) {
			localStorage.removeItem("savedEntry")
			localStorage.setItem("savedEntry", getEntries()[id])
			renderJournal();
		}
		
		function rmvEntry(id) {
			const arr = entries
			arr.splice(id, 1)
			console.log(arr)
			localStorage.removeItem("savedEntries")
			localStorage.setItem("savedEntries", JSON.stringify(arr))
		}

		getEntries().forEach(entry => {
			HTML += `
					<div class="entry-cont" id="${i}">
						<div class="entry-title">ya</div>
						<div class="buttons-cont">
							<button class="entry-load" data-id="${i}">Load</button>
							<button class="entry-remove" data-id="${i}">Remove</button>
						</div>
					</div>
			`
		i++
		})
		console.log(HTML)
		website.innerHTML = `<div class="entries-main">${HTML}</div>`;
		document.querySelectorAll(".entry-load").forEach(btn => {
			btn.addEventListener("click", () => {
				const id = parseInt(btn.getAttribute("data-id"));
				loadEntry(id)
			})
		})
		
		document.querySelectorAll(".entry-remove").forEach(btn => {
			btn.addEventListener("click", () => {
				const id = parseInt(btn.getAttribute("data-id"));
				rmvEntry(id)
				renderEntries();
			})
		})
	}
		

	document.querySelectorAll('li').forEach(sec => {
		sec.addEventListener('click', () => {
			if (sec.innerText === 'journal') {
				renderJournal();
				sec.classList.add("clicked");
			} else if(sec.innerText === 'entries') {
				renderEntries();
				sec.classList.add("clicked")
			}
		})
	})
}