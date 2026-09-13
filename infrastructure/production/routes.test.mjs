import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
const context = vm.createContext({});
vm.runInContext(readFileSync(new URL('./routes.js', import.meta.url), 'utf8'), context);
for (const [input, expected] of [
  ['/', '/index.html'],
  ['/consultations', '/consultations.html'],
  ['/consultations/', '/consultations.html'],
  ['/apps', '/apps.html'],
  ['/missing-page', '/missing-page.html'],
  ['/brand/donamus-logo.svg', '/brand/donamus-logo.svg'],
  ['/_next/static/chunks/app.js', '/_next/static/chunks/app.js'],
  ['/consultations.txt', '/consultations.txt'],
  ['/consultations/__next._full.txt', '/consultations/__next._full.txt'],
]) {
  test(input, () => {
    const request = { uri: input, querystring: { source: { value: 'test' } } };
    const result = context.handler({ request });
    assert.equal(result.uri, expected);
    assert.equal(result.querystring.source.value, 'test');
  });
}
