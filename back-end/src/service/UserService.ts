import { prisma } from '../config/database.js';

// Interface para entrada de dados no cadastro
interface CreateUserData {
  name: string;
  email: string;
}

export class UserService {
  static async searchUsers(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
      return [];
    }

    return await prisma.user.findMany({
      where: {
        name: {
          contains: searchTerm,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      take: 10,
    });
  }

  static async createUser(data: CreateUserData) {
    return await prisma.user.create({
      data,
    });
  }
}