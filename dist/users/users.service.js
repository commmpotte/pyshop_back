"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll() {
        return await this.userModel.find().exec();
    }
    async createUser(createUserDto) {
        try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            const createdUser = new this.userModel({
                ...createUserDto,
                password: hashedPassword,
            });
            return await createdUser.save();
        }
        catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }
    async authenticateUser(email, password) {
        console.log('Authenticating user:', email);
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    }
    async findOne(id) {
        return await this.userModel.findById(id).exec();
    }
    async findUserByEmail(email) {
        try {
            return await this.userModel.findOne({ email }).exec();
        }
        catch (error) {
            console.error('Error finding user by email:', error);
            return null;
        }
    }
    async getUserByEmail(email) {
        return await this.userModel.findOne({ email }).exec();
    }
    async updateUser(id, updateUserDto) {
        return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        });
    }
    async deleteUser(id) {
        return await this.userModel.findByIdAndDelete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map