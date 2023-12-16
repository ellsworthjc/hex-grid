console.log("hello");
const size = 10;

let html = "";
for (let i = 0; i < size; i++) {
	html += `<div class="grid-row">`;
	for (let j = 0; j < size; j++) {
		html += `
		<div data-tile-id="${"r" + i + "c" + j}" data-tile-row=${i} data-tile-col=${j} class="hexagon-container">
			<div class="hexagon"></div>
		</div>
		`;
	}
	html += `</div>`;
}

const hexGrid = document.getElementById("hex-grid");
hexGrid.innerHTML = html;

const tiles = document.getElementsByClassName("hexagon-container");
for (let tile of tiles) {
	tile.addEventListener("click", () => {
		// remove currently selected tile
		const selected = document.getElementsByClassName("selected");
		if (selected.length > 0) {
			selected[0].classList.remove("selected");
		}

		// show selected tile
		tile.classList.add("selected");
		console.log(`tile ${tile.dataset.tileId} clicked`);

		// clear neighbors
		document.querySelectorAll(".neighbor").forEach(e => e.classList.remove("neighbor"));

		// get neighbors
		const tileX = tile.dataset.tileRow;
		const tileY = tile.dataset.tileCol;
		let neighborCoords = [];
		if (tileX % 2 === 0) {
			neighborCoords.push({x: parseInt(tileX) - 1, y: parseInt(tileY)}); // up right
			neighborCoords.push({x: parseInt(tileX) - 1, y: parseInt(tileY) - 1}); // up left
			neighborCoords.push({x: parseInt(tileX) + 1, y: parseInt(tileY)}); // down right
			neighborCoords.push({x: parseInt(tileX) + 1, y: parseInt(tileY) - 1}); // down left
		} else {
			neighborCoords.push({x: parseInt(tileX) - 1, y: parseInt(tileY) + 1}); // up right
			neighborCoords.push({x: parseInt(tileX) - 1, y: parseInt(tileY)}); // up left
			neighborCoords.push({x: parseInt(tileX) + 1, y: parseInt(tileY) + 1}); // down right
			neighborCoords.push({x: parseInt(tileX) + 1, y: parseInt(tileY)}); // down left
		}
		neighborCoords.push({x: parseInt(tileX), y: parseInt(tileY) + 1}); // right
		neighborCoords.push({x: parseInt(tileX), y: parseInt(tileY) - 1}); // left

		// show neighbors
		neighborCoords.forEach(coords => {
			if (coords.x < size && coords.y < size && coords.x >= 0 && coords.y >= 0) {
				document.querySelector(`[data-tile-row="${coords.x}"][data-tile-col="${coords.y}"]`).classList.add("neighbor");
			}
		});
	})
}