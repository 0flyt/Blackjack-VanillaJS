import { create } from '../auth/auth.js';

export function registerUser(showLogin) {
  let container = document.createElement('div');
  container.id = 'login-container';

  let labelName = document.createElement('label');
  labelName.innerText = 'Name:';

  let inputName = document.createElement('input');
  inputName.placeholder = 'Enter a username';
  inputName.id = 'create-name';

  let labelEmail = document.createElement('label');
  labelEmail.innerText = 'Email:';

  let inputEmail = document.createElement('input');
  inputEmail.placeholder = 'Enter email';
  inputEmail.id = 'create-email';

  let labelPassword = document.createElement('label');
  labelPassword.innerText = 'Password:';

  let inputPassword = document.createElement('input');
  inputPassword.placeholder = '****';
  inputPassword.id = 'login-password';
  inputPassword.type = 'password';

  let inputSubmit = document.createElement('button');
  inputSubmit.innerText = 'Create user';
  inputSubmit.id = 'create-button';
  inputSubmit.addEventListener('click', () => {
    const name = inputName.value;
    const email = inputEmail.value;
    const password = inputPassword.value;
    const pot = 100;

    create(name, email, password, pot);

    showLogin();
  });

  container.append(
    labelName,
    inputName,
    labelEmail,
    inputEmail,
    labelPassword,
    inputPassword,
    inputSubmit,
  );

  return container;
}
