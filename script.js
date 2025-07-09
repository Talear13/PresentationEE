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
      runSlides();
    } else if (val === 'N') {
      mobileInput.blur();
      removeCursor();
      terminalOutput.textContent += 'N\n>> Goodbye.';
      document.body.style.backgroundColor = 'black';
      terminalScreen.style.display = 'none';
    }
  };
}

const slides = [
  "Slide 1: What is a Cell?\\n- The basic unit of life\\n- All living things are made of cells",
  "Slide 2: Types of Cells\\n- Prokaryotic: No nucleus\\n- Eukaryotic: Has nucleus",
  "Slide 3: Organelles\\n- Nucleus: Brain\\n- Mitochondria: Powerhouse\\n- Ribosomes: Builders",
  "Slide 4: DNA\\n- Carrier of genetic info\\n- Found in nucleus",
  "Slide 5: Chromosomes\\n- DNA is packed in chromosomes\\n- Humans have 46 (23 pairs)",
  "End of presentation. Thank you."
];

let slideIndex = 0;

async function runSlides() {
  clearTerminal();
  await typeText(">> Initializing slideshow...\n");
  await sleep(500);
  showNextSlide();
}

function showNextSlide() {
  if (slideIndex >= slides.length) return;
  clearTerminal();
  typeText(slides[slideIndex] + "\n\n>> Press N for next\n>> Press Q to quit\n>> ");
  mobileInput.value = '';
  mobileInput.focus();
  mobileInput.oninput = () => {
    const val = mobileInput.value.trim().toUpperCase();
    if (val === 'N') {
      slideIndex++;
      showNextSlide();
    } else if (val === 'Q') {
      clearTerminal();
      typeText('>> Logged out. Session ended.');
    }
  };
}

logo.addEventListener('click', () => {
  showTerminal();
});
