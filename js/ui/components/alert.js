export function createErrorMessage() {
  const element = document.createElement('p');
  element.className = 'error-message';
  element.style.visibility = 'hidden';

  return {
    element,
    show(message) {
      element.textContent = message;
      element.style.visibility = 'visible';
    },
    hide() {
      element.style.visibility = 'hidden';
    },
  };
}
