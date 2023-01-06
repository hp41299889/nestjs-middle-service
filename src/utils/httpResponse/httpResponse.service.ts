//packages
import { Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class HttpResponseService {
    async success(res: Response, statusCode: number, data: any): Promise<void> {
        try {
            res.status(statusCode).json({
                status: 'success',
                result: {
                    data: data
                }
            });
        } catch (err) {
            throw err;
        };
    };

    async fail(res: Response, error: any): Promise<void> {
        try {
            res.status(400).json({
                status: 'fail',
                result: {
                    error: error
                }
            });
        } catch (err) {
            throw err;
        };
    };

    async renderView(res: Response): Promise<void> {
        try {
            res.render('');
        } catch (err) {
            throw err;
        };
    };
};