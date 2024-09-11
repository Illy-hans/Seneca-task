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
const app_1 = __importDefault(require("../app"));
const sessionModel_1 = require("../model/sessionModel");
/*
Tests the create new session record function
*/
describe("Tests, POST new user creation", () => {
    let createdSession;
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        if (createdSession) {
            yield createdSession.deleteOne();
        }
    }));
    describe("POST, all variables are correct ", () => {
        (0, globals_1.it)("should create a new session", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/courses/ate73734-0056-4b77-be72-74039d12fb22')
                .set('x-user-id', 'afe73734-0056-4b77-be72-74039d12fb89')
                .send({
                totalModulesStudied: 4,
                averageScore: 80,
                timeStudied: 24000
            });
            (0, globals_1.expect)(response.statusCode).toEqual(201);
            (0, globals_1.expect)(response.body.message).toBe("OK");
            createdSession = yield sessionModel_1.SessionRecordDocument.findOne({ userId: 'afe73734-0056-4b77-be72-74039d12fb89' });
            // Ensure the session is not null before asserting
            if (!createdSession) {
                throw new Error("Session record not found");
            }
            (0, globals_1.expect)(createdSession.courseId).toEqual('ate73734-0056-4b77-be72-74039d12fb22');
            (0, globals_1.expect)(createdSession.totalModulesStudied).toBe(4);
            (0, globals_1.expect)(createdSession.averageScore).toBe(80);
            (0, globals_1.expect)(createdSession.timeStudied).toBe(24000);
        }));
    });
});
