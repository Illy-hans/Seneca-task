import { expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../app';
import { SessionRecordDocument } from '../model/sessionModel';

/*
Tests the create new session record function 
*/

describe("Tests, POST new user creation", () => {
    let createdSession: InstanceType<typeof SessionRecordDocument> | null;

    afterEach(async () => {
        if (createdSession ) {
            await createdSession.deleteOne();
        }
    });
    
    describe("POST, all variables are correct ", () => {
        it("should create a new session", async () => {
        const response = await request(app)
            .post('/courses/ate73734-0056-4b77-be72-74039d12fb22')
            .set('x-user-id', 'afe73734-0056-4b77-be72-74039d12fb89')
            .send({  
                totalModulesStudied: 4,
                averageScore: 80,
                timeStudied: 24000 
            });

        expect(response.statusCode).toEqual(201);
        expect(response.body.message).toBe("OK");

        createdSession = await SessionRecordDocument.findOne({ userId: 'afe73734-0056-4b77-be72-74039d12fb89'});

        // Ensure the session is not null before asserting
        if (!createdSession) {
            throw new Error("Session record not found");
        }

        expect(createdSession.courseId).toEqual('ate73734-0056-4b77-be72-74039d12fb22');
        expect(createdSession.totalModulesStudied).toBe(4);
        expect(createdSession.averageScore).toBe(80);
        expect(createdSession.timeStudied).toBe(24000)
        });
    });
});
