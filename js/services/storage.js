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

export function updatePotInStorage(newPot) {
  const currentUser = getCurrentUser();
  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.email === currentUser.email ? { ...user, pot: newPot } : user,
  );

  localStorage.setItem('users', JSON.stringify(updatedUsers));

  const updatedCurrentUser = { ...currentUser, pot: newPot };
  localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
}
