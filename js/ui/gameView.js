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
  betSubmit.className = 'game-button bet-button';
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
  hitButton.className = 'game-button hit-button';
  hitButton.addEventListener('click', async () => {
    await game.hit(updateUI);
  });

  const standButton = document.createElement('button');
  standButton.innerText = 'Stand';
  standButton.className = 'game-button stand-button';
  standButton.addEventListener('click', async () => {
    await game.stand(updateUI);
  });

  const actionContainer = document.createElement('div');
  actionContainer.id = 'action-container';

  actionContainer.append(hitButton, standButton);

  playingSection.append(dealerContainer, playerContainer, actionContainer);

  const finishedSection = document.createElement('div');
  finishedSection.id = 'finished-section';

  const resultText = document.createElement('h3');

  const playAgainButton = document.createElement('button');
  playAgainButton.innerText = 'Play Again';
  playAgainButton.className = 'game-button play-button';
  playAgainButton.addEventListener('click', () => {
    game.resetRound();
    updateUI();
  });

  finishedSection.append(resultText, playAgainButton);

  const bottomSection = document.createElement('div');
  bottomSection.id = 'bottom-section';

  const bottomBalanceText = document.createElement('div');
  bottomBalanceText.className = 'bottom-currency-slot';
  bottomBalanceText.innerText = 'Balance:';

  const bottomBalance = document.createElement('div');
  bottomBalance.id = 'bottom-balance';

  bottomBalance.innerText = game.pot;

  bottomBalanceText.appendChild(bottomBalance);

  const bottomInfoText = document.createElement('div');
  bottomInfoText.id = 'bottom-info';

  const bottomBetText = document.createElement('div');
  bottomBetText.className = 'bottom-currency-slot';
  bottomBetText.innerText = 'Bet:';

  const bottomBet = document.createElement('div');
  bottomBet.id = 'bottom-bet';
  bottomBet.innerText = game.bet;

  bottomBetText.appendChild(bottomBet);

  bottomSection.append(bottomBalanceText, bottomInfoText, bottomBetText);

  gameContainer.append(
    playingSection,
    finishedSection,
    betSection,
    bottomSection,
  );

  function updateUI() {
    betSection.style.display = game.phase === 'betting' ? 'flex' : 'none';

    playingSection.style.display = 'flex';

    hitButton.style.display =
      game.phase === 'playing' ? 'inline-block' : 'none';
    standButton.style.display =
      game.phase === 'playing' ? 'inline-block' : 'none';

    playAgainButton.style.display =
      game.phase === 'finished' ? 'inline-block' : 'none';

    bottomBalance.innerText = game.pot;
    bottomBet.innerText = game.bet;

    if (game.phase === 'betting') bottomInfoText.innerText = 'Place your bet';
    else if (game.phase === 'playing') bottomInfoText.innerText = 'Your move';
    else if (game.phase === 'finished')
      bottomInfoText.innerText = 'Round finished';

    function renderHands() {
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
        bottomInfoText.innerText = 'You won!';
      } else if (game.result === 'dealer') {
        bottomInfoText.innerText = 'Dealer won!';
      } else {
        bottomInfoText.innerText = 'Draw!';
      }
    }

    renderHands();

    if (game.phase === 'finished') {
      updatePotInStorage(game.pot);
      renderResult();
    }
  }

  updateUI();

  return gameContainer;
}
