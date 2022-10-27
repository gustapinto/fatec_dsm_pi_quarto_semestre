import { Controller, Post } from "@overnightjs/core";
import { Request, Response } from "express";

/**
 * Controller responsável por lidar com a autenticação de usuários
*/
@Controller('api/auth')
export class AuthController {
    /**
     * Realiza a autenticação do usuário
    */
    @Post()
    async login(req: Request, res: Response): Promise<Response<any>|void> {
    }
}
