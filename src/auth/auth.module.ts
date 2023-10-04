import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { PrismaModule } from "../prisma/prisma.module";


@Module({
  controllers: [AuthController],
  imports: [JwtModule.register({
    secret: `r3m&HeYy:PaVkv_B6Yn.M]fpMKO1p$wb`,
  }),
  UserModule,
  PrismaModule,
],
})
export class AuthModule{}