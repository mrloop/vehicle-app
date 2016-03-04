import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service('store'),

  demoCar: Ember.computed('engine','wheels','body',function(){
    let car = this.get('store').createRecord('part',{
      id: 'demo-car',
      name: 'car',
      cents: 100000
    });

    car.get('parts').addObjects([
        this.get('engine'),
        this.get('wheels'),
        this.get('body')]);
    return car;
  }),

  wheels: Ember.computed(function(){
    let wheels = this.get('store').createRecord('part', {
      name: 'wheels'
    })
    wheels.get('parts').addObjects([1,2,3,4].map((i)=>{
      let wheel = this.get('store').createRecord('part', {
        name: 'wheel',
        cents: 1000
      })
      this.addBoltsTo(wheel, 6);
      return wheel;
    }));
    return wheels;
  }),

  addBoltsTo: function(obj, numBolts){
    for(var i=0 ;i<numBolts; i++){
      obj.get('parts').addObject(
        this.get('store').createRecord('part', {
          name: 'bolt',
          cents: 100
        })
      )
    }
    return obj;
  },

  body: Ember.computed(function(){
    let body = this.get('store').createRecord('part', {
      name: 'body',
      cents: 30000
    });
    this.addBoltsTo(body, 6);
    return body;
  }),

  engine: Ember.computed(function(){
    let engine = this.get('store').createRecord('part', {
      id: 'demo-engine',
      name: 'engine',
      cents: 10000
    });
    this.addBoltsTo(engine, 12);
    engine.get('parts').addObjects([1,2,3,4].map(()=>{
      return this.get('store').createRecord('part', {
        name: 'piston',
        cents: 10000
      });
    }));
    return engine;
  })

});
