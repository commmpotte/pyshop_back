import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { UsersService } from '../../users/users.service'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async generateJwtToken(
    payload: any
  ): Promise<{ token: string; userId: string | null }> {
    console.log('Generating JWT token with payload:', payload)
    try {
      const token = jwt.sign(payload, 'admin', { expiresIn: '1h' })
      const user = await this.usersService.findUserByEmail(payload.email)
      if (!user) {
        return { token, userId: null }
      }
      return { token, userId: user._id }
    } catch (error) {
      console.error('Error generating JWT token:', error)
      return { token: null, userId: null }
    }
  }
}
