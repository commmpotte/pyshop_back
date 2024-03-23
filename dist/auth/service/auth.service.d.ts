import { UsersService } from '../../users/users.service';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    generateJwtToken(payload: any): Promise<{
        token: string;
        userId: string | null;
    }>;
}
