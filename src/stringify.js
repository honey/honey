const NEWLINE           = /\n/;
const TRAILING_NEWLINE  = /\n$/;

export default function(value) {
  let string = stringify(value, "");
  return string.replace(/\n*$/, ""); // strip trailing newlines?
};

function stringify(value, indent) {
  if (Array.isArray(value)) {
    return array(value, indent);
  } else if (value && typeof value === "object") { // typeof null => "object"
    return object(value, indent);
  } else {
    return terminal(value, indent);
  }
}

function array(values, indent) {
  if (values.length === 0) return `${indent}[]`;

  return values.map(function(value) {
    let string = stringify(value, indent + "  ");

    if (NEWLINE.test(string)) {
      return `${indent}-\n${withTrailingNewline(string)}`;
    } else {
      return `${indent}- ${string.trim()}`;
    }
  }).join("\n");
}

function object(obj, indent) {
  const keys = Object.keys(obj);

  if (keys.length === 0) return `${indent}{}`;

  return keys.map(function(key) {
    let value = stringify(obj[key], indent + "  ");
    return `${indent}${key}\n${withTrailingNewline(value)}`;
  }).join("\n");
}

// TODO: should we escape special chars? or just use heredoc style?
function terminal(value, indent) {
  let string;

  if (typeof value === "string") {
    if (Number(value)) {
      string = `"${value}"`;
    } else if (/^-/.test(value)) {
      string = `"""\n${value}\n"""`;
    } else {
      string = value;
    }
  } else {
    string = JSON.stringify(value);
  }

  return indented(string, indent);
}

function withTrailingNewline(string) {
  return TRAILING_NEWLINE.test(string) ? string : string + "\n";
}

function indented(value, indent) {
  let lines = typeof value === "string" ? value.split("\n") : value;
  return lines.map((line) => `${indent}${line}`).join("\n");
}
