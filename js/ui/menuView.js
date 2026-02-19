import { getCurrentUser, setCurrentUser } from '../services/storage.js';

export function renderMenu(showLogin, showGame) {
  document.body.classList.remove('login-mode');
  const user = getCurrentUser();

  const container = document.createElement('div');
  container.id = 'menu-container';

  const header = document.createElement('h2');
  header.id = 'menu-header';
  header.innerText = `Welcome, ${user.name} | Balance: ${user.pot}`;

  const logoutButton = document.createElement('button');
  logoutButton.innerText = 'Logout';
  logoutButton.className = 'menu-button';
  logoutButton.addEventListener('click', () => {
    setCurrentUser(null);
    showLogin();
  });

  const addToPotButton = document.createElement('button');
  addToPotButton.id = 'add-to-pot-button';
  addToPotButton.innerText = 'Add funds';
  addToPotButton.className = 'menu-button';

  const startGameButton = document.createElement('button');
  startGameButton.id = 'start-game-button';
  startGameButton.innerText = 'Start game';
  startGameButton.className = 'menu-button';
  startGameButton.addEventListener('click', () => {
    showGame();
  });

  container.append(header, startGameButton, addToPotButton, logoutButton);

  return container;
}
