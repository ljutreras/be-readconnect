import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const UserBookToReadController = async (req: Request, res: Response) => {
    const data = {
        table: 'users',
        column: 'u_books_to_read',
        book: req.body,
        columnWhere: 'u_email',
        pathParams: req.params.email
      } 

    try {
        const query = PostgreSQLRepository.create().insertUserBook(data);
        await PostgreSQLRepository.create().client().query(query);
        return res.status(StatusCode.CREATED).json({ message: 'inserted' });
    } catch (error: any) {
        if (error.file == 'nbtinsert.c') return res.status(StatusCode.BAD_REQUEST).json({ message: `Someone is already using that id` })
        return res.status(StatusCode.BAD_REQUEST).json({ error })
    }
}