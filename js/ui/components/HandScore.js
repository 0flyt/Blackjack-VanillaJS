export function HandScore(type) {
  const element = document.createElement('div');
  element.className = 'hand-score';
  element.id = `${type}-score`;
  element.style.display = 'none';

  function render(value, visible) {
    element.style.display = visible ? 'block' : 'none';
    element.innerText = visible ? value : '';
    element.style.opacity = visible ? '1' : '0';
  }

  return {
    element,
    render,
  };
}
