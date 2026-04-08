import { BetControls } from './components/BetControls.js';
import { ActionButtons } from './components/ActionButtons.js';
import { FooterInfo } from './components/FooterInfo.js';
import { GameBoard } from './components/GameBoard.js';
import { BlackjackGame } from '../game/BlackjackGame.js';

export function renderGameView() {
  const game = new BlackjackGame();

  document.body.classList.remove('login-mode');

  const container = document.createElement('div');

  const board = GameBoard(container);
  const footerInfo = FooterInfo();
  const betControls = BetControls(game, updateUI);
  const actions = ActionButtons(game, updateUI);

  container.append(
    board.element,
    betControls.element,
    actions.element,
    footerInfo.element,
  );

  function updateUI() {
    const state = {
      phase: game.phase,
      bet: game.bet,
      pot: game.pot,
      dealerHand: game.dealerHand,
      playerHand: game.playerHand,
      hiddenCard: game.hiddenCard,
      dealerScore: game.getDealerScore(),
      playerScore: game.getPlayerScore(),
      result: game.result,
    };

    board.render(state);
    betControls.render(state);
    actions.render(state);
    footerInfo.render(state);
  }

  updateUI();

  return container;
}
