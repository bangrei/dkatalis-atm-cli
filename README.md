# ATM CLI Application

## Overview
This is a simple Command Line Interface (CLI) application simulating ATM interactions. The application allows users to log in, deposit, withdraw, transfer funds, and log out, ensuring a fresh start with every run.

## Installation
Ensure that you have Node.js installed on your system.
1. Clone this repository:
```
git clone <repository-url>
cd <repository-folder>
```

2. Make the startup script executable:
```
chmod +x start.sh
```

## Running the Application
To start the ATM CLI, run:
```
./start.sh
```

## Acceptable Commands
* `login [name]` - Logs in as this customer and creates the customer if they do not exist.

* `deposit [amount]` - Deposits the specified amount.

* `withdraw [amount]` - Withdraws the specified amount if funds are available.

* `transfer [target] [amount]` - Transfers the amount to the specified customer.

* `logout` - Logs out of the current session.

* `exit` - Closes the application.

## Notes
* Each time the script runs, it starts with a fresh state.
* Negative values are not allowed for transactions.
* Ensure Node.js is installed and accessible from the command line.

## Troubleshooting
If the script does not run, check:
* Node.js installation: node -v
* Executable permission: ls -l start.sh
* That cli.js exists in the directory.