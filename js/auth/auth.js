import { getUser, createUser } from '../services/storage.js';

export function login(name, password) {
  const user = getUser(name);

  if (!user) {
    return { success: false, message: 'User not found' };
  }

  if (user.password !== password) {
    return { success: false, message: 'Wrong password' };
  }

  console.log('Login success');
  return { success: true, user };
}

export function create(name, email, password, pot) {
  const existingUser = getUser(name) || getUser(email);

  if (existingUser) {
    return { success: false, message: 'User already exists' };
  }

  createUser(name, email, password, pot);

  console.log('User created');
  return { success: true };
}
