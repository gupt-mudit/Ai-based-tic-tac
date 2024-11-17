/*
 * object to contain all items accessable to all control functions
 */
var globals = {};

/*
 * choosing difficulty level (onclick span.level) behavior and control
 * when a level is clicked, it becomes highlighted and the "ai.level" variable
 * is set to the chosen level
 */
$(".level").each(function () {
	var $this = $(this);
	$this.click(function () {
		$(".selected").toggleClass("not-selected");
		$(".selected").toggleClass("selected");
		$this.toggleClass("not-selected");
		$this.toggleClass("selected");

		ai.level = $this.attr("id");
	});
});

$(".postScore").each(function () {
	var $this = $(this);
	$this.click(function () {
		console.log("score posted");
		const databaseUrl = "https://react-http-1c8e0-default-rtdb.firebaseio.com";
		const entryPath = "/entries.json";
		const data = {
			name: "Jane Doe",
			age: 28,
			occupation: "Software Engineer",
			email: "jane.doe@example.com",
			score: 1,
		};
		console.log(data);

		console.log("inside function");
		fetch(`${databaseUrl}${entryPath}`, {
			method: "POST", // Use POST to add new entries
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				console.log("response");
				console.log(response);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				document.getElementById(
					"output"
				).textContent = `Entry posted successfully! ID: ${data.name}`;
			})
			.catch((error) => {
				console.error("Error posting data:", error);
				document.getElementById("output").textContent = "Error posting data.";
			});
	});
});

$(".playAgain").each(function () {
	var $this = $(this);
	$this.click(function () {
		location.reload();
	});
});
/*
 * start game (onclick div.start) behavior and control
 * when start is clicked and a level is chosen, the game status changes to "running"
 * and UI view to swicthed to indicate that it's human's trun to play
 */
$(".start").click(function () {
	var selectedDiffeculty = $(".selected").attr("id");
	if (typeof selectedDiffeculty !== "undefined") {
		var aiPlayer = new AI(selectedDiffeculty);
		globals.game = new Game(aiPlayer);

		aiPlayer.plays(globals.game);

		globals.game.start();
	}
});

/*
 * click on cell (onclick div.cell) behavior and control
 * if an empty cell is clicked when the game is running and its the human player's trun
 * get the indecies of the clickd cell, craete the next game state, upadet the UI, and
 * advance the game to the new created state
 */
$(".cell").each(function () {
	var $this = $(this);
	$this.click(function () {
		if (
			globals.game.status === "running" &&
			globals.game.currentState.turn === "X" &&
			!$this.hasClass("occupied")
		) {
			var indx = parseInt($this.data("indx"));

			var next = new State(globals.game.currentState);
			next.board[indx] = "X";

			ui.insertAt(indx, "X");

			next.advanceTurn();

			globals.game.advanceTo(next);
		}
	});
});
