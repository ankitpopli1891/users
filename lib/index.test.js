const expect = require('chai').expect;
const request = require('supertest');
const knex = require('./db');

const app = require('.');

describe('user tests', () => {
    before(done => {
        // run migrations
        // run seeds
        knex.migrate
            .latest()
            .then(() => {
                return knex.seed.run();
            })
            .then(() => done());
    });

    it('list all users', done => {
        request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect(200)
            .then(resp => {
                expect(resp.body.total).to.be.equal(3);
                done();
            });
    });
});
