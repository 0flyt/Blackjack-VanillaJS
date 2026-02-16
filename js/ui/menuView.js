import { getCurrentUser, setCurrentUser } from '../services/storage.js';

export function renderMenu(showLogin, showGame) {
  const user = getCurrentUser();

  let container = document.createElement('div');
  container.id = 'menu-container';

  let logoutButton = document.createElement('button');
  logoutButton.innerText = 'Logout';
  logoutButton.addEventListener('click', () => {
    setCurrentUser(null);
    showLogin();
  });

  let header = document.createElement('h2');
  header.id = 'menu-header';
  header.innerText = `Welcome, ${user.name} | Balance: ${user.pot}`;

  let addToPotButton = document.createElement('button');
  addToPotButton.id = 'add-to-pot-button';
  addToPotButton.innerText = 'Add funds';

  let startGameButton = document.createElement('button');
  startGameButton.id = 'start-game-button';
  startGameButton.innerText = 'Start game';
  startGameButton.addEventListener('click', () => {
    showGame();
  });

  container.append(logoutButton, header, addToPotButton, startGameButton);

  return container;
}
