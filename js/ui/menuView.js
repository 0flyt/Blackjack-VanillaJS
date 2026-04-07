import {
  getCurrentUser,
  getCurrentUserPot,
  setCurrentUser,
  updatePotInStorage,
} from '../services/storage.js';

import { GameBoard } from './components/GameBoard.js';

export function renderMenu(showLogin, showGame) {
  const user = getCurrentUser();

  document.body.classList.add('login-mode');
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
  addToPotButton.addEventListener('click', () => {
    updatePotInStorage(100);
    header.innerText = `Welcome, ${user.name} | Balance: ${getCurrentUserPot()}`;
  });

  const startGameButton = document.createElement('button');
  startGameButton.id = 'start-game-button';
  startGameButton.innerText = 'Start game';
  startGameButton.className = 'menu-button';
  startGameButton.addEventListener('click', () => {
    showGame();
  });

  const gameBoardContainer = document.createElement('div');
  document.body.appendChild(gameBoardContainer);

  GameBoard(gameBoardContainer);

  container.append(header, startGameButton, addToPotButton, logoutButton);

  return container;
}
