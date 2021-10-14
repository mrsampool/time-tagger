const request = require('supertest');
const {app} = require('./app');

describe('API', ()=>{

  describe('CLOCK-IN w/ tags', ()=>{

    it('should return something', ()=>{
      return request(app)
      .post('/api/users/1/log')
      .send({
        tags: ['tagOne', 'tagTwo', 'tagSeven']
      }).then( response => {
        console.log(response);
      });
    });

  });

  describe('CLOCK-IN w/o tags', ()=>{

    it('should return something', ()=>{
      return request(app)
      .post('/api/users/1/log')
      .send({
        tags: []
      })
        .then( response =>{
          console.log( response );
        });
    });

  });

});

