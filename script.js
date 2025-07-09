const homeScreen = document.getElementById('home-screen');
const terminalScreen = document.getElementById('terminal-screen');
const terminalOutput = document.getElementById('terminal-output');
const logo = document.getElementById('logo');
const mobileInput = document.getElementById('mobile-input');

const cursorSymbol = '|';

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function createCursor() {
  removeCursor();
  const span = document.createElement('span');
  span.textContent = cursorSymbol;
  span.classList.add('cursor');
  return span;
}

function removeCursor() {
  const cursor = terminalOutput.querySelector('.cursor');
  if (cursor) cursor.remove();
}

async function typeText(text, speed = 60) {
  removeCursor();
  for (let ch of text) {
    terminalOutput.textContent += ch;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    await sleep(speed);
  }
  terminalOutput.appendChild(createCursor());
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function clearTerminal() {
  terminalOutput.textContent = '';
}

function showTerminal() {
  homeScreen.classList.add('hidden');
  terminalScreen.classList.remove('hidden');
  mobileInput.focus();
  startSequence();
}

async function startSequence() {
  clearTerminal();
  await typeText('Welcome to PresentationE Terminal Interface...');
  await sleep(500);
  await typeText('\nProceed? [Y/N]\n>> ');
  mobileInput.focus();
  waitForYN();
}

function waitForYN() {
  mobileInput.value = '';
  mobileInput.focus();
  mobileInput.oninput = () => {
    const val = mobileInput.value.trim().toUpperCase();
    if (val === 'Y') {
      mobileInput.blur();
      removeCursor();
      terminalOutput.textContent += 'Y\n';
      proceed();
    } else if (val === 'N') {
      mobileInput.blur();
      removeCursor();
      terminalOutput.textContent += 'N\n>> Goodbye.';
      document.body.style.backgroundColor = 'black';
      terminalScreen.style.display = 'none';
    }
  };
}

async function proceed() {
  await typeText('\nLoading presentation...');
  await sleep(800);
  await typeText('\n>> Slide 1: The Cell\n>> Slide 2: DNA\n>> Slide 3: WOw if ur heRe thAt means IT woRkeD:O');
}

logo.addEventListener('click', () => {
  showTerminal();
});
