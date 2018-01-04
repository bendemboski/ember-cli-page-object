import { test, module } from 'qunit';
import { setupTest } from 'ember-qunit';
import require from 'require';

if (!require.has('@ember/test-helpers')) {
  module('Unit | is rfc268 test', function() {
    function isRfc268Test() {
      return require('ember-cli-page-object/-private/is-rfc268-test').default();
    }

    module('with context', function(hooks) {
      setupTest(hooks);

      let compatModule;
      let originalVisit;

      hooks.beforeEach(function() {
        compatModule = require('ember-cli-page-object/-private/compatibility');
        originalVisit = compatModule.visit;
      });

      hooks.afterEach(function() {
        compatModule.visit = originalVisit;
      });

      test('works', function(assert) {
        assert.ok(isRfc268Test());
      });

      test('throws without visit() present', function(assert) {
        compatModule.visit = undefined;
        assert.throws(isRfc268Test);
      });
    });

    module('without context', function() {
      test('works', function(assert) {
        assert.notOk(isRfc268Test());
      });
    });
  });  
}
