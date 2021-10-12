const request = require('supertest');
const {app} = require('./app');

describe('API', ()=>{

  describe('CLOCK-IN', ()=>{
    let response;
    beforeAll( async()=>{
      response = await request(app)
      .post('/api/users/1/log')
      .send({
        tags: ['tagOne', 'tagTwo', 'tagThree']
      })
      .end( (err,res) =>{

      });
    });
    it('should return something', ()=>{ console.log(response) });
  });

});

