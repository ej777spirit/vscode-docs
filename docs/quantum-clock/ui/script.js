const timeDisplay = document.querySelector('.time-display');
const quantumStateIndicator = document.querySelector('.quantum-state-indicator');
const entanglementLevel = document.querySelector('.entanglement-level');
const historyLog = document.querySelector('.history-log');

let time = new Date();
entanglementLevel.style.width = '100%';

function updateTime() {
    time.setMilliseconds(time.getMilliseconds() + 1);
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const milliseconds = String(time.getMilliseconds()).padStart(3, '0');
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateQuantumState() {
    const fluctuation = (Math.random() - 0.5) * 20;
    quantumStateIndicator.style.setProperty('--fluctuation', `${fluctuation}px`);
}

function updateEntanglement() {
    let currentWidth = parseFloat(entanglementLevel.style.width);
    if (Math.random() < 0.01) {
        currentWidth -= 5;
        logEvent('Decoherence event detected!');
    } else if (currentWidth < 100) {
        currentWidth += 0.1;
    }
    entanglementLevel.style.width = `${currentWidth}%`;
}

function logEvent(message) {
    const logEntry = document.createElement('div');
    logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    historyLog.appendChild(logEntry);
    historyLog.scrollTop = historyLog.scrollHeight;
}

setInterval(updateTime, 1);
setInterval(updateQuantumState, 100);
setInterval(updateEntanglement, 200);

logEvent('Quantum Clock initialized.');
