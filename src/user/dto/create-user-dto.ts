import { IsString, IsEmail,  IsOptional, IsDateString, IsEnum, MinLength, MaxLength } from "class-validator";
import { Role } from "../../enums/role.enum";



export class CreateUserDTO {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(24)
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt: string;

  @IsOptional()
  @IsEnum(Role)
  role:number;
}