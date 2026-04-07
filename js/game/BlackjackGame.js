import { getCurrentUserPot, updatePotInStorage } from '../services/storage.js';

export class BlackjackGame {
  constructor() {
    this.resetRound();
  }

  resetRound() {
    this.deck = this.createDeck();
    this.shuffleDeck();
    this.playerHand = [];
    this.dealerHand = [];
    this.bet = 0;
    this.pot = getCurrentUserPot();
    this.phase = 'betting';
    this.mode = 'playing';
    this.hiddenCard = true;
    this.result = null;
  }

  createDeck() {
    const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
    const values = [
      { name: 'A', value: 11 },
      { name: '2', value: 2 },
      { name: '3', value: 3 },
      { name: '4', value: 4 },
      { name: '5', value: 5 },
      { name: '6', value: 6 },
      { name: '7', value: 7 },
      { name: '8', value: 8 },
      { name: '9', value: 9 },
      { name: '10', value: 10 },
      { name: 'Jack', value: 10 },
      { name: 'Queen', value: 10 },
      { name: 'King', value: 10 },
    ];

    const deck = [];

    for (let suit of suits) {
      for (let value of values) {
        deck.push({ suit, name: value.name, value: value.value });
      }
    }

    return deck;
  }

  shuffleDeck() {
    for (let i = 0; i < 52; i++) {
      let r = i + Math.floor(Math.random() * (52 - i));
      let temp = this.deck[i];
      this.deck[i] = this.deck[r];
      this.deck[r] = temp;
    }
  }

  addBet(amount) {
    if (this.phase !== 'betting') return;
    if (this.bet + amount > this.pot) return;

    this.bet += amount;
  }

  clearBet() {
    this.bet = 0;
  }

  dealCard(hand) {
    const card = this.deck.pop();

    hand.push({
      ...card,
      rotation: Math.random() * 8 - 4,
    });
  }

  calculateScore(hand) {
    let score = 0;
    for (let card of hand) {
      score += card.value;
    }

    let aces = hand.filter((card) => card.name === 'A').length;

    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  }

  getPlayerScore() {
    return this.calculateScore(this.playerHand);
  }

  getDealerScore() {
    if (!this.dealerHand.length) return 0;
    return this.calculateScore(
      this.hiddenCard ? this.dealerHand.slice(0, 1) : this.dealerHand,
    );
  }

  start() {
    if (this.bet <= 0) return;
    this.pot -= this.bet;
    updatePotInStorage(this.pot);
    this.phase = 'dealing';
  }

  dealInitialCards() {
    this.dealCard(this.playerHand);
    this.dealCard(this.dealerHand);
    this.dealCard(this.playerHand);
    this.dealCard(this.dealerHand);
    this.phase = 'playing';
  }

  async hit(updateStateChange) {
    if (this.phase !== 'playing') return;

    await new Promise((resolve) => setTimeout(resolve, 500));
    this.dealCard(this.playerHand);

    if (updateStateChange) updateStateChange();

    if (this.getPlayerScore() > 21) {
      this.hiddenCard = false;
      this.endRound('dealer');
      if (updateStateChange) updateStateChange();
    }
  }

  async stand(updateStateChange) {
    if (this.phase !== 'playing') return;

    this.hiddenCard = false;

    if (updateStateChange) updateStateChange();
    await new Promise((r) => setTimeout(r, 500));

    while (this.getDealerScore() < 17) {
      this.dealCard(this.dealerHand);
      if (updateStateChange) updateStateChange();
      await new Promise((r) => setTimeout(r, 500));
    }

    const dealer = this.getDealerScore();
    const player = this.getPlayerScore();

    if (dealer > 21 || player > dealer) this.endRound('Player');
    else if (player === dealer) this.endRound('Draw');
    else this.endRound('Dealer');

    if (updateStateChange) updateStateChange();
  }

  endRound(winner) {
    this.phase = 'finished';
    this.result = winner;

    if (winner === 'player') {
      this.pot += this.bet * 2;
    }

    if (winner === 'draw') {
      this.pot += this.bet;
    }
    updatePotInStorage(this.pot);
  }
}
