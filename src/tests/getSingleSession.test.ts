import { expect, it } from '@jest/globals';
import request from 'supertest';
import { SessionRecordDocument } from '../model/sessionModel';
import app from '../app';

/*
Tests the return of a single session Id based on sessionId and userId
*/
describe("Tests single session return", () => {
    let newSessionRecord1: InstanceType<typeof SessionRecordDocument>;

    beforeAll(async () => {
        newSessionRecord1 = new SessionRecordDocument({ 
            userId: 'ebe73990-0056-4b77-be72-74039d124r43fb89',
            courseId: 'ebe73734-0056-4b77-be72-74039d12fb22g',
            totalModulesStudied: 2,
            averageScore: 95, 
            timeStudied: 30000, 
        });

        await newSessionRecord1.save();

    });

    afterAll(async () => {
        await newSessionRecord1.deleteOne()
    });
    

    describe("GET, returns stats for a single study session", () => {
        it("should return session", async () => {
        const response = await request(app)
            .get(`/courses/ape73734-0056-4b77-be72-74039d12fb22g/sessions/${newSessionRecord1.sessionId}`)
            .set('x-user-id', 'ebe73990-0056-4b77-be72-74039d124r43fb89')
        
        expect(response.status).toBe(200);
        const { Study_session_stats } = response.body;

        expect(Study_session_stats.sessionId).toBe(newSessionRecord1.sessionId);
        expect(Study_session_stats.totalModulesStudied).toBe(2);
        expect(Study_session_stats.averageScore).toBe(95);
        expect(Study_session_stats.timeStudied).toBe(30000);
        });
    });
});
