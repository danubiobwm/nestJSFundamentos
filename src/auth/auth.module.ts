import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";


@Module({
  imports: [JwtModule.register({
    secret: `r3m&HeYy:PaVkv_B6Yn.M]fpMKO1p$wb`,
  })],
})
export class AuthModule{}