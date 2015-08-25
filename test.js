import assert from "assert";
import glob from "glob";
import {readFileSync} from "fs";
import HONEY from "./index";

// TODO: allow pattern to be passed as arg
let options = {
  // pattern: /kitchen-sink/
};

let passed = 0;
let skipped = 0;

const tests = glob.sync("./test/*.hny");
tests.forEach(runTest);

console.log(`\n\nSUCCESS -- ${passed} PASSED, ${skipped} SKIPPED\n\n`);

function runTest(path) {
  if (options.pattern && !options.pattern.test(path)) {
    skipped++;
    return;
  }

  const honey = read(path);
  const json  = read(path.replace(".hny", ".json"));

  console.log(`RUN ${path}`);
  test(honey, json);
  console.log("\n")

  passed++;
}

function read(path) {
  return readFileSync(path, "utf8").trim();
}

function test(honey, json) {
  // make sure parse works as expected
  assert.equal(JSON.stringify(HONEY.parse(honey), null, "  "), json);

  // make sure stringify works as expected
  assert.equal(HONEY.stringify(JSON.parse(json), null, "  "), decomment(honey));
}

// Strips all comments from source
function decomment(source) {
  let lines = source.split("\n");
  return lines.filter((line) => !/^\s*[/]{2}/.test(line)).join("\n");
}
