import { Body, Get, Controller, Post, Param, Put, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdatePutUserDTO } from "./dto/update-put-user-dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user-dto";

@Controller('users')
export class UserController {

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return{
      body
    }
  }

  @Get()
  async list(){
    return{
      users: []
    }
  }

  @Get(':id')
  async show(@Param() params){
    return{
      user:{}, params
    }
  }

  @Put(':id')
  async update(@Body() {name, email, password}:UpdatePutUserDTO, @Param() params){
    return {
      method:'Put',
      name, email, password,
      params
    }
  }


  @Patch(':id')
  async updatePartial(@Body() {name, email, password}:UpdatePatchUserDTO, @Param() params){
    return {
      method:'Patch',
      name, email, password,
      params
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id:number){
    return {
      id
    }
  }

}