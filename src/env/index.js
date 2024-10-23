"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
var zod_1 = require("zod");
var envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['dev', 'test', 'production']),
    NODE_PORT: zod_1.z.coerce.number().default(3333),
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('Invalid environment variables', (_a = _env.error) === null || _a === void 0 ? void 0 : _a.format());
    throw new Error('Invalid environment variables');
}
exports.env = _env.data;
