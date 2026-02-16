export class BlackjackGame {
  constructor() {
    this.deck = this.createDeck();
    this.playerHand = [];
    this.dealerHand = [];
    this.pot = 0;
    this.finished = false;

    this.shuffleDeck();
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
      { name: 'J', value: 10 },
      { name: 'Q', value: 10 },
      { name: 'K', value: 10 },
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
    return this.calculateScore(this.dealerHand);
  }

  start() {
    this.dealCard(this.playerHand);
    this.dealCard(this.dealerHand);
    this.dealCard(this.playerHand);
    this.dealCard(this.dealerHand);
  }

  hit() {
    this.dealCard(this.playerHand);
  }

  stand() {
    if (this.calculateScore(this.dealerHand) < 21) {
      this.dealCard(this.dealerHand);
    }
  }
}
