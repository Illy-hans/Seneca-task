"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const sessionModel_1 = require("../model/sessionModel");
const app_1 = __importDefault(require("../app"));
/*
Tests the lifetime stats for course function.
    Sets up and tears down dummy data
*/
describe("Tests lifetime stats for course", () => {
    let newSessionRecord1;
    let newSessionRecord2;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        newSessionRecord1 = yield sessionModel_1.SessionRecordDocument.create({
            userId: 'afe73990-0056-4b77-be72-74039d124r43fb89',
            courseId: 'ape73734-0056-4b77-be72-74039d12fb22g',
            totalModulesStudied: 4,
            averageScore: 60,
            timeStudied: 28000,
        });
        newSessionRecord2 = yield sessionModel_1.SessionRecordDocument.create({
            userId: 'afe73990-0056-4b77-be72-74039d124r43fb89',
            courseId: 'ape73734-0056-4b77-be72-74039d12fb22g',
            totalModulesStudied: 3,
            averageScore: 70,
            timeStudied: 50000,
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all([
            yield newSessionRecord1.deleteOne(),
            yield newSessionRecord2.deleteOne(),
        ]);
    }));
    describe("GET, Lifetime stats for a user on a course", () => {
        (0, globals_1.it)("return aggregated stats", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/courses/ape73734-0056-4b77-be72-74039d12fb22g')
                .set('x-user-id', 'afe73990-0056-4b77-be72-74039d124r43fb89');
            (0, globals_1.expect)(response.statusCode).toBe(200);
            const { Lifetime_stats_for_course } = response.body;
            const expectedTotalModulesStudied = 7;
            const expectedTotalScores = 130;
            const expectedAverageScore = expectedTotalScores / 2;
            const expectedTimeStudied = 78000;
            (0, globals_1.expect)(Lifetime_stats_for_course.totalModulesStudied).toBe(expectedTotalModulesStudied);
            (0, globals_1.expect)(Lifetime_stats_for_course.averageScore).toBe(expectedAverageScore);
            (0, globals_1.expect)(Lifetime_stats_for_course.timeStudied).toBe(expectedTimeStudied);
        }));
    });
});
