const bidButtons = document.querySelectorAll('.bid-btn');
const currentBidEl = document.getElementById('currentBid');
const messageEl = document.getElementById('message');
const customBidInput = document.getElementById('customBid');
const customBidBtn = document.getElementById('customBidBtn');

let currentBid = 1999;

// Handle preset bids
bidButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const bidAmount = currentBid + parseInt(btn.dataset.amount);
    placeBid(bidAmount);
  });
});

// Handle custom bid
customBidBtn.addEventListener('click', () => {
  const customAmount = parseInt(customBidInput.value);
  if (isNaN(customAmount) || customAmount <= currentBid) {
    showMessage('Your custom bid must be higher than the current bid!', 'red');
  } else {
    placeBid(customAmount);
    customBidInput.value = '';
  }
});

function placeBid(amount) {
  currentBid = amount;
  currentBidEl.textContent = `₱${currentBid.toLocaleString()}`;
  showMessage(`You successfully placed a bid of ₱${amount.toLocaleString()}!`, 'green');
}

function showMessage(text, color) {
  messageEl.textContent = text;
  messageEl.style.color = color;
}
