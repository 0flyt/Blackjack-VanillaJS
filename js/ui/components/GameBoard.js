import {
  renderHiddenCard,
  renderCard,
  createHandContainer,
} from '../../utils/dom.js';

import { HandScore } from './HandScore.js';

export function GameBoard(container) {
  let prevPlayerCount = 0;
  let prevDealerCount = 0;

  const dealer = createHandContainer('dealer');
  const player = createHandContainer('player');

  const dealerScore = HandScore('dealer');
  const playerScore = HandScore('player');

  dealer.container.appendChild(dealerScore.element);
  player.container.appendChild(playerScore.element);

  if (!container.innerHTML) {
    container.innerHTML = `
    <div class="background">

      <div class="table-center">
        <div    class="table-title">
          BLACKJACK
        </div>
        <div class="table-rule">
          BLACKJACK PAYS 3 TO 2
        </div>
        <div class="table-rule">
          DEALER MUST STAND ON 17
        </div>
        <div class="table-rule">
        INSURANCE PAYS 2 TO 1
        </div>
      </div>
    <div id="overlay"></div>
    `;
  }

  // const overlay = container.querySelector('#overlay');

  container.append(dealer.container, player.container);

  const dealerHand = dealer.hand;
  const playerHand = player.hand;

  function render(state) {
    // if (state.phase === 'idle') {
    //   overlay.innerText = 'Waiting';
    // } else if (state.phase === 'betting') {
    //   overlay.innerText = 'Place your bet';
    // } else if (state.phase === 'dealing') {
    //   overlay.innerText = 'dealing';
    // } else {
    //   overlay.innerText = '';
    // }

    playerScore.update(
      state.playerScore,
      state.phase === 'playing' || state.phase === 'finished',
    );

    dealerScore.update(
      state.dealerScore,
      state.phase === 'playing' || state.phase === 'finished',
    );

    dealerHand.innerHTML = '';
    playerHand.innerHTML = '';

    prevPlayerCount = state.playerHand.length;
    prevDealerCount = state.dealerHand.length;

    function animateNewCard(cardEl) {
      cardEl.classList.add('dealing');

      requestAnimationFrame(() => {
        cardEl.classList.add('dealt');
      });
    }

    if (state.playerHand.length > prevPlayerCount) {
      animateNewCard(playerHand.lastChild);
    }

    if (state.dealerHand.length > prevDealerCount) {
      animateNewCard(dealerHand.lastChild);
    }

    if (state.phase === 'playing' || state.phase === 'finished') {
      state.dealerHand.forEach((card, index) => {
        let img;

        if (state.hiddenCard && index === 1) {
          img = renderHiddenCard();
        } else {
          img = renderCard(card, 'large');
        }

        img.style.left = `${index * 60}px`;
        img.style.rotate = `${card.rotation}deg`;
        dealerHand.appendChild(img);
      });

      state.playerHand.forEach((card, index) => {
        const img = renderCard(card);
        img.style.left = `${index * 60}px`;
        img.style.rotate = `${card.rotation}deg`;
        playerHand.appendChild(img);
      });
    }
  }

  return { render };
}
