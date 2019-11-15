const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');
const auth = require('./auth-router');
const model = require('./auth-model');

describe('auth-router', () => {

    describe('post adds a user with the correct username', () => {
        it('should insert the provided user into the db', () => {
            const newUser = { username: 'testing', password: 'password' };
            model.add(newUser)
            .then(response => {
                expect(response.username).toBe('testing');
            });
          });

        it('post status with wrong object shape is 400', () => {
            const newUser = { username: 'testing' };
            model.add(newUser)
            .then(response => {
                expect(response.message).toEqual('Please provide a password.');
            });
        })
    });
})