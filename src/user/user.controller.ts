import { Body, Get, Controller, Post, Param, Put, Patch, Delete } from "@nestjs/common";

@Controller('users')
export class UserController {

  @Post()
  async create(@Body() body) {
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
  async update(@Body() body, @Param() params){
    return {
      method:'Put',
      body,
      params
    }
  }


  @Patch(':id')
  async updatePartial(@Body() body, @Param() params){
    return {
      method:'Patch',
      body,
      params
    }
  }

  @Delete(':id')
  async delete(@Param() params){
    return {
      params
    }
  }

}