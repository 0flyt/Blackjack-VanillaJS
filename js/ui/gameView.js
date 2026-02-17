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

  const dealerHand = document.createElement('div');
  dealerHand.id = 'dealer-hand';

  dealerContainer.append(dealerLabel, dealerScore, dealerHand);

  const playerContainer = document.createElement('div');
  playerContainer.id = 'player-container';

  const playerScore = document.createElement('div');
  playerScore.id = 'player-score';
  playerScore.className = 'score-tag';

  const playerHand = document.createElement('div');
  playerHand.id = 'player-hand';
  playerHand.className = 'hand';

  const playerCardZone = document.createElement('div');
  playerCardZone.className = 'card-zone';

  const playerBetValue = document.createElement('div');
  playerBetValue.className = 'bet-tag';

  const playerBetZone = document.createElement('div');
  playerBetZone.className = 'bet-zone';

  playerContainer.append(
    playerScore,
    playerHand,
    playerCardZone,
    playerBetValue,
    playerBetZone,
  );

  const hitButton = document.createElement('button');
  hitButton.innerText = 'Hit';
  hitButton.addEventListener('click', () => {
    game.hit();
    console.log(game.phase);
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

    renderHands();

    if (game.phase === 'finished') {
      updatePotInStorage(game.pot);
      renderResult();
    }

    function renderHands() {
      console.log(game.phase);
      currentPot.innerText = game.pot;

      dealerHand.innerHTML = '';
      dealerScore.innerText = game.getDealerScore();

      game.dealerHand.forEach((card, index) => {
        let img;
        if (game.hiddenCard && index === 1 && game.phase === 'playing') {
          img = renderHiddenCard();
        } else {
          img = renderCard(card, 'large');
        }
        img.style.left = `${index * 60}px`;
        dealerHand.appendChild(img);
      });

      playerHand.innerHTML = '';
      playerScore.innerText = game.getPlayerScore();

      game.playerHand.forEach((card, index) => {
        const img = renderCard(card);
        img.style.left = `${index * 60}px`;
        playerHand.appendChild(img);
      });

      playerBetValue.innerText = game.bet;
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
