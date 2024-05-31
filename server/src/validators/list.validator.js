"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zListValidator = void 0;
var zod_1 = require("zod");
var zod_validator_1 = require("@hono/zod-validator");
var listSchema = zod_1.z.object({
    name: zod_1.z.string(),
    listId: zod_1.z.string(),
    tasks: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        checked: zod_1.z.boolean(),
    })),
});
exports.zListValidator = (0, zod_validator_1.zValidator)("json", listSchema);
