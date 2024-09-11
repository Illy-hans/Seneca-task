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
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("./db_connection");
const globals_1 = require("@jest/globals");
// This file runs to open and close the database connection 
(0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_connection_1.connectToDatabase)();
}));
(0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_connection_1.closeDatabaseConnection)();
}));
