using Bridge;
using System;

namespace DotNetConsoleJS
{
    //
    // Summary:
    //     Specifies combinations of modifier and console keys that can interrupt the current
    //     process.
    [Namespace(false)]
    public enum ConsoleSpecialKey
    {
        //
        // Summary:
        //     The System.ConsoleModifiers.Control modifier key plus the System.ConsoleKey.C
        //     console key.
        ControlC = 0,
        //
        // Summary:
        //     The System.ConsoleModifiers.Control modifier key plus the BREAK console key.
        ControlBreak = 1
    }
}
