const request = require('supertest');
const server = require('../api/server');

describe('auth-router', () => {

    // describe('post adds a user with the correct username', () => {
    //     it('should insert the provided user into the db', () => {
    //         const newUser = { username: 'testing', password: 'password' };
    //         db.add(newUser)
    //         .then(response => {
    //             expect(response.username).toBe('testing');
    //         });
    //       });

    //     it('post status with wrong object shape is 400', () => {
    //         const newUser = { username: 'testing' };
    //         db.add(newUser)
    //         .then(response => {
    //             expect(response.message).toEqual('Please provide a password.');
    //         });
    //     })
    // });

    const newUser = {
        "username": "testing2",
        "password": "password",
    }

    describe('POST /api/auth/register', () => {

        it('should return 201 Created', () => {
            return request(server)
            .post("/api/auth/register")
            .send(newUser)
            .then(res => {
              expect(res.status).toEqual(201); // resource inserted
            });
        })
        it('should not allow second registration with same username', () => {
            return request(server)
            .post("/api/auth/register")
            .send(newUser)
            .then(res => {
              expect(res.status).toBe(500); // server error
            });
        })

        it('should not allow registration with no password', () => {
            return request(server)
            .post("/api/auth/register")
            .send({ "username": "nopass" })
            .then(res => {
              expect(res.status).toBe(400); // bad request
            });
        })
    })

    describe('POST /api/auth/login', () => {
        it('should return 200', () => {
            return request(server)
            .post("/api/auth/login")
            .send(newUser)
            .then(res => {
              expect(res.status).toBe(200); // OK
            });
        });

        it('should return token', () => {
            return request(server)
            .post("/api/auth/login")
            .send(newUser)
            .then(res => {
              expect(res.token).toBeDefined; // to exist!
            });
        });
    })
})