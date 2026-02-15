import { getCurrentUser } from './services/storage.js';
import { renderLogin } from './ui/loginView.js';
import { renderMenu } from './ui/menuView.js';
import { registerUser } from './ui/registerView.js';

const app = document.querySelector('#app');

const showLogin = () => {
  app.innerHTML = '';
  app.appendChild(renderLogin(showRegisterUser, showMenuView));
};

const showRegisterUser = () => {
  app.innerHTML = '';
  app.appendChild(registerUser(showLogin));
};

const showMenuView = () => {
  app.innerHTML = '';
  app.appendChild(renderMenu(showLogin));
};

const currentUser = getCurrentUser();

if (!currentUser) showLogin();
else showMenuView();
