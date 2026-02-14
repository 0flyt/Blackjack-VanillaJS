import { login } from '../auth/auth.js';
import { createErrorMessage } from './components/alert.js';

export function renderLogin(showNewUser) {
  let container = document.createElement('div');
  container.id = 'login-container';

  let labelName = document.createElement('label');
  labelName.innerText = 'Name:';

  let inputName = document.createElement('input');
  inputName.placeholder = 'Enter name or email';
  inputName.id = 'login-name';
  inputName.addEventListener('input', () => {
    error.hide();
  });

  let labelPassword = document.createElement('label');
  labelPassword.innerText = 'Password:';

  let inputPassword = document.createElement('input');
  inputPassword.placeholder = '****';
  inputPassword.id = 'login-password';
  inputPassword.type = 'password';
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
