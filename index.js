// index.js
import BankAccount from './bankAccount.js';

// Create some accounts
const account1 = new BankAccount('ACC001', 'Abdullah', 500);
const account2 = new BankAccount('ACC002', 'Sara', 1000);

// Just to confirm the file is being loaded
console.log('index.js has loaded');

// Demo operations in console log
console.log('--- Abdullah Account ---');
console.log(account1.checkBalance());
console.log(account1.deposit(200));
console.log(account1.withdraw(100));
console.log(account1.checkBalance());

console.log('--- Sara Account ---');
console.log(account2.checkBalance());
console.log(account2.withdraw(1500)); // should show insufficient funds
console.log(account2.deposit(300));
console.log(account2.checkBalance());

// ✅ Expose them to the browser console (but not in Node)
if (typeof window !== 'undefined') {
  window.account1 = account1;
  window.account2 = account2;
  window.BankAccount = BankAccount;
}
