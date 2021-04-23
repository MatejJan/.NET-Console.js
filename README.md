# .NET Console.js

.NET Console.js is a class library that adds Console class support to [Bridge.NET](https://bridge.net).

## Supported properties and methods

The current version implements a minimal selection of properties:

* `BackgroundColor`
* `BufferHeight` (read-only)
* `BufferWidth` (read-only)
* `CursorLeft`
* `CursorTop`
* `CursorVisible` (read-only)
* `ForegroundColor`
* `WindowWidth` (read-only)
* `WindowHeight` (read-only)

… and methods:

* `Clear`
* `ReadKey`
* `ReadLine`
* `ResetColor`
* `SetCursorPosition`
* `Write`
* `WriteLine`

The size of the console is the default of 80 by 24 characters (but it can be easily modified by changing the appropriate variables in the `dotnetconsole.main.js` and `dotnetconsole.worker.js` files once you download them).

## Instructions

### 1. Compiling your application to JavaScript

First you need to compile your console application with Bridge.NET. Follow [their instructions](https://bridge.net/introduction/getting_started/) to create a new Bridge.NET Class Library and add all your console application code to the project.

Download `DotNetConsoleJS.dll` from this repository and add it as a reference to your project. In files where you are using Console classes, add the following using statements:

```
using DotNetConsoleJS;
using Console = DotNetConsoleJS.Console;
```

The `Console.ReadLine()` and `Console.ReadKey()` calls require asynchronous execution, so you will need to modify your code and add the `await` keyword before them.

```
string input = await Console.ReadLine();
ConsoleKeyInfo keyInfo = await Console.ReadKey();
```

In turn you will need to make the methods where you're using `await` into `async` methods returning `Task` or `Task<T>` instead of `void` or `T`. For more information on asynchronous execution, consult the [Asynchronous Programming](https://bridge.net/introduction/asynchronous_programming/) page of Bridge.NET.

Other changes to your code might be necessary since the Bridge.NET implementation of .NET doesn't support all methods. Similarly, .NET Console.js does not implement all Console features (see supported properties and methods section above).

When your code is without errors, building the project will generate a javascript file with the name of your project, as well as the `bridge.js` library.

### 2. Running in the browser

Create an HTML file in a folder of your choice and copy both the `.js` file of your console app and `bridge.js` to the folder. You will also need the three `dotnetconsole` files from this repository downloaded there.

You need to include the root and main libraries in your HTML like so:

```
<html>
<head>
  <script src="bridge.js"></script>
  <script src="dotnetconsole.js"></script>
  <script src="dotnetconsole.main.js"></script>
  <script>
    Console.run('MyConsoleApp.js');
  </script>
</head>
<body>
</body>
</html>
```

Your `.js` file will run in a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), so you also need to import the root and worker libraries to the javascript file of your app.

Add this line to the top of the file:

```
importScripts('bridge.js', 'dotnetconsole.js', 'dotnetconsole.worker.js');
```

With this in place, you should be able to run your application. 

You might also want to customize the appearance of the console. Here is a sample stylesheet you can modify:

```
html {
  height: 100%;
  background: black;
  color: white;
  font-family: monospace;
  font-size: 3vh;
}

body {
  height: 100%;
  margin: 0;
}

table {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-collapse: collapse;
}

td {
  position: relative;
  overflow: hidden;
  padding: 0;
}

html:not(.inactive) .cursor {
  background-color: #606060 !important;
}

html.inactive .cursor::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 1px solid #606060;
}

.foreground-0 { color: #000000; }
.foreground-1 { color: #0000b2; }
.foreground-2 { color: #00a600; }
.foreground-3 { color: #00a6b2; }
.foreground-4 { color: #990000; }
.foreground-5 { color: #b200b2; }
.foreground-6 { color: #999900; }
.foreground-7 { color: #bfbfbf; }
.foreground-8 { color: #666666; }
.foreground-9 { color: #0000ff; }
.foreground-10 { color: #00d900; }
.foreground-11 { color: #00e5e5; }
.foreground-12 { color: #e50000; }
.foreground-13 { color: #e500e5; }
.foreground-14 { color: #e5e500; }
.foreground-15 { color: #e5e5e5; }

.background-0 { background-color: #000000; }
.background-1 { background-color: #0000b2; }
.background-2 { background-color: #00a600; }
.background-3 { background-color: #00a6b2; }
.background-4 { background-color: #990000; }
.background-5 { background-color: #b200b2; }
.background-6 { background-color: #999900; }
.background-7 { background-color: #bfbfbf; }
.background-8 { background-color: #666666; }
.background-9 { background-color: #0000ff; }
.background-10 { background-color: #00d900; }
.background-11 { background-color: #00e5e5; }
.background-12 { background-color: #e50000; }
.background-13 { background-color: #e500e5; }
.background-14 { background-color: #e5e500; }
.background-15 { background-color: #e5e5e5; }
```

This should be it! Enjoy running your .NET console apps online.

## Example projects

To see .NET Console.js in practice, check out the following projects:

* **Forest**: A text adventure by Rymdlingen. ([Website](https://rymdlingen.itch.io/forest), [Source](https://github.com/Rymdlingen/Forest/tree/web))
