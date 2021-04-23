/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2021
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("DotNetConsoleJS", function ($asm, globals) {
    "use strict";

    Bridge.define("ConsoleCancelEventArgs", {
        fields: {
            cancel: false,
            specialKey: 0
        }
    });

    Bridge.define("ConsoleColor", {
        $kind: "enum",
        statics: {
            fields: {
                black: 0,
                darkBlue: 1,
                darkGreen: 2,
                darkCyan: 3,
                darkRed: 4,
                darkMagenta: 5,
                darkYellow: 6,
                gray: 7,
                darkGray: 8,
                blue: 9,
                green: 10,
                cyan: 11,
                red: 12,
                magenta: 13,
                yellow: 14,
                white: 15
            }
        }
    });

    Bridge.define("ConsoleKey", {
        $kind: "enum",
        statics: {
            fields: {
                backspace: 8,
                tab: 9,
                clear: 12,
                enter: 13,
                pause: 19,
                escape: 27,
                spacebar: 32,
                pageUp: 33,
                pageDown: 34,
                end: 35,
                home: 36,
                leftArrow: 37,
                upArrow: 38,
                rightArrow: 39,
                downArrow: 40,
                select: 41,
                print: 42,
                execute: 43,
                printScreen: 44,
                insert: 45,
                delete: 46,
                help: 47,
                d0: 48,
                d1: 49,
                d2: 50,
                d3: 51,
                d4: 52,
                d5: 53,
                d6: 54,
                d7: 55,
                d8: 56,
                d9: 57,
                a: 65,
                b: 66,
                c: 67,
                d: 68,
                e: 69,
                f: 70,
                g: 71,
                h: 72,
                i: 73,
                j: 74,
                k: 75,
                l: 76,
                m: 77,
                n: 78,
                o: 79,
                p: 80,
                q: 81,
                r: 82,
                s: 83,
                t: 84,
                u: 85,
                v: 86,
                w: 87,
                x: 88,
                y: 89,
                z: 90,
                leftWindows: 91,
                rightWindows: 92,
                applications: 93,
                sleep: 95,
                numPad0: 96,
                numPad1: 97,
                numPad2: 98,
                numPad3: 99,
                numPad4: 100,
                numPad5: 101,
                numPad6: 102,
                numPad7: 103,
                numPad8: 104,
                numPad9: 105,
                multiply: 106,
                add: 107,
                separator: 108,
                subtract: 109,
                decimal: 110,
                divide: 111,
                f1: 112,
                f2: 113,
                f3: 114,
                f4: 115,
                f5: 116,
                f6: 117,
                f7: 118,
                f8: 119,
                f9: 120,
                f10: 121,
                f11: 122,
                f12: 123,
                f13: 124,
                f14: 125,
                f15: 126,
                f16: 127,
                f17: 128,
                f18: 129,
                f19: 130,
                f20: 131,
                f21: 132,
                f22: 133,
                f23: 134,
                f24: 135,
                browserBack: 166,
                browserForward: 167,
                browserRefresh: 168,
                browserStop: 169,
                browserSearch: 170,
                browserFavorites: 171,
                browserHome: 172,
                volumeMute: 173,
                volumeDown: 174,
                volumeUp: 175,
                mediaNext: 176,
                mediaPrevious: 177,
                mediaStop: 178,
                mediaPlay: 179,
                launchMail: 180,
                launchMediaSelect: 181,
                launchApp1: 182,
                launchApp2: 183,
                oem1: 186,
                oemPlus: 187,
                oemComma: 188,
                oemMinus: 189,
                oemPeriod: 190,
                oem2: 191,
                oem3: 192,
                oem4: 219,
                oem5: 220,
                oem6: 221,
                oem7: 222,
                oem8: 223,
                oem102: 226,
                process: 229,
                packet: 231,
                attention: 246,
                crSel: 247,
                exSel: 248,
                eraseEndOfFile: 249,
                play: 250,
                zoom: 251,
                noName: 252,
                pa1: 253,
                oemClear: 254
            }
        }
    });

    Bridge.define("ConsoleKeyInfo", {
        $kind: "struct",
        statics: {
            methods: {
                op_Equality: function (a, b) {
                    return a.equals(b);
                },
                op_Inequality: function (a, b) {
                    return !(a.equals(b));
                },
                getDefaultValue: function () { return new ConsoleKeyInfo(); }
            }
        },
        fields: {
            keyChar$1: 0,
            key$1: 0,
            modifiers$1: 0
        },
        props: {
            key: {
                get: function () {
                    return this.key$1;
                }
            },
            keyChar: {
                get: function () {
                    return this.keyChar$1;
                }
            },
            modifiers: {
                get: function () {
                    return this.modifiers$1;
                }
            }
        },
        ctors: {
            $ctor1: function (keyChar, key, shift, alt, control) {
                this.$initialize();
                this.keyChar$1 = keyChar;
                this.key$1 = key;
                this.modifiers$1 = 0;

                if (shift) {
                    this.modifiers$1 |= ConsoleModifiers.shift;
                }
                if (alt) {
                    this.modifiers$1 |= ConsoleModifiers.shift;
                }
                if (control) {
                    this.modifiers$1 |= ConsoleModifiers.shift;
                }
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            equals: function (obj) {
                return obj.keyChar$1 === this.keyChar$1 && obj.key$1 === this.key$1 && obj.modifiers$1 === this.modifiers$1;
            },
            equals$1: function (value) {
                if (Bridge.is(value, ConsoleKeyInfo)) {
                    return this.equals(System.Nullable.getValue(Bridge.cast(Bridge.unbox(value, ConsoleKeyInfo), ConsoleKeyInfo)));
                } else {
                    return false;
                }
            },
            getHashCode: function () {
                return this.keyChar$1 | this.modifiers$1;
            },
            $clone: function (to) {
                var s = to || new ConsoleKeyInfo();
                s.keyChar$1 = this.keyChar$1;
                s.key$1 = this.key$1;
                s.modifiers$1 = this.modifiers$1;
                return s;
            }
        }
    });

    Bridge.define("ConsoleModifiers", {
        $kind: "enum",
        statics: {
            fields: {
                alt: 1,
                shift: 2,
                control: 4
            }
        },
        $flags: true
    });

    Bridge.define("ConsoleSpecialKey", {
        $kind: "enum",
        statics: {
            fields: {
                controlC: 0,
                controlBreak: 1
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJEb3ROZXRDb25zb2xlSlMuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkNvbnNvbGVLZXlJbmZvLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNBMkl1Q0EsR0FBa0JBO29CQUU3Q0EsT0FBT0EsU0FBU0E7O3lDQWVXQSxHQUFrQkE7b0JBRTdDQSxPQUFPQSxDQUFDQSxDQUFDQSxTQUFTQTs7Ozs7Ozs7Ozs7OztvQkFwR1FBLE9BQU9BOzs7OztvQkFRVEEsT0FBT0E7Ozs7O29CQVFPQSxPQUFPQTs7Ozs7OEJBakMzQkEsU0FBY0EsS0FBZ0JBLE9BQVlBLEtBQVVBOztnQkFFdEVBLGlCQUFlQTtnQkFDZkEsYUFBV0E7Z0JBQ1hBOztnQkFFQUEsSUFBSUE7b0JBQU9BLG9CQUFrQkE7O2dCQUM3QkEsSUFBSUE7b0JBQUtBLG9CQUFrQkE7O2dCQUMzQkEsSUFBSUE7b0JBQVNBLG9CQUFrQkE7Ozs7Ozs7OzhCQXVDaEJBO2dCQUVmQSxPQUFPQSxrQkFBZUEsa0JBQVdBLGNBQVdBLGNBQU9BLG9CQUFpQkE7O2dDQWM1Q0E7Z0JBRXhCQSxJQUFJQTtvQkFFQUEsT0FBT0EsWUFBT0EscUNBQWdCQTs7b0JBSTlCQTs7OztnQkFXSkEsT0FBT0EsQUFBS0EsaUJBQVVBLEFBQUtBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIERvdE5ldENvbnNvbGVKU1xyXG57XHJcbiAgICAvL1xyXG4gICAgLy8gU3VtbWFyeTpcclxuICAgIC8vICAgICBEZXNjcmliZXMgdGhlIGNvbnNvbGUga2V5IHRoYXQgd2FzIHByZXNzZWQsIGluY2x1ZGluZyB0aGUgY2hhcmFjdGVyIHJlcHJlc2VudGVkXHJcbiAgICAvLyAgICAgYnkgdGhlIGNvbnNvbGUga2V5IGFuZCB0aGUgc3RhdGUgb2YgdGhlIFNISUZULCBBTFQsIGFuZCBDVFJMIG1vZGlmaWVyIGtleXMuXHJcbiAgICBbTmFtZXNwYWNlKGZhbHNlKV1cclxuW0JyaWRnZS5JbW11dGFibGVdXG4gICAgcHVibGljIHN0cnVjdCBDb25zb2xlS2V5SW5mb1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY2hhciBrZXlDaGFyO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgQ29uc29sZUtleSBrZXk7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBDb25zb2xlTW9kaWZpZXJzIG1vZGlmaWVycztcclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBTdW1tYXJ5OlxyXG4gICAgICAgIC8vICAgICBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgU3lzdGVtLkNvbnNvbGVLZXlJbmZvIHN0cnVjdHVyZSB1c2luZyB0aGUgc3BlY2lmaWVkXHJcbiAgICAgICAgLy8gICAgIGNoYXJhY3RlciwgY29uc29sZSBrZXksIGFuZCBtb2RpZmllciBrZXlzLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gUGFyYW1ldGVyczpcclxuICAgICAgICAvLyAgIGtleUNoYXI6XHJcbiAgICAgICAgLy8gICAgIFRoZSBVbmljb2RlIGNoYXJhY3RlciB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBrZXkgcGFyYW1ldGVyLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICBrZXk6XHJcbiAgICAgICAgLy8gICAgIFRoZSBjb25zb2xlIGtleSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBrZXlDaGFyIHBhcmFtZXRlci5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgc2hpZnQ6XHJcbiAgICAgICAgLy8gICAgIHRydWUgdG8gaW5kaWNhdGUgdGhhdCBhIFNISUZUIGtleSB3YXMgcHJlc3NlZDsgb3RoZXJ3aXNlLCBmYWxzZS5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgYWx0OlxyXG4gICAgICAgIC8vICAgICB0cnVlIHRvIGluZGljYXRlIHRoYXQgYW4gQUxUIGtleSB3YXMgcHJlc3NlZDsgb3RoZXJ3aXNlLCBmYWxzZS5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgY29udHJvbDpcclxuICAgICAgICAvLyAgICAgdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IGEgQ1RSTCBrZXkgd2FzIHByZXNzZWQ7IG90aGVyd2lzZSwgZmFsc2UuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBFeGNlcHRpb25zOlxyXG4gICAgICAgIC8vICAgVDpTeXN0ZW0uQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uOlxyXG4gICAgICAgIC8vICAgICBUaGUgbnVtZXJpYyB2YWx1ZSBvZiB0aGUga2V5IHBhcmFtZXRlciBpcyBsZXNzIHRoYW4gMCBvciBncmVhdGVyIHRoYW4gMjU1LlxyXG4gICAgICAgIHB1YmxpYyBDb25zb2xlS2V5SW5mbyhjaGFyIGtleUNoYXIsIENvbnNvbGVLZXkga2V5LCBib29sIHNoaWZ0LCBib29sIGFsdCwgYm9vbCBjb250cm9sKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5rZXlDaGFyID0ga2V5Q2hhcjtcclxuICAgICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzaGlmdCkgdGhpcy5tb2RpZmllcnMgfD0gQ29uc29sZU1vZGlmaWVycy5TaGlmdDtcclxuICAgICAgICAgICAgaWYgKGFsdCkgdGhpcy5tb2RpZmllcnMgfD0gQ29uc29sZU1vZGlmaWVycy5TaGlmdDtcclxuICAgICAgICAgICAgaWYgKGNvbnRyb2wpIHRoaXMubW9kaWZpZXJzIHw9IENvbnNvbGVNb2RpZmllcnMuU2hpZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gU3VtbWFyeTpcclxuICAgICAgICAvLyAgICAgR2V0cyB0aGUgY29uc29sZSBrZXkgcmVwcmVzZW50ZWQgYnkgdGhlIGN1cnJlbnQgU3lzdGVtLkNvbnNvbGVLZXlJbmZvIG9iamVjdC5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFJldHVybnM6XHJcbiAgICAgICAgLy8gICAgIEEgdmFsdWUgdGhhdCBpZGVudGlmaWVzIHRoZSBjb25zb2xlIGtleSB0aGF0IHdhcyBwcmVzc2VkLlxyXG4gICAgICAgIHB1YmxpYyBDb25zb2xlS2V5IEtleSB7IGdldCB7IHJldHVybiBrZXk7IH0gfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gU3VtbWFyeTpcclxuICAgICAgICAvLyAgICAgR2V0cyB0aGUgVW5pY29kZSBjaGFyYWN0ZXIgcmVwcmVzZW50ZWQgYnkgdGhlIGN1cnJlbnQgU3lzdGVtLkNvbnNvbGVLZXlJbmZvIG9iamVjdC5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFJldHVybnM6XHJcbiAgICAgICAgLy8gICAgIEFuIG9iamVjdCB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBjb25zb2xlIGtleSByZXByZXNlbnRlZCBieSB0aGUgY3VycmVudCBTeXN0ZW0uQ29uc29sZUtleUluZm9cclxuICAgICAgICAvLyAgICAgb2JqZWN0LlxyXG4gICAgICAgIHB1YmxpYyBjaGFyIEtleUNoYXIgeyBnZXQgeyByZXR1cm4ga2V5Q2hhcjsgfSB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBTdW1tYXJ5OlxyXG4gICAgICAgIC8vICAgICBHZXRzIGEgYml0d2lzZSBjb21iaW5hdGlvbiBvZiBTeXN0ZW0uQ29uc29sZU1vZGlmaWVycyB2YWx1ZXMgdGhhdCBzcGVjaWZpZXMgb25lXHJcbiAgICAgICAgLy8gICAgIG9yIG1vcmUgbW9kaWZpZXIga2V5cyBwcmVzc2VkIHNpbXVsdGFuZW91c2x5IHdpdGggdGhlIGNvbnNvbGUga2V5LlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gUmV0dXJuczpcclxuICAgICAgICAvLyAgICAgQSBiaXR3aXNlIGNvbWJpbmF0aW9uIG9mIHRoZSBlbnVtZXJhdGlvbiB2YWx1ZXMuIFRoZXJlIGlzIG5vIGRlZmF1bHQgdmFsdWUuXHJcbiAgICAgICAgcHVibGljIENvbnNvbGVNb2RpZmllcnMgTW9kaWZpZXJzIHsgZ2V0IHsgcmV0dXJuIG1vZGlmaWVyczsgfSB9XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gU3VtbWFyeTpcclxuICAgICAgICAvLyAgICAgR2V0cyBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgc3BlY2lmaWVkIFN5c3RlbS5Db25zb2xlS2V5SW5mbyBvYmplY3QgaXNcclxuICAgICAgICAvLyAgICAgZXF1YWwgdG8gdGhlIGN1cnJlbnQgU3lzdGVtLkNvbnNvbGVLZXlJbmZvIG9iamVjdC5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFBhcmFtZXRlcnM6XHJcbiAgICAgICAgLy8gICBvYmo6XHJcbiAgICAgICAgLy8gICAgIEFuIG9iamVjdCB0byBjb21wYXJlIHRvIHRoZSBjdXJyZW50IFN5c3RlbS5Db25zb2xlS2V5SW5mbyBvYmplY3QuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBSZXR1cm5zOlxyXG4gICAgICAgIC8vICAgICB0cnVlIGlmIG9iaiBpcyBlcXVhbCB0byB0aGUgY3VycmVudCBTeXN0ZW0uQ29uc29sZUtleUluZm8gb2JqZWN0OyBvdGhlcndpc2UsXHJcbiAgICAgICAgLy8gICAgIGZhbHNlLlxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhDb25zb2xlS2V5SW5mbyBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqLmtleUNoYXIgPT0ga2V5Q2hhciAmJiBvYmoua2V5ID09IGtleSAmJiBvYmoubW9kaWZpZXJzID09IG1vZGlmaWVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBTdW1tYXJ5OlxyXG4gICAgICAgIC8vICAgICBHZXRzIGEgdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgb2JqZWN0IGlzIGVxdWFsIHRvIHRoZSBjdXJyZW50XHJcbiAgICAgICAgLy8gICAgIFN5c3RlbS5Db25zb2xlS2V5SW5mbyBvYmplY3QuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBQYXJhbWV0ZXJzOlxyXG4gICAgICAgIC8vICAgdmFsdWU6XHJcbiAgICAgICAgLy8gICAgIEFuIG9iamVjdCB0byBjb21wYXJlIHRvIHRoZSBjdXJyZW50IFN5c3RlbS5Db25zb2xlS2V5SW5mbyBvYmplY3QuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBSZXR1cm5zOlxyXG4gICAgICAgIC8vICAgICB0cnVlIGlmIHZhbHVlIGlzIGEgU3lzdGVtLkNvbnNvbGVLZXlJbmZvIG9iamVjdCBhbmQgaXMgZXF1YWwgdG8gdGhlIGN1cnJlbnQgU3lzdGVtLkNvbnNvbGVLZXlJbmZvXHJcbiAgICAgICAgLy8gICAgIG9iamVjdDsgb3RoZXJ3aXNlLCBmYWxzZS5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlIGlzIENvbnNvbGVLZXlJbmZvKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRXF1YWxzKChDb25zb2xlS2V5SW5mbyl2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBTdW1tYXJ5OlxyXG4gICAgICAgIC8vICAgICBSZXR1cm5zIHRoZSBoYXNoIGNvZGUgZm9yIHRoZSBjdXJyZW50IFN5c3RlbS5Db25zb2xlS2V5SW5mbyBvYmplY3QuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBSZXR1cm5zOlxyXG4gICAgICAgIC8vICAgICBBIDMyLWJpdCBzaWduZWQgaW50ZWdlciBoYXNoIGNvZGUuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludClrZXlDaGFyIHwgKGludCltb2RpZmllcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFN1bW1hcnk6XHJcbiAgICAgICAgLy8gICAgIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgU3lzdGVtLkNvbnNvbGVLZXlJbmZvIG9iamVjdHMgYXJlIGVxdWFsLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gUGFyYW1ldGVyczpcclxuICAgICAgICAvLyAgIGE6XHJcbiAgICAgICAgLy8gICAgIFRoZSBmaXJzdCBvYmplY3QgdG8gY29tcGFyZS5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgYjpcclxuICAgICAgICAvLyAgICAgVGhlIHNlY29uZCBvYmplY3QgdG8gY29tcGFyZS5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFJldHVybnM6XHJcbiAgICAgICAgLy8gICAgIHRydWUgaWYgYSBpcyBlcXVhbCB0byBiOyBvdGhlcndpc2UsIGZhbHNlLlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShDb25zb2xlS2V5SW5mbyBhLCBDb25zb2xlS2V5SW5mbyBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuRXF1YWxzKGIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFN1bW1hcnk6XHJcbiAgICAgICAgLy8gICAgIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgU3lzdGVtLkNvbnNvbGVLZXlJbmZvIG9iamVjdHMgYXJlIG5vdCBlcXVhbC5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFBhcmFtZXRlcnM6XHJcbiAgICAgICAgLy8gICBhOlxyXG4gICAgICAgIC8vICAgICBUaGUgZmlyc3Qgb2JqZWN0IHRvIGNvbXBhcmUuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgIGI6XHJcbiAgICAgICAgLy8gICAgIFRoZSBzZWNvbmQgb2JqZWN0IHRvIGNvbXBhcmUuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBSZXR1cm5zOlxyXG4gICAgICAgIC8vICAgICB0cnVlIGlmIGEgaXMgbm90IGVxdWFsIHRvIGI7IG90aGVyd2lzZSwgZmFsc2UuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KENvbnNvbGVLZXlJbmZvIGEsIENvbnNvbGVLZXlJbmZvIGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIShhLkVxdWFscyhiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K
