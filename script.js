const homeScreen     = document.getElementById('home-screen');
const terminalScreen = document.getElementById('terminal-screen');
const terminalOutput = document.getElementById('terminal-output');
const logo           = document.getElementById('logo');

const cursorSymbol = '|';
const typingSpeed = 35; // consistent speed

const slides = [
  "Welcome to our science presentation.\nTopic: The Cell\n\nProceed? [Y/N]",
  "What is a Cell?\n- A cell is the basic unit of life.\n- All living things are made of cells.\n\nProceed? [Y/N]",
  "Types of Cells:\n- Prokaryotic (no nucleus)\n- Eukaryotic (has nucleus)\n\nProceed? [Y/N]",
  "Cell Organelles:\n- Nucleus: control center\n- Mitochondria: energy producer\n- Ribosomes: protein builders\n- ER & Golgi: material transport & processing\n\nProceed? [Y/N]",
  "Did You Know?\n- The human body has over 37 trillion cells!\n\nProceed? [Y/N]",
  "Thank you for watching.\nFeel free to ask any questions.\n\nProceed? [Y/N]"
];

let currentSlide = 0;

// Utils
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
function createCursor() {
  removeCursor();
  const c = document.createElement('span');
  c.textContent = cursorSymbol;
  c.classList.add('cursor');
  return c;
}
function removeCursor() {
  const ex = terminalOutput.querySelector('.cursor');
  if (ex) ex.remove();
}
async function typeText(text, speed = typingSpeed) {
  removeCursor();
  terminalOutput.textContent = '';
  for (let ch of text) {
    terminalOutput.textContent += ch;
    await sleep(speed);
  }
  terminalOutput.appendChild(createCursor());
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Slide navigation
function waitForYN() {
  window.addEventListener('keydown', function h(e) {
    const k = e.key.toUpperCase();
    if (k === 'Y' || k === 'N') {
      window.removeEventListener('keydown', h);
      removeCursor();
      terminalOutput.textContent += `\n>> ${k}`;
      if (k === 'Y') nextSlide();
      else sayGoodbye();
    }
  });
}

async function sayGoodbye() {
  await sleep(400);
  await typeText(">> Goodbye.");
  await sleep(1000);
  terminalScreen.style.transition = "opacity 1.2s ease";
  terminalScreen.style.opacity = 0;
  setTimeout(() => terminalScreen.innerHTML = '', 1200);
}

async function nextSlide() {
  currentSlide++;
  if (currentSlide < slides.length) {
    await sleep(400);
    await typeText(slides[currentSlide]);
    waitForYN();
  } else {
    await sleep(400);
    await typeText(">> End of Presentation.");
  }
}

async function startTerminal() {
  homeScreen.classList.add('hidden');
  terminalScreen.classList.remove('hidden');
  terminalScreen.style.opacity = 1;
  await typeText(slides[0]);
  waitForYN();
}

logo.addEventListener('click', startTerminal);
