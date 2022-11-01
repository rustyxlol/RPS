const images = {
  rock: "https://pbs.twimg.com/media/D8Kygw6XYAEeEg8.png",
  paper: "https://art.pixilart.com/2e29f43a603936d.png",
  scissors: "https://pbs.twimg.com/media/D7mSLOMUIAAGYfa.png",
};

const player_rock = document.querySelector('input[name="player-rock"]');
const player_paper = document.querySelector('input[name="player-paper"]');
const player_scissors = document.querySelector('input[name="player-scissors"]');
const player_selection_image = document.querySelector(
  ".player-selection-image"
);
const computer_selection_image = document.querySelector(
  ".computer-selection-image"
);
const result = document.querySelector(".result-text");
const round_counter_display = document.querySelector(".round-counter");
const player_score = document.querySelector(".player-score");
const computer_score = document.querySelector(".computer-score");

const player_choices = [player_rock, player_paper, player_scissors];
const btn_restart = document.querySelector(".btn-reset");

let round_counter = 1;

btn_restart.addEventListener("click", () => {
  round_counter = 1;
  round_counter_display.textContent = round_counter;
  player_score.textContent = 0;
  computer_score.textContent = 0;
  result.textContent = "";
  computer_selection_image.src = "";
  player_selection_image.src = "";
});

player_choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const player_selection = choice.name.split("-")[1];
    const computer_selection = getRandomMove();

    computer_selection_image.src = images[computer_selection];
    player_selection_image.src = images[player_selection];

    const winner = checkWinner(player_selection, computer_selection);
    displayWinner(winner);

    round_counter_display.textContent = round_counter += 1;
  });
});

function getRandomMove() {
  const keys = Object.keys(images);
  return keys[Math.floor(Math.random() * keys.length)];
}

function checkWinner(player, computer) {
  let winner = "player";

  if (player == computer) {
    winner = "tie";
    return winner;
  }

  switch (player) {
    case "rock":
      if (computer == "paper") winner = "computer";
      break;
    case "paper":
      if (computer == "scissors") winner = "computer";
      break;
    case "scissors":
      if (computer == "rock") winner = "computer";
      break;
    default:
      winner = "player";
  }

  return winner;
}

function displayWinner(winner) {
  switch (winner) {
    case "tie":
      result.textContent = "It's a tie!";
      break;
    case "computer":
      result.textContent = "You lose!";
      computer_score.textContent = parseInt(computer_score.textContent) + 1;
      break;
    default:
      result.textContent = "You win!";
      player_score.textContent = parseInt(player_score.textContent) + 1;
  }
}
