import Ember from 'ember';

export default Ember.Component.extend({
  carBuilder: Ember.inject.service('car-builder'),
  store: Ember.inject.service('store'),

  didInsertElement: function(){
    let demoCar = this.get('carBuilder.demoCar');
    window.demoCar = demoCar;
    this.showCarComponents();
    this.showFindFirstInstanceOfWheel();
    this.showFindEngineBolts();
    this.showFindEngineComponentWithCost();
    this.showFindEngineComponentWithNameAndCost();
  },

  showCarComponents: function(){
    this.logCommand("demoCar.toString");
    this.log(this.get('carBuilder.demoCar').toString());
  },

  showFindFirstInstanceOfWheel: function(){
    this.logCommand("demoCar.findPath('wheel')");
    this.log(this.get('carBuilder.demoCar').findPartWithName('wheel'));
  },


  showFindEngineBolts: function(){
    this.logCommand("demoCar.findPartWithName('engine').findPartsWithName('bolt')");
    let bolts = this.demoEngine().findPartsWithName('bolt');
    this.log(this.arrayToStringZeroDepth(bolts));
  },

  showFindEngineComponentWithCost: function(){
    let cost  = 10000;
    let parts =  this.demoEngine().findPartsWithCost(cost).reject((part)=>{
      //search include part we're searching so remove here if not wanted
      return part.get('id') === this.demoEngine().get('id');}
    );
    this.logCommand("democar.findPartWithName('engine').findPartsWithCost(10000);");
    this.log(this.arrayToStringZeroDepth(parts));
  },

  showFindEngineComponentWithNameAndCost: function(){
    let parts = this.demoEngine().findPartsWithNameAndLessCost('bolt', 105);

    this.logCommand("demoCar.findPartsWithNameAndLessCost('bolt', 1000);");
    this.log(this.arrayToStringZeroDepth(parts));
  },

  demoEngine: function(){
    return this.get('carBuilder.demoCar').findPartWithName('engine');
  },

  commandColor: 'rgb(255, 0, 255)',

  arrayToStringZeroDepth: function(array){
    return array.map((obj)=>{return `${obj.toStringZeroDepth()}\n`;}).join('');
  },

  arrayAsString: function(array){
    return array.mapBy('asString').join('');
  },

  logCommand: function(string){
    this.log(string, this.get('commandColor'));
  },

  log: function(string, color='#3498DB'){
    console.log(`%c${string}`, `color: ${color}; font-family: monospace`);
  }
});

