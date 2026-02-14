export function getUser(nameOrEmail) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find((u) => u.name === nameOrEmail || u.email === nameOrEmail);
}

export function createUser(name, email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push({ name, email, password });

  localStorage.setItem('users', JSON.stringify(users));
}
