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
    let arr = []
    if(fnc.call(this, this)){
      arr = [this];
    }
    return this.get('parts').reduce((arr, part)=>{
      arr.addObjects(part.findPartsWithFnc(fnc));
      return arr;
    },arr);
  },

  toString: function() {
    return this.get('asString');
  },

  toStringZeroDepth: function(){
    return `${this.get('name')} ${this.get('cents')}`
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
