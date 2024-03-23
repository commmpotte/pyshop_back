import { Module } from '@nestjs/common'
import { AuthController } from './controller/auth.controller'
import { AuthService } from './service/auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from 'src/users/schemas/user.schema'
import { UsersService } from 'src/users/users.service'
import { UsersModule } from 'src/users/users.module'


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@clustertest1.cf6kkpx.mongodb.net/'
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
