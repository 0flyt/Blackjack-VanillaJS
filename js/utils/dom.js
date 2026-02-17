export function elt(type, ...children) {
  let node = document.createElement(type);
  for (let child of children) {
    if (typeof child != 'string') node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
}

export function renderHiddenCard() {
  const img = document.createElement('img');
  img.src = `./assets/cards/large/back_red.png`;
  img.alt = `Hidden card`;
  img.style.margin = '5px';
  img.classList.add('card');
  img.style.borderRadius = '4px';
  img.style.width = '102px';
  img.style.height = 'auto';

  return img;
}

export function renderCard(card, size = 'large') {
  const img = document.createElement('img');
  img.src = `./assets/cards/${size}/${card.name}_of_${card.suit}.png`;
  img.alt = `${card.name} of ${card.suit}`;
  img.style.margin = '5px';
  img.style.left = '60px';
  img.classList.add('card', size);
  if (size === 'large') {
    img.style.width = '100px';
    img.style.height = 'auto';
  }
  return img;
}
