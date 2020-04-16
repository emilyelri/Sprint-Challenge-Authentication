const request = require('supertest');
const server = require('./server');

describe('GET /', () => {
    it('should return status code 200', () => {
        const expectedStatusCode = 200;
        request(server).get('/')
        .then(response => {
            expect(response.status).toEqual(expectedStatusCode);
        });
    });

    it('should return a JSON object from ', async () => {
        const response = await request(server).get('/');
        expect(response.type).toEqual('application/json');
      });

});