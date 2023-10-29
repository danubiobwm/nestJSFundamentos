import { Body, Controller, Post,  UseGuards, Req } from "@nestjs/common";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthForgetDto } from "./dto/auth-foget.dto";
import { AuthResetDto } from "./dto/auth-reset.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user.decorator";

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
    ) { }

  @Post('login')
  async login( @Body() {email, password}: AuthLoginDto) {
    return this.authService.login(email, password)
  }

  @Post('register')
  async register( @Body() body: AuthRegisterDto) {
    return this.authService.register(body)
  }

  @Post('forget')
  async forget( @Body() {email}: AuthForgetDto) {
    return this.authService.forget(email)
  }

  @Post('reset')
  async reset( @Body() {password, token}: AuthResetDto) {
    return this.authService.reset(password, token)
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
      return {user};
  }
}