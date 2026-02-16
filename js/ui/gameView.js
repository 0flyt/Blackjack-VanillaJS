import { BlackjackGame } from '../game/BlackjackGame.js';

let game;

export function renderGameView() {
  game = new BlackjackGame();
  game.start();

  const container = document.createElement('div');
  container.id = 'game-container';

  const dealerContainer = document.createElement('div');
  dealerContainer.id = 'dealer-container';

  const dealerLabel = document.createElement('label');
  dealerLabel.innerText = 'Dealer hand:';

  const dealerScore = document.createElement('p');
  dealerScore.id = 'dealer-score';

  const dealerList = document.createElement('ul');
  dealerList.id = 'dealer-hand';

  dealerContainer.append(dealerLabel, dealerScore, dealerList);

  const playerContainer = document.createElement('div');
  playerContainer.id = 'player-container';

  const playerLabel = document.createElement('label');
  playerLabel.innerText = 'Player hand:';

  const playerScore = document.createElement('p');
  playerScore.id = 'player-score';

  const playerList = document.createElement('ul');
  playerList.id = 'player-hand';

  playerContainer.append(playerLabel, playerScore, playerList);

  const hitButton = document.createElement('button');
  hitButton.innerText = 'Hit';
  hitButton.addEventListener('click', () => {
    game.hit();
    updateUI();
  });

  const standButton = document.createElement('button');
  standButton.innerText = 'Stand';
  standButton.addEventListener('click', () => {
    game.stand();
    updateUI();
  });

  container.append(dealerContainer, playerContainer, hitButton, standButton);

  return container;
}

function updateUI() {
  const dealerList = document.querySelector('#dealer-hand');
  dealerList.innerHTML = '';

  const dealerScore = document.querySelector('#dealer-score');
  dealerScore.innerText = game.getDealerScore();

  for (let card of game.dealerHand) {
    const li = document.createElement('li');
    li.innerText = `${card.name}${card.suit}`;
    dealerList.appendChild(li);
  }

  const playerList = document.querySelector('#player-hand');
  playerList.innerHTML = '';

  const playerScore = document.querySelector('#player-score');
  playerScore.innerText = game.getPlayerScore();

  for (let card of game.playerHand) {
    const li = document.createElement('li');
    li.innerText = `${card.name}${card.suit}`;
    playerList.appendChild(li);
  }
}
