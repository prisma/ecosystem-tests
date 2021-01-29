"use strict";
exports.__esModule = true;
exports.createContext = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function createContext() {
    return { prisma: prisma };
}
exports.createContext = createContext;
