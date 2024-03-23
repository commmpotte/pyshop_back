"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
exports.UserModel = mongoose_1.default.model('User', user_schema_1.UserSchema);
//# sourceMappingURL=user.model.js.map