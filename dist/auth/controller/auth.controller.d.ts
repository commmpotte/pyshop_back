import { Response } from 'express';
import { LoginDto } from '../dto/login-user.dto';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class AuthController {
    private readonly usersService;
    private readonly _authService;
    authService: AuthService;
    constructor(usersService: UsersService, _authService: AuthService);
    login(loginDto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    register(createUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
