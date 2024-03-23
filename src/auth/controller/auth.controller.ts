import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Req,
} from '@nestjs/common'
import { Response } from 'express'
import { LoginDto } from '../dto/login-user.dto'
import { UsersService } from '../../users/users.service'
import { AuthService } from '../service/auth.service'
import { CreateUserDto } from '../dto/create-user.dto'

@Controller('auth')
export class AuthController {
  authService: AuthService
  constructor(
    private readonly usersService: UsersService,
    private readonly _authService: AuthService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      console.log('Received login request:', loginDto)
      const { email, password } = loginDto
      const user = await this.usersService.authenticateUser(email, password)
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }
      const payload = {
        email: email,
        password: password,
      }
      const { token, userId } =
        await this._authService.generateJwtToken(payload)
      res.json({ token: token, userId: userId })
    } catch (error) {
      console.error('Authentication failed:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const existingUser = await this.usersService.findUserByEmail(
        createUserDto.email
      )
      if (existingUser) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: 'User with this email already exists' })
      }
     const user = await this.usersService.createUser(createUserDto)
     const payload = {
       email: user.email,
       password: user.password,
     }
     const { token, userId } = await this._authService.generateJwtToken(payload)
     return res.status(HttpStatus.CREATED).json({ token, userId, user })
    } catch (error) {
      console.error('Registration failed:', error)
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to register user' })
    }
  }
}
