import Ember from 'ember';

export default Ember.Component.extend({
  carBuilder: Ember.inject.service('car-builder'),
  store: Ember.inject.service('store'),

  didInsertElement: function(){
    let demoCar = this.get('carBuilder.demoCar');
    window.demoCar = demoCar;
    this.log(demoCar.toString());
  },

  log: function(string){
    console.log('demoCar.toString();');
    console.log(`%c${string}`, 'color: #3498DB; font-family: monospace');
  }


});
