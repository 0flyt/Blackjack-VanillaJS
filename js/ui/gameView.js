import { BlackjackGame } from '../game/BlackjackGame.js';
import { updatePotInStorage } from '../services/storage.js';
import { renderHiddenCard, renderCard } from '../utils/dom.js';

let game;

export function renderGameView() {
  game = new BlackjackGame();
  game.phase = 'betting';

  const gameContainer = document.createElement('div');

  const betSection = document.createElement('div');

  const betLabel = document.createElement('label');
  betLabel.innerText = 'What you betting?';

  const betInput = document.createElement('input');
  betInput.type = 'number';

  const betSubmit = document.createElement('button');
  betSubmit.innerText = 'Lets go';
  betSubmit.addEventListener('click', () => {
    const bet = Number(betInput.value);
    if (bet <= 0 || bet > game.pot) return;
    game.bet = bet;
    game.start(betInput.value);
    game.phase = 'playing';
    updateUI();
  });

  betSection.append(betLabel, betInput, betSubmit);

  const playingSection = document.createElement('div');

  const currentPot = document.createElement('div');
  currentPot.id = 'current-pot';
  currentPot.innerText = game.pot;

  const dealerContainer = document.createElement('div');
  dealerContainer.id = 'dealer-container';

  const dealerLabel = document.createElement('label');
  dealerLabel.innerText = 'Dealer hand:';

  const dealerScore = document.createElement('p');
  dealerScore.id = 'dealer-score';

  const dealerList = document.createElement('ul');
  dealerList.id = 'dealer-hand';

  const dealerHand = document.createElement('div');

  dealerContainer.append(dealerLabel, dealerScore, dealerList, dealerHand);

  const playerContainer = document.createElement('div');
  playerContainer.id = 'player-container';

  const playerLabel = document.createElement('label');
  playerLabel.innerText = 'Player hand:';

  const playerScore = document.createElement('p');
  playerScore.id = 'player-score';

  const playerList = document.createElement('ul');
  playerList.id = 'player-hand';

  const playerHand = document.createElement('div');

  playerContainer.append(playerLabel, playerScore, playerList, playerHand);

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

  playingSection.append(
    currentPot,
    dealerContainer,
    playerContainer,
    hitButton,
    standButton,
  );

  const finishedSection = document.createElement('div');

  const resultText = document.createElement('h3');

  finishedSection.append(resultText);

  gameContainer.append(betSection, playingSection, finishedSection);

  function updateUI() {
    betSection.style.display = game.phase === 'betting' ? 'block' : 'none';

    playingSection.style.display = game.phase === 'playing' ? 'block' : 'none';

    finishedSection.style.display =
      game.phase === 'finished' ? 'block' : 'none';

    if (game.phase === 'playing') {
      renderHands();
    }

    if (game.phase === 'finished') {
      updatePotInStorage(game.pot);
      renderResult();
    }

    function renderHands() {
      currentPot.innerText = game.pot;

      dealerList.innerHTML = '';
      dealerScore.innerText = game.getDealerScore();

      for (let card of game.dealerHand) {
        const li = document.createElement('li');
        li.innerText = `${card.name}${card.suit}`;
        dealerList.appendChild(li);
        if (game.hiddenCard) {
          dealerHand.appendChild(renderHiddenCard());
          game.hiddenCard = false;
          continue;
        }
        dealerHand.appendChild(renderCard(card, 'large'));
      }

      playerList.innerHTML = '';
      playerScore.innerText = game.getPlayerScore();

      for (let card of game.playerHand) {
        const li = document.createElement('li');
        li.innerText = `${card.name}${card.suit}`;
        playerList.appendChild(li);
        playerHand.appendChild(renderCard(card));
      }
    }

    function renderResult() {
      if (game.result === 'player') {
        resultText.innerText = 'You won!';
      } else if (game.result === 'dealer') {
        resultText.innerText = 'Dealer won!';
      } else {
        resultText.innerText = 'Draw!';
      }
    }
  }

  updateUI();

  return gameContainer;
}
