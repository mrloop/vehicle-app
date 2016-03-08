import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  part: DS.belongsTo('part', { inverse: 'parts'}),
  parts: DS.hasMany('part', { inverse: 'part'}),

  name: DS.attr('string'),
  cents: DS.attr('number', {defaultValue: 0}),

  findPartWithName: function(name){
    return this.findPartsWithName(name).objectAt(0);
  },

  findPartsWithName: function(name){
    return this.findPartsWithFnc((part)=>{
      return part.get('name') === name;
    });
  },

  findPartsWithCost: function(cost){
    return this.findPartsWithFnc((part)=>{
      return parseInt(part.get('cents')) === cost;
    });
  },

  findPartsWithNameAndLessCost: function(name, cost){
    return this.findPartsWithFnc((part)=>{
      return part.get('name') === name && parseInt(part.get('cents')) < cost;
    });
  },

  findPartsWithFnc: function(fnc){
    let arr = [];
    if(fnc.call(this, this)){
      arr = [this];
    }
    return this.get('parts').reduce((array, part)=>{
      array.addObjects(part.findPartsWithFnc(fnc));
      return array;
    },arr);
  },

  totalCost: Ember.computed('cents', 'parts.@each.cents', function(){
    return this.reduceWithFnc((part)=>{
      return part.get('cents') || 0;
    });
  }),

  vatRate: 0.25,
  reducedVatRate: 0.1,

  totalCostWithVat: Ember.computed('totalCost', 'vatRate', function(){
    return this.get('totalCost') + (this.get('totalCost') * this.get('vatRate'));
  }),

  totalCostWithReducedRateAndRegularRate: Ember.computed('cents', 'parts.@each.cents', 'parts.@each.vatRate', 'parts.@each.reducedVatRate', function(){
    let reducedRateThreshold = 105;
    return this.reduceWithFnc((part)=>{
      if(part.get('cents') <= reducedRateThreshold){
        return part.get('cents') + (part.get('cents') * (part.get('reducedVatRate') || 0));
      } else {
        return part.get('cents') + (part.get('cents') * (part.get('vatRate') || 0));
      }
    });
  }),

  reduceWithFnc: function(fnc){
    let val = fnc.call(this, this);
    return this.get('parts').reduce((sum, part)=>{
      return sum + part.reduceWithFnc(fnc);
    }, val);
  },

  toString: function() {
    return this.get('asString');
  },

  toStringZeroDepth: function(){
    return `${this.get('name')} ${this.get('cents')}`;
  },

  depth: Ember.computed('part.depth', function(){
    if(Ember.isPresent(this.get('part.content'))){
      return this.get('part.depth') + 1;
    } else {
      return 0;
    }
  }),

  space: Ember.computed('depth', function(){
    let space = '';
    for(var i=0; i<this.get('depth'); i++){ space = space + '  ';}
    return space;
  }),

  asString: Ember.computed('depth', 'name', 'cents', 'parts.@each.asString', function(){
    let space = this.get('space');

    let str =  `${space}+ ${this.get('name')}
${space}  - ${this.get('cents')}
`;

    if(this.get('parts.length')>0){
      str = `${str}${this.get('parts').mapBy('asString').join('')}`;
    }
    return str;
  })

});
