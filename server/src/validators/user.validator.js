"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zUserValidator = void 0;
var zod_1 = require("zod");
var zod_validator_1 = require("@hono/zod-validator");
var userSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    lists: zod_1.z.string().array(),
});
exports.zUserValidator = (0, zod_validator_1.zValidator)("json", userSchema);
