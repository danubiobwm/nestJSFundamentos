import { Body, Get, Controller, Post, Param, Put, Patch, Delete, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdatePutUserDTO } from "./dto/update-put-user-dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user-dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { paramsId } from "src/decorators/param-id.decorator";

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService){}

  @UseInterceptors(LogInterceptor)
  @Post()
  async create(@Body() {email, password, name, birthAt}: CreateUserDTO) {
      return this.userService.create({email, password, name, birthAt})
  }

  @Get()
  async list(){
   return this.userService.list()
  }

  @Get(':id')
  async show(@paramsId('id', ParseIntPipe) id:number){
    return this.userService.show(id)
  }

  @Put(':id')
  async update(@Body() data:UpdatePutUserDTO, @Param('id', ParseIntPipe) id:number){
    return this.userService.update(id, data)
  }


  @Patch(':id')
  async updatePartial(@Body() data:UpdatePatchUserDTO, @Param('id', ParseIntPipe) id:number){
    return  this.userService.updatePartial(id, data)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id:number){
    return this.userService.delete(id)
  }

}