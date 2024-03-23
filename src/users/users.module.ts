import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersService } from '../users/users.service'
import { UserController } from './controller/user.controller'
import { UserSchema } from './schemas/user.schema'


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@clustertest1.cf6kkpx.mongodb.net/'
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
