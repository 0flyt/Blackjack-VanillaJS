import { getCurrentUserPot } from '../services/storage.js';

export class BlackjackGame {
  constructor() {
    this.pot = getCurrentUserPot();
    this.resetRound();
  }

  resetRound() {
    this.deck = this.createDeck();
    this.shuffleDeck();
    this.playerHand = [];
    this.dealerHand = [];
    this.bet = 0;
    this.phase = 'betting';
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

  dealCard(hand) {
    hand.push(this.deck.pop());
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

  start(bet) {
    this.bet = bet;
    this.pot -= bet;
    this.phase = 'playing';
    this.dealCard(this.playerHand);
    this.dealCard(this.dealerHand);
    this.dealCard(this.playerHand);
    this.dealCard(this.dealerHand);

    if (this.getPlayerScore() === 21) {
      this.stand();
    }
  }

  hit() {
    if (this.phase !== 'playing') return;
    this.dealCard(this.playerHand);

    if (this.getPlayerScore() > 21) {
      this.hiddenCard = false;
      this.endRound('dealer');
    }
  }

  stand() {
    if (this.phase !== 'playing') return;

    this.hiddenCard = false;

    while (this.getDealerScore() < 17) {
      this.dealCard(this.dealerHand);
    }
    let dealer = this.getDealerScore();
    let player = this.getPlayerScore();

    if (dealer > 21 || player > dealer) {
      this.endRound('player');
    } else if (player === dealer) {
      this.endRound('draw');
    } else {
      this.endRound('dealer');
    }
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
  }
}
