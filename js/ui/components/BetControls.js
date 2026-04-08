export function BetControls(game, updateUI) {
  const container = document.createElement('div');
  container.id = 'bet-section';

  const betContainer = document.createElement('div');
  betContainer.id = 'bet-container';

  const betValues = [1, 5, 10, 25, 100];

  betValues.forEach((value) => {
    const chip = document.createElement('div');
    chip.className = 'bet-token';
    chip.innerText = value;

    chip.addEventListener('click', () => {
      if (game.phase !== 'betting') return;
      if (game.bet + value > game.pot) return;

      game.addBet(value);
      updateUI();
    });

    betContainer.appendChild(chip);
  });

  const startButton = document.createElement('button');
  startButton.className = 'game-button bet-button';
  startButton.innerText = 'Lets go';

  startButton.addEventListener('click', () => {
    if (game.bet <= 0 || game.bet > game.pot) return;

    game.start();
    updateUI();

    setTimeout(() => {
      game.dealInitialCards();
      updateUI();
    }, 500);
  });

  container.append(betContainer, startButton);

  function render(state) {
    container.style.display = state.phase === 'betting' ? 'flex' : 'none';
  }

  return {
    element: container,
    render,
  };
}
