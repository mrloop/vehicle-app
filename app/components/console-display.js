import Ember from 'ember';

export default Ember.Component.extend({
  carBuilder: Ember.inject.service('car-builder'),
  store: Ember.inject.service('store'),

  didInsertElement: function(){
    let demoCar = this.get('carBuilder.demoCar');
    window.demoCar = demoCar;
    this.showCarComponents();
    this.showFindFirstInstanceOfWheel();
    this.showFindFirstInstanceOfEngineBolt();
  },

  showCarComponents: function(){
    this.logCommand("demoCar.toString");
    this.log(this.get('carBuilder.demoCar').toString());
  },

  showFindFirstInstanceOfWheel: function(){
    this.logCommand("demoCar.findPath('wheel')");
    this.log(this.get('carBuilder.demoCar').findPart('wheel'));
  },


  showFindFirstInstanceOfEngineBolt: function(){
    this.logCommand("demoCar.findPart('engine').findParts('bolts')");
    let bolts = this.get('carBuilder.demoCar').findPart('engine').findParts('bolt');
    this.log(bolts.mapBy('asString').join(''));
  },

  commandColor: 'rgb(255, 0, 255)',

  logCommand: function(string){
    this.log(string, this.get('commandColor'));
  },

  log: function(string, color='#3498DB'){
    console.log(`%c${string}`, `color: ${color}; font-family: monospace`);
  }


});

