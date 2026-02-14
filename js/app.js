import { renderLogin } from './ui/loginView.js';
import { registerUser } from './ui/registerView.js';

const app = document.querySelector('#app');

const showLogin = () => {
  app.innerHTML = '';
  app.appendChild(renderLogin(showRegisterUser));
};

const showRegisterUser = () => {
  app.innerHTML = '';
  app.appendChild(registerUser(showLogin));
};

showLogin();
