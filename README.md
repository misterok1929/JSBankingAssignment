# JS Banking System — ES6 classes and modules

A small banking system built with an **ES6 class** and **ES modules**. It creates bank
accounts, then deposits, withdraws and checks balances. The results are printed to the
browser console.

**Live project:** https://misterok1929.github.io/JSBankingAssignment/

![Browser console output](console-output.png)

## The three files

| File | Job |
| --- | --- |
| `bankAccount.js` | Defines the `BankAccount` class and exports it as the default export |
| `index.js` | Imports `BankAccount`, creates two accounts and runs a demo (prints to the console) |
| `index.html` | Loads `index.js` with `<script type="module" src="./index.js">` |

## How the modules connect

```
index.html  ->  index.js  ->  bankAccount.js
```

- `bankAccount.js` ends its class with `export default class BankAccount`.
- `index.js` starts with `import BankAccount from './bankAccount.js';`.
- `index.html` loads `index.js` with `type="module"`. This is what allows `import` and
  `export` to work in the browser.

## The `BankAccount` class

**Constructor**

```js
constructor(accountNumber, accountHolder, balance = 0)
```

It stores the account number, the account holder's name and the starting balance
(which defaults to `0` if none is given).

**Methods**

| Method | What it does |
| --- | --- |
| `deposit(amount)` | Adds `amount` to the balance if it is greater than 0. Otherwise it returns `"Deposit amount must be positive."` |
| `withdraw(amount)` | Returns `"Insufficient funds."` if `amount` is more than the balance. Otherwise, if `amount` is greater than 0, it subtracts it. Otherwise it returns `"Withdrawal amount must be positive."` |
| `checkBalance()` | Returns the current balance as a message |

Each method returns a message string instead of changing the page, and `index.js` prints
those messages with `console.log`.

## What the demo prints

`index.js` creates two accounts (`ACC001` for Abdullah with 500, `ACC002` for Sara with
1000) and runs a few operations. The console shows:

```
index.js has loaded
--- Abdullah Account ---
Current balance: 500
Deposited 200. New balance: 700
Withdrew 100. New balance: 600
Current balance: 600
--- Sara Account ---
Current balance: 1000
Insufficient funds.
Deposited 300. New balance: 1300
Current balance: 1300
```

Sara's withdrawal of 1500 is refused because she only has 1000.

## Try it in the console

`index.js` puts `account1`, `account2` and `BankAccount` on `window`, so you can use them
yourself. Open the console with `Ctrl + Shift + J` and try:

```js
account1.deposit(50)
account1.withdraw(-5)
account2.checkBalance()
new BankAccount('ACC003', 'Your name', 250)
```

## Run it locally

ES modules don't load when a page is opened straight from a folder (`file://`), so serve it:

```bash
python3 -m http.server
```

then visit http://localhost:8000.

## References

- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN: `export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
