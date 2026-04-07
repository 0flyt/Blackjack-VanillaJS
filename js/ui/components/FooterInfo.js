export function FooterInfo() {
  const bottomSection = document.createElement('div');
  bottomSection.id = 'bottom-section';

  const bottomBalanceText = document.createElement('div');
  bottomBalanceText.className = 'bottom-currency-slot';
  bottomBalanceText.innerText = 'Balance:';

  const bottomBalance = document.createElement('div');
  bottomBalance.id = 'bottom-balance';

  bottomBalanceText.appendChild(bottomBalance);

  const bottomInfoText = document.createElement('div');
  bottomInfoText.id = 'bottom-info';

  const bottomBetText = document.createElement('div');
  bottomBetText.className = 'bottom-currency-slot';
  bottomBetText.innerText = 'Bet:';

  const bottomBet = document.createElement('div');
  bottomBet.id = 'bottom-bet';

  bottomBetText.appendChild(bottomBet);

  bottomSection.append(bottomBalanceText, bottomInfoText, bottomBetText);

  function render(state) {
    bottomBalance.innerText = state.pot;
    bottomBet.innerText = state.bet;
    let winner = state.result;

    let text = '';

    switch (state.phase) {
      case 'idle':
        text = 'Welcome';
        break;
      case 'betting':
        text = 'Place your bet';
        break;
      case 'dealing':
        text = 'Dealing cards...';
        break;
      case 'playing':
        text = 'Your turn';
        break;
      case 'dealerTurn':
        text = "Dealer's turn";
        break;
      case 'finished':
        text = winner === 'Draw' ? winner : `${winner} won`;
        break;
    }

    bottomInfoText.innerText = text;
  }

  return {
    element: bottomSection,
    render,
  };
}
