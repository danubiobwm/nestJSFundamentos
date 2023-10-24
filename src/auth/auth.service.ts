import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService
  ) { }

  private issuer = 'login';
  private audience = 'users';


   createToken(user: User) {
    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        name: user.name,
        email: user.email,
      }, {
        expiresIn: '7 days',
        issuer: `${this.issuer}`,
        audience: `${this.audience}`,
      })
    }
  }

  checkToken(token: string) {
    try {
        const data = this.jwtService.verify(token, {
            issuer: this.issuer,
            audience: this.audience,
        });

        return data;
    } catch (e) {
        throw new BadRequestException(e);
    }
}

   isValidToke(token: string) {
    try {
      this.checkToken(token)
      return true;
    } catch (e) {
      return false;
    }
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

    return this.createToken(user);

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
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      }
    })
    return this.createToken(user);
  }


  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data)

    return this.createToken(user);
  }


}
