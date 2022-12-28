const DEFAULT_DATA = `source:
- |
  esc    f1 f2     f3   f4    f5  f6  f7  f8    f9  f10    f11    f12    ---    prscr  scrlk pause
  grave  1  2      3    4     5   6   7   8     9   0      minus  equals bksp   insert home  pgup
  tab    q  w      e    r     t   y   u   i     o   p      lbrack rbrack bslash delete end   pgdn
  capslk a  s      d    f     g   h   j   k     l   scolon quote  ---    enter  ---    ---   ---
  lshift z  x      c    v     b   n   m   comma dot fslash ---    ---    rshift ---    up    ---
  lctrl  fn lsuper lalt space --- --- --- ---   --- ralt   menu   rsuper rctrl  left   down  right
target:
- |
  tab    q     w    e      r     t     y     u     i     o    p      bksp
  esc    a     s    d      f     g     h     j     k     l    scolon quote
  lshift z     x    c      v     b     n     m     comma dot  fslash enter
  fn     lctrl lalt lsuper lower space space raise left  down up     right
- |
  grave  1   2   3   4   5   6   7     8      9      0      ---
  delete f1  f2  f3  f4  f5  f6  minus equals lbrack rbrack bslash
  capslk f7  f8  f9  f10 f11 f12 ---   ---    ---    ---    ---
  ---    --- --- --- --- --- --- ---   home   pgdn   pgup   end
labels:
  '1': "! 1"
  '2': "@ 2"
  '3': "# 3"
  '4': "$ 4"
  '5': "% 5"
  '6': "^ 6"
  '7': "& 7"
  '8': "* 8"
  '9': "( 9"
  '0': ") 0"
  grave: "~ \`"
  minus: "_ -"
  equals: "+ ="
  lbrack: "{ ["
  rbrack: "} ]"
  bslash: '| \\'
  scolon: ": ;"
  quote: "\\" '"
  comma: "< ,"
  dot: "> ."
  fslash: "? /"
  up: "↑"
  left: "←"
  down: "↓"
  right: "→"`;

export default function KeyboardSample() {
  return (
    <details>
      <summary>Sample data</summary>
      <textarea value={DEFAULT_DATA} readOnly></textarea>
    </details>
  );
}
