import request from '../api.int.helper';
import {Error, Course} from "../../../types/types";

jest.setTimeout(30000);


describe('GET /nonexistent', () => {
    it('returns a 404 for unknown route',  () => request
    .get('/rest/v0/nonexistent')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404)
    .then((response) => {
        const result : Error = response.body;
        expect(result).toHaveProperty('timestamp');
        expect(result['status']).toEqual(404);
        expect(result['error']).toEqual("Not Found");
        expect(result['message']).toEqual("The requested resource was not found.");
    }));
});

describe('GET /courses/all', () => {
    it('returns a json of all the courses on the catalogue',  () => request
    .get('/rest/v0/courses/all')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
        const result: Course[] = response.body;
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toContainEqual(
            expect.objectContaining({"number": "46", "department": "I&C SCI"})
        );
    }));
});


describe('GET /courses/I&CSCI33', () => {
    it('returns a json of the specific course on the catalogue',  () => request
    .get('/rest/v0/courses/I&CSCI33')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
        const result: Course = response.body;
        expect(result['id']).toEqual('I&CSCI33');
        expect(result['title']).toEqual('Intermediate Programming');
        expect(Array.isArray(result['prerequisite_for'])).toBeTruthy();
    }));
});

describe('GET /courses/I&CSCI0000000', () => {
    it('returns an error message for a course that does not exist',  () => request
    .get('/rest/v0/courses/I&CSCI0000000')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404)
    .then((response) => {
        const result : Error = response.body;
        expect(result).toHaveProperty('timestamp');
        expect(result['status']).toEqual(404);
        expect(result['error']).toEqual("Not Found");
        expect(result['message']).toEqual("Course not found");
    }));
});