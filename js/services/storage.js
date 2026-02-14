function getUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  console.log(users);
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
