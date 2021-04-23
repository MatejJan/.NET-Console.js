﻿using Bridge;
using System;

namespace DotNetConsoleJS
{
    //
    // Summary:
    //     Represents the method that will handle the System.Console.CancelKeyPress event
    //     of a System.Console.
    //
    // Parameters:
    //   sender:
    //     The source of the event.
    //
    //   e:
    //     A System.ConsoleCancelEventArgs object that contains the event data.
    public delegate void ConsoleCancelEventHandler(object sender, ConsoleCancelEventArgs e);
}
