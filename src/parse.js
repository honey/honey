const INDENT_SIZE      = 2;
const INDENT           = /^\s{2}/;
const COMMENT          = /^[/]{2}/;
const LIST_ITEM        = /^-$/;
const LIST_ITEM_INLINE = /^-(.*)$/;
const STRING           = /^"((?:[^"\\]|\\.)*)"$/;
const HEREDOC          = /^"{3}$/;
const KEY              = /^.*$/;
const NONEMPTY         = /\S/;

const DEBUG = false;

let input;
let at;
let ch;
let text;
let match;
let lines;
let index;          // current line index
let line;           // current line
let lineDepth;      // depth of current line
let nextIndex;      // next non-empty line index
let nextLine;       // next non-empty line
let nextLineDepth;  // depth of next non-empty line
let root;
let context;
let contextMode;
let contextKey;
let contextValue;

let expecting;

export default function parse(src) {
  nextIndex = 0;
  input = clean(src);
  lines = input.split("\n");
  return value();
}

function error(message) {
  throw {name: "SyntaxError", message, index, line};
}

// TODO: match on nextLine here so we can avoid the do-while loops?
function value() {
  if (next()) {
    if (match = COMMENT.exec(line)) {
      return value();
    }

    if (match = LIST_ITEM.exec(line)) {
      return array();
    }

    if (match = LIST_ITEM_INLINE.exec(line)) {
      return array();
    }

    if (match = STRING.exec(line)) {
      return String(match[1]);
    }

    if (match = HEREDOC.exec(line)) {
      return heredoc();
    }

    if (nextLineDepth === lineDepth + 1) {
      return object();
    }

    return primitive();
  } else {
    return null;
  }
}

function array() {
  const values = [];
  const depth = lineDepth;

  do {
    let val;

    if (match = LIST_ITEM.exec(line)) {
      val = value();
    } else if (match = LIST_ITEM_INLINE.exec(line)) {
      val = coerce(match[1]);
    } else {
      error("List item expected");
    }

    values.push(val);

    if (nextLineDepth < depth) break;
  } while (next());

  return values;
}

function object() {
  const obj = {};
  const depth = lineDepth;

  do {
    let property = line;
    obj[property] = value();
    if (nextLineDepth < depth) break;
  } while (next());

  return obj;
}

function primitive() {
  let val;
  const depth = lineDepth;

  do {
    if (val) {
      val += "\n" + line;
    } else {
      val = line;
    }

    if (nextLineDepth < depth) break;
  } while (next());

  return coerce(val);
}

function heredoc() {
  let str;
  const depth = lineDepth;

  while (next()) {
    if (lineDepth < depth) error("Unexpected dedent");
    if (lineDepth === depth && HEREDOC.exec(line)) break;

    if (str) {
      str += "\n" + line;
    } else {
      str = line;
    }
  }

  return str;
}

function next() {
  index = nextIndex++;

  if (index < lines.length) {
    line = lines[index];

    if (NONEMPTY.exec(line)) {
      lineDepth = getDepth(line);
      line = line.trim();

      do {
        nextLine = lines[nextIndex];
        if (NONEMPTY.exec(nextLine)) break;
      } while (++nextIndex < lines.length);

      if (nextIndex === lines.length) nextLine = undefined;
      nextLineDepth = getDepth(nextLine);

      console.log(`L${index}@${lineDepth}: ${line}`);
      return true;
    } else {
      console.log(`L${index}@${lineDepth}: EMPTY`);
      return next();
    }
  } else {
    return false;
  }
}

function getDepth(str) {
  if (!str || str.length === 0) return 0;

  let i = 0;
  while (str[i] === " ") i++;

  return i / INDENT_SIZE;
}

// TODO: standardize line endings?
function clean(str) {
  return str;
}

// Parses value into its natural primitive type
//
// TODO: handle this internally instead of calling out to JSON?
// Should be faster since we don't need to be concerned with error handling
// (either it matches cleanly or is left as a string)
function coerce(value) {
  if (typeof value === "string") {
    value = value.trim();

    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  } else {
    return value;
  }
}
