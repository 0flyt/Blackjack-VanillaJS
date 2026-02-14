import { renderLogin, renderNewUser } from './ui/loginView.js';

const app = document.querySelector('#app');

const showLogin = () => {
  app.innerHTML = '';
  app.appendChild(renderLogin(showNewUser));
};

const showNewUser = () => {
  app.innerHTML = '';
  app.appendChild(renderNewUser(showLogin));
};

showLogin();
