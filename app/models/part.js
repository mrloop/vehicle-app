import DS from 'ember-data';

export default DS.Model.extend({
  part: DS.belongsTo('part', { inverse: 'parts'}),
  parts: DS.hasMany('part', { inverse: 'part'}),

  name: DS.attr('string'),
  cents: DS.attr('number', {defaultValue: 0}),

  toString: function() {
    return this.get('asString')
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
    for(var i=0; i<this.get('depth'); i++){ space = space + '  '}
    return space;
  }),

  asString: Ember.computed('depth', 'name', 'cents', 'parts.@each.asString', function(){
    let space = this.get('space')

    let str =  `${space}+ ${this.get('name')}
${space}  - ${this.get('cents')}
`

    if(this.get('parts.length')>0){
      str = `${str}${this.get('parts').mapBy('asString').join('')}`;
    }
    return str;
  })

});
