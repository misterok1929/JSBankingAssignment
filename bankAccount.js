// bankAccount.js
export default class BankAccount {
  constructor(accountNumber, accountHolder, balance = 0) {
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this.balance = balance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      return `Deposited ${amount}. New balance: ${this.balance}`;
    }
    return "Deposit amount must be positive.";
  }

  withdraw(amount) {
    if (amount > this.balance) {
      return "Insufficient funds.";
    }
    if (amount > 0) {
      this.balance -= amount;
      return `Withdrew ${amount}. New balance: ${this.balance}`;
    }
    return "Withdrawal amount must be positive.";
  }

  checkBalance() {
    return `Current balance: ${this.balance}`;
  }
}
