# HONEY

HONEY is a human-friendly object notation that easily converts to JSON.

It's a simple line-based, whitespace-sensitive file format,
designed to play well with multi-line strings and version control systems and
not scare away humans.

Here's what it looks like:

```
// objects (yup, comments are supported)
name
  honey

version
  0.1.0

description
  HONEY is a human-friendly object notation that easily converts to JSON.

  It's a simple line-based, whitespace-sensitive file format, designed to
  play well with humans.


// lists
- this
- is
- a
- list


// lists of lists
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
    Numero Uno

-
  id
    2

  name
    Numero Dos
```

## Features

- minimal syntax
- supports comments
- supports multi-line strings
- implicit type inference following JSON rules
- human-friendly conflicts
- easily translates from / to JSON

## Goals

- don't scare humans away
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

You can wrap any single line value in double quotes to force it to a string.
If you have text that looks similar to Honey's list-syntax you'll need to use
the heredoc form.

```
// forced string value example
name
  "37"

// heredoc example
description
  """
  - one
  - two
  - three
  """
```

# Contributing

```
git clone git@github.com:honey/honey.git
cd honey
npm install -g babel
npm install
npm test
```

# TODO

- [ ] add tests for invalid syntax
- [ ] write syntax highlighter for atom
- [ ] write syntax highlighter for [linguist](https://github.com/github/linguist)
