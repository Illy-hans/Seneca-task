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
Tests the return of a single session Id based on sessionId and userId
*/
describe("Tests single session return", () => {
    let newSessionRecord1;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        newSessionRecord1 = new sessionModel_1.SessionRecordDocument({
            userId: 'ebe73990-0056-4b77-be72-74039d124r43fb89',
            courseId: 'ebe73734-0056-4b77-be72-74039d12fb22g',
            totalModulesStudied: 2,
            averageScore: 95,
            timeStudied: 30000,
        });
        yield newSessionRecord1.save();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        newSessionRecord1.deleteOne();
    }));
    describe("GET, returns stats for a single study session", () => {
        (0, globals_1.it)("should return session", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get(`/courses/ape73734-0056-4b77-be72-74039d12fb22g/sessions/${newSessionRecord1.sessionId}`)
                .set('x-user-id', 'ebe73990-0056-4b77-be72-74039d124r43fb89');
            (0, globals_1.expect)(response.status).toBe(200);
            const { Study_session_stats } = response.body;
            (0, globals_1.expect)(Study_session_stats.sessionId).toBe(newSessionRecord1.sessionId);
            (0, globals_1.expect)(Study_session_stats.totalModulesStudied).toBe(2);
            (0, globals_1.expect)(Study_session_stats.averageScore).toBe(95);
            (0, globals_1.expect)(Study_session_stats.timeStudied).toBe(30000);
        }));
    });
});
