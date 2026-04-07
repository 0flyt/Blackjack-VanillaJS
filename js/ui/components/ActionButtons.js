export function ActionButtons(game, updateUI) {
  const container = document.createElement('div');
  container.id = 'action-container';

  const hit = document.createElement('div');
  hit.textContent = 'Hit';
  hit.className = 'game-button hit-button';

  const stand = document.createElement('div');
  stand.textContent = 'Stand';
  stand.className = 'game-button stand-button';

  const playAgain = document.createElement('button');
  playAgain.textContent = 'Play Again';
  playAgain.className = 'game-button';

  const menu = document.createElement('button');
  menu.textContent = 'Back to menu';
  menu.className = 'game-button';

  hit.onclick = async () => {
    await game.hit(updateUI);
  };

  stand.onclick = async () => {
    await game.stand(updateUI);
  };

  playAgain.onclick = () => {
    game.resetRound();
    updateUI();
  };

  menu.onclick = () => {
    window.location.reload();
  };

  container.append(hit, stand, playAgain, menu);

  function update(state) {
    hit.style.display = state.phase === 'playing' ? 'inline-block' : 'none';

    stand.style.display = state.phase === 'playing' ? 'inline-block' : 'none';

    playAgain.style.display =
      state.phase === 'finished' ? 'inline-block' : 'none';

    menu.style.display = state.phase === 'finished' ? 'inline-block' : 'none';
  }

  return { element: container, update };
}
