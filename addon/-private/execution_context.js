import { getContext } from './helpers';
import { getContext as getRfc268Context, visit } from './rfc268-helpers';
import AcceptanceExecutionContext from './execution_context/acceptance';
import IntegrationExecutionContext from './execution_context/integration';
import Rfc268Context from './execution_context/rfc268';

const executioncontexts = {
  acceptance: AcceptanceExecutionContext,
  integration: IntegrationExecutionContext,
  rfc268: Rfc268Context
};

/*
 * @private
 */
export function getExecutionContext(pageObjectNode) {
  // Our `getContext(pageObjectNode)` will return a context only if the test
  // called `page.setContext(this)`, which is only supposed to happen in
  // integration tests. `@ember/test-helpers`' `getTestContext()` will return a
  // context only if the test called one of the RFC268 `ember-qunit`
  // `setupTest()` methods (e.g. `setupRenderingTest()`,
  // `setupApplicationTest()`). If neither of these are the case, the only
  // supported scenario is an acceptance test.
  let testContext = getContext(pageObjectNode);
  let context;
  if (testContext) {
    context = 'integration';
  } else if (getRfc268Context()) {
    if (!visit) {
      throw new Error([
        'You are trying to use ember-cli-page-object with RFC232/RFC268 support',
        '(setupRenderingContext()/setupApplicationContext()) which requires at',
        'least ember-qunit@3.2.0 or ember-mocha@0.13.0-beta.3.'
      ]);
    }

    context = 'rfc268';
  } else {
    context = 'acceptance';
  }

  return new executioncontexts[context](pageObjectNode, testContext);
}

/*
 * @private
 */
export function register(type, definition) {
  executioncontexts[type] = definition;
}
