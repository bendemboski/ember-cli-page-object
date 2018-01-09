//
// This is a wrapper around `@ember/test-helpers` that we need for compatibility
// reasons. Apps and addons aren't supposed to depend directly on
// `@ember/test-helpers`, but just use the one that their version of
// `ember-qunit` or `ember-mocha` provides. Since we want to support both
// RFC268 tests (which will have `@ember/test-helpers` installed) and legacy
// tests (which will have `ember-test-helpers` installed), we can't just import
// `@ember/test-helpers` as an ES6 module because then even if we are running
// legacy tests that don't actually use it, it will throw a module load error.
// So, we use this module to check if it's present and if so, export all of the
// helpers that we need, and if not, export a `getContext()` that will return
// `null` so when picking an execution context we'll never pick RFC268, and
// will never try to access any of the other helpers.
//
// Once we drop support for pre-RFC268 tests, we can delete this file and import
// `@ember/test-helpers` directly.
//
import require from 'require';

let helpers;

if (require.has('@ember/test-helpers')) {
  helpers = require('@ember/test-helpers');
} else {
  helpers = {
    getContext() {
      return null;
    }
  }
}

export let getContext = helpers.getContext;
export let visit = helpers.visit;
export let click = helpers.click;
export let fillIn = helpers.fillIn;
export let triggerEvent = helpers.triggerEvent;
