import assert from "assert";
import glob from "glob";
import {readFileSync} from "fs";
import HONEY from "./index";

// TODO: allow pattern to be passed as arg
let options = {
  // pattern: /basic-/,
  parse: true,
  stringify: false
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
  if (options.parse) {
    // make sure parse works as expected
    assert.equal(JSON.stringify(HONEY.parse(honey), null, "  "), json);
  }

  if (options.stringify) {
    // make sure stringify works as expected
    assert.equal(HONEY.stringify(JSON.parse(json), null, "  "), honey);
  }
}
