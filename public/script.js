let factCount = 0;

// Wait for DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generateBtn');
  const shareBtn = document.getElementById('shareBtn');
  
  if (generateBtn) {
    generateBtn.addEventListener('click', getFact);
  }
  
  if (shareBtn) {
    shareBtn.addEventListener('click', shareDiscovery);
  }
});

async function getFact() {
  const factEl = document.getElementById('fact');
  const labelEl = document.getElementById('fact-label');

  if (!factEl) return;
  
  factEl.classList.add('loading');
  factEl.textContent = 'Fetching a purr-fect fact…';

  try {
    const res = await fetch('/cat-fact');
    
    // Check if the response is ok (status 200-299)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    factCount++;
    factEl.textContent = `"${data.fact}"`;
    
    if (labelEl) {
      labelEl.textContent = `Feline Fact #${factCount}`;
    }
    
    factEl.classList.remove('loading');
  } catch (err) {
    console.error('Error fetching fact:', err);
    factEl.textContent = 'Could not fetch a fact. Is the server running?';
    factEl.classList.remove('loading');
  }
}

function shareDiscovery() {
  const factEl = document.getElementById('fact');
  if (!factEl) return;
  
  const fact = factEl.textContent;
  
  // Don't share the placeholder message
  if (fact && !fact.startsWith('Click') && !fact.startsWith('Fetching')) {
    // Try modern clipboard API first
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`🐾 PurrFacts: ${fact}`)
        .then(() => showToast('Copied to clipboard! 🐾'))
        .catch(() => showToast('Copy the fact manually 🐾'));
    } 
    // Fallback for older browsers or if clipboard fails
    else {
      showToast('Copy the fact manually 🐾');
    }
  } else {
    showToast('Generate a fact first! 🐾');
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}