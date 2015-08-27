# HONEY

The human-friendly object notation.

Built by [@rymohr](http://twitter.com/rymohr) for [Kumu](https://kumu.io).

Here's an example of what it looks like:

```
///////
// WARNING: The syntax is still evolving and awaiting a solid round of
// constructive feedback and criticism. Do not use in production until
// a 1.0 release is reached. (Yes, this is a comment.)
//////
name
  HONEY

version
  0.1.0

description
  HONEY the human-friendly object notation.

  It's a simple line-based, whitespace-sensitive file format, designed to
  play well with humans.

bugs
  url
    https://github.com/honey/honey/issues

tags
  - stringify
  - parse
  - honey
  - json
  - javascript
```

HONEY blends JSON's simplicity and markdown's legibility in a language designed
to play well with version control systems and not scare off humans.

It's an implicitly-typed language that offloads the complexity of the language
from the user onto the parser as much as possible.

## Examples

### Objects

```js
HONEY.parse(`
name
  HONEY

description
  HONEY
  The human-friendly object notation.

version
  0.1.0

bugs
  url
    https://github.com/honey/honey/issues
`)

// result
{
  "name": "HONEY",
  "description": "HONEY\nThe human-friendly object notation.",
  "version": "0.1.0",
  "bugs": {
    "url": "https://github.com/honey/honey/issues"
  }
}
```

### Lists

Simple lists:

```js
HONEY.parse(`
- one
- two
- three
`)

// result
[
  "one",
  "two",
  "three"
]
```

Nested lists:

```js
HONEY.parse(`
-
  - two
  - three
-
  - three
  - four
`)

// result
[
  [
    "one",
    "two"
  ],
  [
    "three",
    "four"
  ]
]
```

Lists of objects:

```js
HONEY.parse(`
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
`)

// result
[
  {
    "id": 1,
    "name": "One"
  },
  {
    "id": 2,
    "name": "Two"
  }
]
```

### Empty values

HELP: I would still love to see more natural ways to represent these. However,
since HONEY was predominantly inspired by JSON we'll stick with the JSON syntax
until a better solution is proposed. https://github.com/honey/honey/issues/1

```js
HONEY.parse(`
  null value
    null

  empty string
    ""

  empty list
    []

  empty object
    {}
`)

// result
{
  "null value": null,
  "empty string": "",
  "empty list": [],
  "empty object": {}
}
```

## Goals

- don't scare humans
- minimize syntax handling in version control conflicts

## Features

- minimal syntax
- comments
- multi-line strings without funky escape sequences
- implicit type inference following JSON rules
- easily translates to / from JSON

## Usage

This repo includes a reference implementation written in es6.
You are free to copy, modify, and redistribute it at will. For convenience
the package is available as `hny` on NPM. It will be updated as the
spec evolves.

```
import HONEY from "hny";

HONEY.parse(string)
HONEY.stringify(value)
```

## Specifics

### Naming

HONEY files should use `.hny` or `.honey`. The shorter form is preferred.

### Indentation

HONEY strictly requires soft two-space indentation.

```
// right
name
  HONEY

// wrong
name
    HONEY

// wrong
name
\tHONEY
```

### Comments

HONEY supports single-line comments, javascript style.
Inline and multi-line comments are not supported.

```
// this is
// a comment
name
  HONEY // this is NOT a comment
```

### Type inference

HONEY supports the same types as JSON:

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
handling. However, if you have text that looks similar to HONEY's object
notation you'll need to use the heredoc form:

```
description
  This is a multi-line string.
  It doesn't require anything fancy.

// if in doubt, use a heredoc
description
  """
  - one
  - two
  - three
  """
```

Leading whitespace is automatically trimmed up to the natural indentation.

### Why not use JSON / CSON / YAML / TOML?

[JSON][json]'s simple structure is great but the syntax is a little too technical
for humans. Being scolded for forgetting a comma (or adding a trailing one) is
something only developers put up with. It's also really awful for multi-line
strings (such as markdown fields) and doesn't allow comments.

[YAML][yaml] is [potentially dangerous][1], mostly because it tries to do
[too much][2]. And the syntax is still a [little too technical][3].

[CSON][cson] is getting closer, but doesn't permit special characters in
object keys unless you quote them and still requires colons for each key.
The markdown approach to lists is much more intuitive than brackets, quotes,
and commas for each value. It's nice to be able to omit the commas, but for
long lists the arrays-without-commas syntax quickly stops looking like a list.

[TOML][toml] claims to be obvious and minimal, but that's only the case if
you're a developer. Overall it still feels like you're writing code, which is
fine since it was designed for config files, not general data. Still too
technical for humans.

## Contributing

```
git clone git@github.com:honey/honey.git
cd honey
npm install -g babel
npm install
npm test
```

Got a proposal for simplifying HONEY's syntax even further? Great! Open an
issue or submit a pull request.

I'd still love to see a more natural way to handle empty lists and objects.

## TODO

- [ ] decide if stringify should add trailing newline
- [ ] add tests for invalid syntax
- [ ] write syntax highlighter for atom
- [ ] write syntax highlighter for [linguist](https://github.com/github/linguist)

[json]: http://www.json.org/
[cson]: https://github.com/bevry/cson
[yaml]: http://www.yaml.org/
[toml]: https://github.com/toml-lang/toml
[1]: http://www.sitepoint.com/anatomy-of-an-exploit-an-in-depth-look-at-the-rails-yaml-vulnerability/
[2]: http://yaml.org/spec/1.2/spec.html
[3]: http://www.yaml.org/refcard.html
