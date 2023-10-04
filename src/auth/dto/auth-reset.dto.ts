import { IsEmail, IsJWT,  MinLength } from "class-validator";

export class AuthResetDto {
  @IsEmail()
  @MinLength(6)
  password: string;

  @IsJWT()
  token: string;
}