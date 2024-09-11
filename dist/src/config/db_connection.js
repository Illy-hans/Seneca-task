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
exports.closeDatabaseConnection = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
/*
Connects to the cloud hosted MongoDB database.
throws error if no MongoDB URL is provided or if connection fails.
 */
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoDbUrl = process.env.MONGODB_URL;
    if (!mongoDbUrl) {
        console.error("No MongoDB url provided.");
        throw new Error("No connection string provided");
    }
    try {
        yield mongoose_1.default.connect(mongoDbUrl);
        // console.log("Successfully connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
});
exports.connectToDatabase = connectToDatabase;
/*
Closes the connection to the MongoDB database.
throws error if disconnection fails.
 */
const closeDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.disconnect();
        // console.log("Successfully disconnected from MongoDB");
    }
    catch (error) {
        console.error("Error disconnection from MongoDB:", error);
        throw error;
    }
});
exports.closeDatabaseConnection = closeDatabaseConnection;
