import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../users.service';
import { User } from '../interfaces/user.interface';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
}
