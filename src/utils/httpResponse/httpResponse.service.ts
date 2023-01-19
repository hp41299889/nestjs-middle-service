//packages
import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { join } from "path";

@Injectable()
export class HttpResponseService {

    private readonly indexLayout = join('..', 'layouts', 'index.hbs');

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

    async fail(res: Response, statusCode: number, error: any): Promise<void> {
        try {
            res.status(statusCode).json({
                status: 'fail',
                result: {
                    error: error
                }
            });
        } catch (err) {
            throw err;
        };
    };

    async renderView(res: Response, view: string): Promise<void> {
        try {
            if (!(view == 'auth')) {
                res.status(200).render(view, { layout: this.indexLayout, navbar: true });
            } else {
                res.status(200).render('auth', { layout: this.indexLayout, navbar: false });
            }
        } catch (err) {
            throw err;
        };
    };

    async redirectUrl(res: Response, statusCode: number, url: string): Promise<void> {
        try {
            res.status(statusCode).json({
                status: 'redirect',
                result: {
                    url: url
                }
            });
        } catch (err) {
            throw err;
        };
    };
};