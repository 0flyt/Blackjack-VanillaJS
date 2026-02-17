import { BlackjackGame } from '../game/BlackjackGame.js';
import { updatePotInStorage } from '../services/storage.js';
import { renderHiddenCard, renderCard } from '../utils/dom.js';

let game;

export function renderGameView() {
  game = new BlackjackGame();
  game.phase = 'betting';

  const gameContainer = document.createElement('div');
  gameContainer.id = 'game-container';

  const betSection = document.createElement('div');
  betSection.id = 'bet-section';

  function renderBetTokens() {
    const betTokens = [1, 5, 10, 25, 100];
    const container = document.createElement('div');
    container.id = 'bet-container';

    betTokens.forEach((value) => {
      const token = document.createElement('div');
      token.className = 'bet-token';
      token.innerText = value;

      token.addEventListener('click', () => {
        if (game.phase !== 'betting') return;
        if (game.bet + value > game.pot) return;

        game.bet += value;
        updateUI();
      });
      container.appendChild(token);
    });
    return container;
  }

  const betSubmit = document.createElement('button');
  betSubmit.innerText = 'Lets go';
  betSubmit.addEventListener('click', () => {
    const bet = game.bet;
    if (bet <= 0 || bet > game.pot) return;
    game.start(bet);
    game.phase = 'playing';
    updateUI();
  });

  betSection.append(renderBetTokens(), betSubmit);

  const playingSection = document.createElement('div');
  playingSection.id = 'playing-section';

  //   const currentPot = document.createElement('div');
  //   currentPot.id = 'current-pot';
  //   currentPot.innerText = game.pot;

  const dealerContainer = document.createElement('div');
  dealerContainer.id = 'dealer-container';

  const dealerScore = document.createElement('div');
  dealerScore.id = 'dealer-score';
  dealerScore.className = 'score-tag';

  const dealerHand = document.createElement('div');
  dealerHand.id = 'dealer-hand';
  dealerHand.className = 'hand';

  const dealerCardZone = document.createElement('div');
  dealerCardZone.className = 'card-zone';

  dealerContainer.append(dealerScore, dealerHand, dealerCardZone);

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
    updateUI();
  });

  const standButton = document.createElement('button');
  standButton.innerText = 'Stand';
  standButton.addEventListener('click', () => {
    game.stand();
    updateUI();
  });

  playingSection.append(
    // currentPot,
    dealerContainer,
    playerContainer,
    hitButton,
    standButton,
  );

  const finishedSection = document.createElement('div');
  finishedSection.id = 'finished-section';

  const resultText = document.createElement('h3');

  finishedSection.append(resultText);

  const bottomSection = document.createElement('div');
  bottomSection.id = 'bottom-section';

  const bottomBalance = document.createElement('div');
  bottomBalance.id = 'bottom-balance';
  bottomBalance.className = 'bottom-currency-slot';

  const bottomInfoText = document.createElement('div');
  bottomInfoText.id = 'bottom-info';

  const bottomBet = document.createElement('div');
  bottomBet.id = 'bottom-bet';
  bottomBet.className = 'bottom-currency-slot';

  bottomSection.append(bottomBalance, bottomInfoText, bottomBet);

  gameContainer.append(
    playingSection,
    finishedSection,
    betSection,
    bottomSection,
  );

  function updateUI() {
    // betSection.style.display = game.phase === 'betting' ? 'block' : 'none';

    // playingSection.style.display = game.phase === 'playing' ? 'block' : 'none';

    // finishedSection.style.display =
    //   game.phase === 'finished' ? 'block' : 'none';

    renderHands();

    if (game.phase === 'finished') {
      updatePotInStorage(game.pot);
      renderResult();
    }

    function renderHands() {
      //   currentPot.innerText = game.pot;

      dealerHand.innerHTML = '';
      dealerScore.innerText = game.getDealerScore();

      game.dealerHand.forEach((card, index) => {
        let img;
        if (game.hiddenCard && index === 1 && game.phase === 'playing') {
          img = renderHiddenCard();
          img.style.left = `${index * 60}px`;
        } else {
          img = renderCard(card, 'large');
          img.style.left = `${index * 60}px`;
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
