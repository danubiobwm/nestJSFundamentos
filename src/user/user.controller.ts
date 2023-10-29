import { Body, Get, Controller, Post, Param, Put, Patch, Delete, ParseIntPipe, UseGuards, UseInterceptors} from "@nestjs/common";
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdatePutUserDTO } from "./dto/update-put-user-dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user-dto";
import { UserService } from "./user.service";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enums/role.enum";
import { LogInterceptor } from "../interceptors/log.interceptor";
import { RoleGuard } from "../guards/role.guard";
import { AuthGuard } from "../guards/auth.guard";

@Roles(Role.Admin)
@UseInterceptors(LogInterceptor)
@UseGuards(AuthGuard, RoleGuard )
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService){}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() {email, password, name,role, birthAt}: CreateUserDTO) {
      return this.userService.create({email, password, name, role, birthAt})
  }

  @Roles(Role.Admin)
  @Get()
  async list(){
   return this.userService.list()
  }

  @Roles(Role.Admin)
  @Get(':id')
  async show(@Param('id', ParseIntPipe) id:number){
    return this.userService.show(id)
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(@Body() data:UpdatePutUserDTO, @Param('id', ParseIntPipe) id:number){
    return this.userService.update(id, data)
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updatePartial(@Body() data:UpdatePatchUserDTO, @Param('id', ParseIntPipe) id:number){
    return  this.userService.updatePartial(id, data)
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id:number){
    return this.userService.delete(id)
  }

}


