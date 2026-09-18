import type { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';

export class AuthController {

  // POST /auth/register
  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      // 1. Verifica se o usuário já existe no banco
      const userExists = await prisma.user.findUnique({
        where: { email },
      });

      if (userExists) {
        res.status(400).json({ message: 'E-mail já cadastrado.' });
        return;
      }

      // 2. Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // 3. Cria o usuário no banco de dados via Prisma
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  // POST /auth/login
  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      // 1. Busca o usuário pelo e-mail
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        res.status(401).json({ message: 'Credenciais inválidas.' });
        return;
      }

      // 2. Compara a senha fornecida com o hash salvo
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: 'Credenciais inválidas.' });
        return;
      }

      // 3. Gera o token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      // 4. Retorna o token e dados básicos (sem a senha)
      res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /auth/me (Rota Protegida)
  public me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Assumindo que o ID foi injetado pelo middleware de autenticação (req.userId)
      const userId = (req as any).userId;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}