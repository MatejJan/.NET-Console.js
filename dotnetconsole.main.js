Console = (() => {
  let bufferHeight = 24;
  let bufferWidth = 80;
  let windowHeight = 24;
  let windowWidth = 80;

  let cursorLeft = 0;
  let cursorTop = 0;
  let cursorVisible = true;

  let foregroundColor = 15;
  let backgroundColor = 0;

  const bufferTable = document.createElement('table');

  let worker;

  // Private methods

  function getCursorDataCell() {
    return document.querySelector('.cursor') || getCell(cursorLeft, cursorTop);
  }

  function getCell(x, y) {
    return bufferTable.childNodes[y].childNodes[x];
  }

  // Row manipulations

  function addRow() {
    const row = document.createElement('tr');

    for (let columnIndex = 0; columnIndex < windowWidth; columnIndex++) {
      const dataCell = document.createElement('td');

      dataCell.innerHTML = '&nbsp;';
      dataCell.className = `foreground-${foregroundColor} background-${backgroundColor}`;

      row.appendChild(dataCell);
    }

    bufferTable.appendChild(row);
  }

  function removeFirstRow() {
    bufferTable.childNodes[0].remove();
  }

  // Operations

  function scroll() {
    // Scroll by one row.
    removeFirstRow();
    addRow();

    // Reposition cursor.
    setCursorPosition({cursorLeft, cursorTop});
  }

  function setColors(options) {
    foregroundColor = options.foregroundColor >= 0 ? options.foregroundColor : 15;
    backgroundColor = options.backgroundColor >= 0 ? options.backgroundColor : 0;
  }

  function setCursorPosition(options) {
    // Remove cursor class from previous data cell.
    oldCursorDataCell = getCursorDataCell();
    oldCursorDataCell.classList.remove('cursor');

    cursorLeft = options.cursorLeft;
    cursorTop = options.cursorTop;

    newCursorDataCell = getCursorDataCell();
    newCursorDataCell.classList.add('cursor');
  }

  function writeCharacter({character, x, y}) {
    dataCell = getCell(x, y);

    if (character === ' ') {
      dataCell.innerHTML = '&nbsp;';
    } else {
      dataCell.innerText = character;
    }

    // Change colors.
    dataCell.className = `foreground-${foregroundColor} background-${backgroundColor}`;

    if (cursorLeft === x && cursorTop === y) {
      dataCell.classList.add('cursor');
    }
  }

  function clear() {
    for (let i = 0; i < bufferHeight; i++) {
      scroll();
    }
  }

  let operations = {scroll, setColors, setCursorPosition, writeCharacter, clear};

  // Initialize table.
  for (let rowIndex = 0; rowIndex < bufferHeight; rowIndex++) {
    addRow();
  }

  setCursorPosition({cursorLeft: 0, cursorTop: 0});

  // Add table to body after DOM is loaded.
  document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body');
    body.appendChild(bufferTable);
  });

  // Listen to keys.
  document.addEventListener("keydown", event => {
    if (event.isComposing) {
      return;
    }

    worker.postMessage({
      operation: 'keydown',
      key: event.key,
      code: event.code,
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      shiftKey: event.shiftKey
    });
  });

  // Listen to focus events.
  const html = document.querySelector('html')

  window.addEventListener('blur', event => {
    html.classList.add('inactive');
  });

  window.addEventListener('focus', event => {
    html.classList.remove('inactive');
  });

  return class Console {
    static run(stringUrl) {
      document.addEventListener("DOMContentLoaded", () => {
        worker = new Worker(stringUrl);

        worker.onmessage = messageEvent => {
          operations[messageEvent.data.operation](messageEvent.data);
        }
      });
    }
  }
})();
