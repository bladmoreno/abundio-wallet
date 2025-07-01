const amountInput = document.getElementById('amount');
const depositButton = document.getElementById('deposit');
const withdrawButton = document.getElementById('withdraw');
const balanceDiv = document.getElementById('balance');

async function refreshBalance() {
  const balance = await window.wallet.getBalance();
  balanceDiv.textContent = `Balance: ${balance}`;
}

depositButton.onclick = async () => {
  const amount = parseFloat(amountInput.value);
  if (!isNaN(amount)) {
    await window.wallet.deposit(amount);
    amountInput.value = '';
    refreshBalance();
  }
};

withdrawButton.onclick = async () => {
  const amount = parseFloat(amountInput.value);
  if (!isNaN(amount)) {
    await window.wallet.withdraw(amount);
    amountInput.value = '';
    refreshBalance();
  }
};

refreshBalance();
