const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

let customers = {};
let currentUser = null;

const login = (name) => {
  if (!customers[name]) {
    customers[name] = { balance: 0, debt: {} };
  }
  currentUser = name;
  console.log(`Hello, ${name}!\nYour balance is $${customers[name].balance}`);
  displayDebt(name);
}

const deposit = (amount) => {
  if (!currentUser) return console.log("Please log in first.");
  amount = parseInt(amount);
  if (isNaN(amount) || amount <= 0) return console.log("Invalid amount.");

  customers[currentUser].balance += amount;
  settleDebts(currentUser);
  console.log(`Your balance is $${customers[currentUser].balance}`);
  displayDebt(currentUser);
}

const withdraw = (amount) => {
  if (!currentUser) return console.log("Please log in first.");
  amount = parseInt(amount);
  if (isNaN(amount) || amount <= 0) return console.log("Invalid amount.");
  if (customers[currentUser].balance < amount) return console.log("Insufficient funds.");

  customers[currentUser].balance -= amount;
  console.log(`Your balance is $${customers[currentUser].balance}`);
}

const transfer = (target, amount) => {
  if (!currentUser) return console.log("Please log in first.");
  amount = parseInt(amount);
  if (isNaN(amount) || amount <= 0) return console.log("Invalid amount.");
  if (!customers[target]) customers[target] = { balance: 0, debt: {} };

  if (customers[currentUser].balance >= amount) {
    customers[currentUser].balance -= amount;
    customers[target].balance += amount;
    console.log(`Transferred $${amount} to ${target}\nYour balance is $${customers[currentUser].balance}`);
  } else {
    let available = customers[currentUser].balance;
    customers[currentUser].balance = 0;
    customers[target].balance += available;
    let debt = amount - available;
    customers[currentUser].debt[target] = (customers[currentUser].debt[target] || 0) + debt;
    console.log(`Transferred $${available} to ${target}\nYour balance is $0`);
  }
  displayDebt(currentUser);
  displayDebt(target);
}

const logout = () => {
  if (!currentUser) return console.log("No user logged in.");
  console.log(`Goodbye, ${currentUser}!`);
  currentUser = null;
}

const settleDebts = (name) => {
  let balance = customers[name].balance;
  for (let debtor in customers[name].debt) {
    if (balance <= 0) break;
    let debt = customers[name].debt[debtor];
    let payment = Math.min(balance, debt);
    customers[name].debt[debtor] -= payment;
    customers[debtor].balance += payment;
    balance -= payment;
    if (customers[name].debt[debtor] === 0) delete customers[name].debt[debtor];
    console.log(`Transferred $${payment} to ${debtor}`);
  }
  customers[name].balance = balance;
}

const displayDebt = (name) => {
  let debts = customers[name].debt;
  for (let debtor in debts) {
    console.log(`Owed $${debts[debtor]} to ${debtor}`);
  }
}

rl.prompt();
rl.on("line", (line) => {
  const [command, ...args] = line.trim().split(" ");
  switch (command) {
    case "login":
      login(args[0]);
      break;
    case "deposit":
      deposit(args[0]);
      break;
    case "withdraw":
      withdraw(args[0]);
      break;
    case "transfer":
      transfer(args[0], args[1]);
      break;
    case "logout":
      logout();
      break;
    case "exit":
      rl.close();
      break;
    default:
      console.log("Unknown command");
  }
  rl.prompt();
}).on("close", () => {
  console.log("Exiting ATM CLI.");
  process.exit(0);
});
