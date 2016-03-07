import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';


moduleForModel('part', 'Unit | Model | part', {
  needs: ['service:car-builder']
});

test('smoke test', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

test('demoCar exists', function(assert) {
  Ember.run(()=>{
    let car = this.container.lookupFactory('service:car-builder').create().get('demoCar');
    assert.ok(!!car);
  });
});

test('demoCar has a single engine', function(assert) {
  Ember.run(()=>{
    let car = this.container.lookupFactory('service:car-builder').create().get('demoCar');
    assert.equal(car.findPartsWithName('engine').length, 1, 'Single Engine');
    assert.equal(car.findPartWithName('engine').get('id'), 'demo-engine');
  });
});

test('find first bolt', function(assert) {
  Ember.run(()=>{
    let car = this.container.lookupFactory('service:car-builder').create().get('demoCar');
    assert.equal(car.findPartWithName('bolt').get('issue'), 1);
    assert.equal(car.findPartsWithName('bolt').get('lastObject.issue'), 44);
  });
});

test('findPartsWithCost', function(assert) {
  Ember.run(()=>{
    let car = this.container.lookupFactory('service:car-builder').create().get('demoCar');
    let parts = car.findPartsWithCost(10000);
    assert.equal(parts.length, 5);
    assert.equal(parts.filterBy('name', 'piston').length, 4);
    assert.equal(parts.filterBy('name', 'engine').length, 1);
  });
});

test('findPartsWithNameAndLessCost', function(assert) {
  Ember.run(()=>{
    let car = this.container.lookupFactory('service:car-builder').create().get('demoCar');
    let allBolts = car.findPartsWithName('bolt');
    assert.equal(allBolts.length, 44);

    let bolts = car.findPartsWithNameAndLessCost('bolt', 109);
    assert.equal(bolts.length, 42);
  });
});
