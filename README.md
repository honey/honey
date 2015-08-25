# HONEY

HONEY is the human-friendly object notation that easily converts to JSON.

Built by [@rymohr](http://twitter.com/rymohr) for [Kumu](https://kumu.io).

Here's an example of what it looks like:

```
// WARNING: The syntax is still evolving and awaiting a solid round of
// constructive feedback and criticism. Do not use in production until
// a 1.0 release is reached.

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

Honey is a blend of JSON's simplicity and markdown's legibility, designed to
play well with version control systems and not scare off humans.

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

## Goals

- don't scare humans
- minimize syntax handling in version control conflicts

## Features

- minimal syntax
- comments
- multi-line strings without funky escape sequences
- implicit type inference following JSON rules
- easily translates to / from JSON

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
handling. However, if you have text that looks similar to Honey's object
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

### Browser support

Built for ES5 and up. Use a polyfill if you need to support older browsers.

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

## TODO

- [ ] add comparisons to JSON, CSON, YAML, and TOML
- [ ] decide if stringify should enforce newline at end of file
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
