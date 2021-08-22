class Transaction {
  constructor(fromAdress, toAddress, amount) {
    this.fromAdress = fromAdress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

module.exports = Transaction;
