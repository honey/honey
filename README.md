# HONEY

HONEY is the human-friendly object notation that easily converts to JSON.

Here's an example of what it looks like:

```
name
  honey

version
  0.1.0

description
  HONEY is a human-friendly object notation that easily converts to JSON.

  It's a simple line-based, whitespace-sensitive file format, designed to
  play well with humans.

tags
  - stringify
  - parse
  - honey
  - json
  - javascript
```

It's a blend of JSON's simplicity and markdown's legibility, designed to play
well with version control systems and not scare off humans.

```
// lists of lists (yup, comments are supported)
-
  - one
  - two

-
  - three
  - four


// list of objects
-
  id
    1

  name
    One

-
  id
    2

  name
    Two

// empty values
empty list
  []

empty object
  {}

empty string
  ""

null value
  null
```

## Features

- minimal syntax
- comments
- multi-line strings without funky escape sequences
- implicit type inference following JSON rules
- easily translates from / to JSON

## Goals

- don't scare humans
- minimize syntax handling in version control conflicts

## Specifics

### Naming

Honey files should use `.hny` or `.honey`. The shorter form is preferred.

### Indentation

Honey strictly requires soft two-space indentation.

```
// right
name
  honey

// wrong
name
    honey

// wrong
name
\thoney
```

### Comments

Honey supports single-line comments, javascript style.
Inline and multi-line comments are not supported.

```
// this is
// a comment
name
  honey // this is NOT a comment
```

### Type inference

Honey supports the same types as JSON:

- string
- number
- object
- array
- true
- false
- null

You can wrap any value in double quotes to skip the implicit typecasting:

```
// this will be a number
version
  1.0

// this will be a string
version
  "1.0"
```

### Multi-line strings / heredocs

Multi-line strings should work just fine in most cases without any special
handling. However, if you have text that looks similar to Honey's object notation
you'll need to use the heredoc form:

```
description
  This is a multi-line string.
  It doesn't require anything fancy.

// if it looks like an object or a list, use a heredoc
description
  """
  - one
  - two
  - three
  """
```

Leading whitespace is automatically trimmed up to the natural indentation.

### Browser support

Built for ES5 and up. Use a polyfill if you need to support older browsers.

## Contributing

```
git clone git@github.com:honey/honey.git
cd honey
npm install -g babel
npm install
npm test
```

## TODO

- [ ] add comparisons to JSON, CSON, YAML, and TOML
- [ ] decide if stringify should enforce newline at end of file
- [ ] add tests for invalid syntax
- [ ] write syntax highlighter for atom
- [ ] write syntax highlighter for [linguist](https://github.com/github/linguist)
