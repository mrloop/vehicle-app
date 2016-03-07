import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('console-display', 'Integration | Component | console display', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{console-display}}`);

  assert.ok(this.$().text().trim().indexOf('Please look at console output') >= 0);
});
