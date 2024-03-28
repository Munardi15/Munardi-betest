// tests/userController.test.js

const request = require('supertest');
const app = require('../routes/userrRoutes');
const mongoose = require('mongoose');
const User = require('../src/model/userModel');
const{MONGODB_URI} = require('../src/config/db')

describe('CRUD operations for userController', () => {
    let testUser;

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                userName: 'John Doe',
                accountNumber: 1234567890,
                emailAddress: 'john@example.com',
                identityNumber: '1234567890'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('userName', 'John Doe');
        testUser = res.body;
    });

    it('should get all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a user by id', async () => {
        const res = await request(app).get(`/users/${testUser._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(testUser);
    });

    it('should update a user', async () => {
        const res = await request(app)
            .put(`/users/${testUser._id}`)
            .send({ userName: 'Updated Name' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('userName', 'Updated Name');
    });

    it('should delete a user', async () => {
        const res = await request(app).delete(`/users/${testUser._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User deleted');
    });
});
