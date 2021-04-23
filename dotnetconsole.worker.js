importScripts('bridge.js');

Console = (() => {
  // Helper objects

  let consoleKeysForCode = {
    Backspace: ConsoleKey.backspace,
    Tab: ConsoleKey.tab,
    Enter: ConsoleKey.enter,
    NumpadEnter: ConsoleKey.enter,
    Pause: ConsoleKey.pause,
    Escape: ConsoleKey.escape,
    Space: ConsoleKey.spacebar,
    PageUp: ConsoleKey.pageUp,
    PageDown: ConsoleKey.pageDown,
    End: ConsoleKey.end,
    Home: ConsoleKey.home,
    ArrowLeft: ConsoleKey.leftArrow,
    ArrowUp: ConsoleKey.upArrow,
    ArrowRight: ConsoleKey.rightArrow,
    ArrowDown: ConsoleKey.downArrow,
    Select: ConsoleKey.select,
    PrintScreen: ConsoleKey.printScreen,
    Insert: ConsoleKey.insert,
    Delete: ConsoleKey.delete,
    Help: ConsoleKey.help,
    MetaLeft: ConsoleKey.leftWindows,
    MetaRight: ConsoleKey.rightWindows,
    ContextMenu: ConsoleKey.applications,
    Minus: ConsoleKey.subtract,
  };

  for (let charCode = 65; charCode <= 90; charCode++) {
    let char = String.fromCharCode(charCode);
    consoleKeysForCode[`Key${char}`] = ConsoleKey[char.toLowerCase()];
  }

  for (let digit = 0; digit <= 9; digit++) {
    consoleKeysForCode[`Digit${digit}`] = ConsoleKey[`d${digit}`];
  }

  // Properties' backing variables

  let backgroundColor = -1;

  let bufferHeight = 24;
  let bufferWidth = 80;

  let cursorLeft = 0;
  let cursorTop = 0;
  let cursorVisible = true;

  let foregroundColor = -1;

  let windowHeight = 24;
  let windowWidth = 80;

  // Private variables

  let readKeyConsoleKeyInfo = null;
  let readKeyCallback = null;

  let readLineValue = "";
  let readLineCallback = null;

  let lastWritePositionWasBottomRight = false;

  // Operations

  function keydown({code, key, altKey, ctrlKey, shiftKey}) {
    let consoleKey = consoleKeysForCode[code] || 0;

    // We assume we have a printable key character if the key is of length one (special keys have longer names).
    let keyChar = key.length === 1 ? key : '';

    if (readLineCallback) {
      // Ignore presses while control is down.
      if (ctrlKey) return;

      // Read line command ends when enter is pressed.
      if (consoleKey === ConsoleKey.enter) {
        newLine();

        let value = readLineValue;
        let callback = readLineCallback

        readLineValue = "";
        readLineCallback = null;

        callback(value);
        return;
      }

      // Backspace moves back.
      if (consoleKey === ConsoleKey.backspace) {
        // Nothing happens if we're at the start again.
        if (readLineValue.length === 0) return;

        readLineValue = readLineValue.substring(0, readLineValue.length - 1);

        // Move cursor one spot back.
        cursorLeft--;

        if (cursorLeft < 0) {
          cursorLeft = bufferWidth - 1;
          cursorTop--;
        }

        postMessage({
          operation: 'setCursorPosition',
          cursorLeft,
          cursorTop
        });

        // Delete character at cursor.
        postMessage({
          operation: 'writeCharacter',
          x: cursorLeft,
          y: cursorTop,
          character: ' '
        });

        return;
      }

      // Keys that don't have a character don't do anything.
      if (keyChar.length !== 1) return;

      // Add the character to the string and write it out.
      readLineValue += keyChar;
      write(keyChar);

    } else {
      // Store console key information so we can return it in subsequent read key calls.
      readKeyConsoleKeyInfo = new ConsoleKeyInfo.$ctor1(keyChar, consoleKey, shiftKey, altKey, ctrlKey);

      // If the console is already waiting for a press, return it.
      if (readKeyCallback) {
        let callback = readKeyCallback;
        readKeyCallback = null;

        callback(getReadKeyConsoleKeyInfo());
      }
    }
  }

  function getReadKeyConsoleKeyInfo()
  {
    let consoleKeyInfo = readKeyConsoleKeyInfo;
    readKeyConsoleKeyInfo = null;

    return consoleKeyInfo;
  }

  let operations = {keydown};

  onmessage = messageEvent => {
    operations[messageEvent.data.operation](messageEvent.data);
  }

  // Private methods

  function scroll() {
    postMessage({operation: 'scroll'});
  }

  function setColors(foreground, background) {
    foregroundColor = foreground;
    backgroundColor = background;

    postMessage({
      operation: 'setColors',
      foregroundColor,
      backgroundColor
    });
  }

  function newLine() {
    // Move to a new line.
    cursorLeft = 0;
    cursorTop++;

    // If we're out of bounds, scroll.
    if (cursorTop >= bufferHeight) {
      scroll();
      cursorTop = bufferHeight - 1;
    }

    postMessage({
      operation: 'setCursorPosition',
      cursorLeft,
      cursorTop
    });

    lastWritePositionWasBottomRight = false;
  }

  function write(value, mustEndWithNewLine = false) {
    if (!value) return;

    let wentToNewLineLast = false;

    for (let i = 0; i < value.length; i++) {
      let character = value[i];
      wentToNewLineLast = false;

      switch (character) {
        case '\n':
          newLine();
          continue;

        default:
          // If the last character written was in the bottom-right and we try to write in bottom-left, scroll first.
          if (lastWritePositionWasBottomRight && cursorLeft === 0 && cursorTop === bufferHeight - 1) {
            scroll();
          }

          // Update UI on main thread.
          postMessage({
            operation: 'writeCharacter',
            x: cursorLeft,
            y: cursorTop,
            character
          });
      }

      // See if we wrote to the bottom-right.
      if (cursorLeft === bufferWidth - 1 && cursorTop === bufferHeight - 1) {
        lastWritePositionWasBottomRight = true;
      }

      // Move cursor to the right.
      cursorLeft++;

      // Displayed cursor must stay in the same line and within the bounds.
      let cursorLeftDisplayed = Math.min(cursorLeft, bufferWidth - 1);

      postMessage({
        operation: 'setCursorPosition',
        cursorLeft: cursorLeftDisplayed,
        cursorTop
      });

      // If we're at the end, move one down.
      if (cursorLeft >= bufferWidth) {
        cursorLeft = 0;
        cursorTop++;
        wentToNewLineLast = true;
      }

      // Make sure we stay within bottom bounds.
      if (cursorTop >= bufferHeight) {
        cursorTop = bufferHeight - 1;

        // Don't scroll if this is the last character and we don't need an end line.
        if (i !== value.length - 1 || mustEndWithNewLine) scroll();
      }
    }

    // If we must end with new line, the cursor needs to appear at the end.
    if (mustEndWithNewLine) {
      // If we already went one line down, just reposition the cursor.
      if (wentToNewLineLast) {
        postMessage({
          operation: 'setCursorPosition',
          cursorLeft,
          cursorTop
        });
      } else {
        // We didn't go down yet, so we just do a new line.
        newLine();
      }
    }
  }

  return class Console {
    // Properties

    static get backgroundColor() { return backgroundColor; }
    static set backgroundColor(value) { setColors(foregroundColor, value); }

    static get bufferHeight() { return bufferHeight; }
    static set bufferHeight(value) { bufferHeight = value; }

    static get bufferWidth() { return bufferWidth; }
    static set bufferWidth(value) { bufferWidth = value; }

    static get cursorLeft() { return cursorLeft; }
    static set cursorLeft(value) { this.setCursorPosition(value, cursorTop) }

    static get cursorTop() { return cursorTop; }
    static set cursorTop(value) { this.setCursorPosition(cursorLeft, value); }

    static get cursorVisible() { return cursorVisible; }
    static set cursorVisible(value) { cursorVisible = value; }

    static get foregroundColor() { return foregroundColor; }
    static set foregroundColor(value) { setColors(value, backgroundColor); }

    static get windowHeight() { return windowHeight; }
    static set windowHeight(value) { windowHeight = value; }

    static get windowWidth() { return windowWidth; }
    static set windowWidth(value) { windowWidth = value; }

    // Methods

    static clear() {
      postMessage({operation:'clear'});
      this.setCursorPosition(0, 0);
    }

    static readKey(intercept = false) {
      let taskCompletionSource = new System.Threading.Tasks.TaskCompletionSource();

      let completeReadKey = (consoleKeyInfo) => {
        taskCompletionSource.setResult(consoleKeyInfo);

        if (!intercept) {
          write(consoleKeyInfo.keyChar);
        }
      }

      // See if we already have a key waiting for us.
      let consoleKeyInfo = getReadKeyConsoleKeyInfo();

      if (consoleKeyInfo) {
        // Immediately fulfill the task.
        completeReadKey(consoleKeyInfo);

      } else {
        // Register a callback to continue execution.
        readKeyCallback = completeReadKey;
      }

      return taskCompletionSource.task;
    }

    static readLine() {
      let taskCompletionSource = new System.Threading.Tasks.TaskCompletionSource();

      readLineCallback = value => {
        taskCompletionSource.setResult(value);
      }

      return taskCompletionSource.task;
    }

    static resetColor() {
      setColors(-1, -1);
    }

    static setCursorPosition(left, top) {
      if (left < 0 || left >= bufferWidth) {
        throw new Error("The value must be greater than or equal to zero and less than the console's buffer size in that dimension. (Parameter: 'left')")
      }

      if (top < 0 || top >= bufferHeight) {
        throw new Error("The value must be greater than or equal to zero and less than the console's buffer size in that dimension. (Parameter: 'top')")
      }

      cursorLeft = left;
      cursorTop = top;

      postMessage({
        operation: 'setCursorPosition',
        cursorLeft,
        cursorTop
      });
    }

    static writeLine(value) {
      if (value) {
        write(value, true);
      } else {
        newLine();
      }
    }

    static write(value) {
      write(value);
    }
  }
})();
