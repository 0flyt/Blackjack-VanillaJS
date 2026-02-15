import { getCurrentUser, setCurrentUser } from '../services/storage.js';

export function renderMenu(showLogin) {
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

  container.append(logoutButton, header);

  return container;
}
