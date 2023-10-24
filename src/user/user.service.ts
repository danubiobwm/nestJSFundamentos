import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user-dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user-dto";

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async create({ name, email, password }: CreateUserDTO) {

    return await this.prisma.user.create({
      data: {
        name, email, password
      }
    })

  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {

    await this.exists(id);

    return this.prisma.user.findUnique({
      where: {
        id,
      }
    })

  }

  async update(id: number, { name, email, password, birthAt }: UpdatePutUserDTO) {
    await this.exists(id)
    return this.prisma.user.update({
      where: { id },
      data: { name, email, password, birthAt: birthAt ? new Date(birthAt) : null },
    })
  }

  async updatePartial(id: number, { name, email, password, birthAt }: UpdatePatchUserDTO) {
    await this.exists(id)
    const data: any = {}
    if (birthAt) {
      data.birthAt = new Date(birthAt)
    }


    return this.prisma.user.update({
      where: { id },
      data: { name, email, password, birthAt },
    })
  }

  async delete(id: number) {

    await this.exists(id)

    return this.prisma.user.delete({
      where: { id }
    })
  }
  async exists(id: number) {
    if (!(await this.prisma.user.count({
      where: {
        id
      }
    }))) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }
}