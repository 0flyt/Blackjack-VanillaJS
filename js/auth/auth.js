import { getUser, createUser } from '../services/storage.js';

export function login(name, password) {
  const user = getUser(name);

  if (!user) {
    console.log('User not found');
    return false;
  }

  if (user.password !== password) {
    console.log('Wrong password');
    return false;
  }

  console.log('Login success');
  return true;
}

export function create(name, email, password) {
  const user = createUser(name, email, password);

  if (user) {
    console.log('User already exist');
    return false;
  }

  console.log('User created');
  return true;
}
