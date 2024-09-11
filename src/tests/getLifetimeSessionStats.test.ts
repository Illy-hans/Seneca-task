import { expect, it } from '@jest/globals';
import request from 'supertest';
import { SessionRecordDocument } from '../model/sessionModel';
import app from '../app';

/*
Tests the lifetime stats for course function. 
    Sets up and tears down dummy data
*/

describe("Tests lifetime stats for course", () => {
    let newSessionRecord1: InstanceType<typeof SessionRecordDocument>;
    let newSessionRecord2: InstanceType<typeof SessionRecordDocument>;

    beforeAll(async () => {
        newSessionRecord1 = await SessionRecordDocument.create({ 
            userId: 'afe73990-0056-4b77-be72-74039d124r43fb89',
            courseId: 'ape73734-0056-4b77-be72-74039d12fb22g',
            totalModulesStudied: 4,
            averageScore: 60, 
            timeStudied: 28000, 
        });

        newSessionRecord2 = await SessionRecordDocument.create({ 
            userId: 'afe73990-0056-4b77-be72-74039d124r43fb89',
            courseId: 'ape73734-0056-4b77-be72-74039d12fb22g',
            totalModulesStudied: 3,
            averageScore: 70, 
            timeStudied: 50000, 
        });
    });

    afterAll(async () => {
        await Promise.all([
            await newSessionRecord1.deleteOne(),
            await newSessionRecord2.deleteOne(),
        ]);
    });

    describe("GET, Lifetime stats for a user on a course", () => {
        it("return aggregated stats", async () => {
        const response = await request(app)
            .get('/courses/ape73734-0056-4b77-be72-74039d12fb22g')
            .set('x-user-id', 'afe73990-0056-4b77-be72-74039d124r43fb89')
        
        expect(response.statusCode).toBe(200);

        const { Lifetime_stats_for_course } = response.body;

        const expectedTotalModulesStudied = 7;
        const expectedTotalScores = 130;
        const expectedAverageScore = expectedTotalScores / 2;
        const expectedTimeStudied = 78000;

        expect(Lifetime_stats_for_course.totalModulesStudied).toBe(expectedTotalModulesStudied);
        expect(Lifetime_stats_for_course.averageScore).toBe(expectedAverageScore);
        expect(Lifetime_stats_for_course.timeStudied).toBe(expectedTimeStudied);
        });
    });
});
