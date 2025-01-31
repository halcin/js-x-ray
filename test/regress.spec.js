// Import Node.js Dependencies
import { readFileSync } from "node:fs";

// Import Third-party Dependencies
import test from "tape";

// Import Internal Dependencies
import { runASTAnalysis } from "../index.js";

// CONSTANTS
const FIXTURE_URL = new URL("fixtures/regress/", import.meta.url);

// Regression test for https://github.com/NodeSecure/js-x-ray/issues/59
test("it should not crash for prop-types", (tape) => {
  const propTypes = readFileSync(new URL("prop-types.min.js", FIXTURE_URL), "utf-8");
  runASTAnalysis(propTypes);

  tape.end();
});

test("it should not crash for JSX", (tape) => {
  const propTypes = readFileSync(new URL("jsx.js", FIXTURE_URL), "utf-8");
  runASTAnalysis(propTypes);

  tape.end();
});

// Regression test for https://github.com/NodeSecure/js-x-ray/issues/109
test("it should not crash for a JavaScript file containing HTML comments (and removeHTMLComments option enabled)", (tape) => {
  const htmlComment = readFileSync(new URL("html-comments.js", FIXTURE_URL), "utf-8");
  runASTAnalysis(htmlComment, {
    removeHTMLComments: true
  });

  tape.end();
});

test("it should crash for a JavaScript file containing HTML comments", (tape) => {
  const htmlComment = readFileSync(new URL("html-comments.js", FIXTURE_URL), "utf-8");
  try {
    runASTAnalysis(htmlComment);
    tape.fail();
  }
  catch {
    // do nothing
  }

  tape.end();
});
