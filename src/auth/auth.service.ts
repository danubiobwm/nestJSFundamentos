import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService) { }

  async createToken() {
    //return this.jwtService.sign();
  }

  async checkToken(token: string) {
    // return this.jwtService.verify();
  }


  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
        password: password
      }
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;

  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email
      }
    })
    if (!user) {
      throw new UnauthorizedException('Invalid credentials Email');
    }
    return true;
  }

  async reset(password: string, token: string) {
    const id = 0
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      }
    })
    return true;
}


}
