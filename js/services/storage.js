function getUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users;
}

export function getUser(nameOrEmail) {
  const users = getUsers();
  return users.find((u) => u.name === nameOrEmail || u.email === nameOrEmail);
}

export function createUser(name, email, password, pot) {
  const users = getUsers();
  users.push({ name, email, password, pot });

  localStorage.setItem('users', JSON.stringify(users));
}

export function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

export function getCurrentUserPot() {
  return getUser(getCurrentUser().email).pot;
}

// export function updateUserPot() {
//     const user = getUser(getCurrentUser().email)
//     localStorage.setItem('')
// }
