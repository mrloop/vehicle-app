import Ember from 'ember';

export default Ember.Component.extend({
  carBuilder: Ember.inject.service('car-builder'),
  store: Ember.inject.service('store'),

  didInsertElement: function(){
    window.this = this;
    VehicleApp.Part = this.get('store').modelFor('part');
    VehicleApp.Store = this.get('store');
    VehicleApp.demoCar = this.get('carBuilder.demoCar');
    this.log(VehicleApp.demoCar.toString());
  },

  log: function(string){
    console.log('VehicleApp.demoCar.toString();');
    console.log(`%c${string}`, 'color: #3498DB; font-family: monospace');
  }


});
