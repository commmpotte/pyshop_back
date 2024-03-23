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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const login_user_dto_1 = require("../dto/login-user.dto");
const users_service_1 = require("../../users/users.service");
const auth_service_1 = require("../service/auth.service");
const create_user_dto_1 = require("../dto/create-user.dto");
let AuthController = class AuthController {
    constructor(usersService, _authService) {
        this.usersService = usersService;
        this._authService = _authService;
    }
    async login(loginDto, res) {
        try {
            console.log('Received login request:', loginDto);
            const { email, password } = loginDto;
            const user = await this.usersService.authenticateUser(email, password);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const payload = {
                email: email,
                password: password,
            };
            const { token, userId } = await this._authService.generateJwtToken(payload);
            res.json({ token: token, userId: userId });
        }
        catch (error) {
            console.error('Authentication failed:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    async register(createUserDto, res) {
        try {
            const existingUser = await this.usersService.findUserByEmail(createUserDto.email);
            if (existingUser) {
                return res
                    .status(common_1.HttpStatus.CONFLICT)
                    .json({ message: 'User with this email already exists' });
            }
            const user = await this.usersService.createUser(createUserDto);
            const payload = {
                email: user.email,
                password: user.password,
            };
            const { token, userId } = await this._authService.generateJwtToken(payload);
            res.status(common_1.HttpStatus.CREATED).json({ user, token, userId });
            res
                .status(common_1.HttpStatus.CREATED)
                .json({ message: 'User registered successfully' });
        }
        catch (error) {
            console.error('Registration failed:', error);
            res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'Failed to register user' });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map