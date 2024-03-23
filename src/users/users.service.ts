import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './interfaces/user.interface'
import { CreateUserDto } from '../auth/dto/create-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      })
      return await createdUser.save()
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`)
    }
  }

  async authenticateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    console.log('Authenticating user:', email) // Логирование аутентификации
    const user = await this.userModel.findOne({ email }).exec()
    if (!user) {
      return null
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return null
    }

    return user
  }

  // async findOne(_id: string): Promise<User | null> {
  //   if (!_id) {
  //     return null
  //   }
  //   try {

  //     const user = await this.userModel.findById(_id).exec()
  //     return user
  //   } catch (error) {
  //     console.error('Error finding user by id:', error)
  //     return null
  //   }
  // }
  async findOne(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec()
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ email }).exec()
    } catch (error) {
      console.error('Error finding user by email:', error)
      return null
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec()
  }

  async updateUser(id: string, updateUserDto: any): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    })
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id)
  }
}
