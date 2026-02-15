import { login } from '../auth/auth.js';
import { createErrorMessage } from './components/alert.js';
import { renderMenu } from './menuView.js';

export function renderLogin(showNewUser, showMenu) {
  let container = document.createElement('div');
  container.id = 'login-container';

  let labelName = document.createElement('label');
  labelName.innerText = 'Name:';
  labelName.for = 'login-name';

  let inputName = document.createElement('input');
  inputName.placeholder = 'Enter name or email';
  inputName.id = 'login-name';
  inputName.required = true;

  inputName.addEventListener('input', () => {
    error.hide();
  });

  let labelPassword = document.createElement('label');
  labelPassword.innerText = 'Password:';
  labelPassword.for = 'login-password';

  let inputPassword = document.createElement('input');
  inputPassword.placeholder = '****';
  inputPassword.id = 'login-password';
  inputPassword.type = 'password';
  inputPassword.required = true;
  inputPassword.addEventListener('input', () => {
    error.hide();
  });

  let error = createErrorMessage();

  let createAccount = document.createElement('p');
  createAccount.innerText = 'Got no account? Click here!';
  createAccount.id = 'create-account';
  createAccount.addEventListener('click', () => {
    showNewUser();
  });

  let inputSubmit = document.createElement('button');
  inputSubmit.innerText = 'Login';
  inputSubmit.id = 'login-button';
  inputSubmit.addEventListener('click', () => {
    const name = inputName.value;
    const password = inputPassword.value;

    const result = login(name, password);

    if (!result.success) {
      error.show(result.message);
      return;
    }

    showMenu();
  });

  container.append(
    error.element,
    labelName,
    inputName,
    labelPassword,
    inputPassword,
    createAccount,
    inputSubmit,
  );

  return container;
}
