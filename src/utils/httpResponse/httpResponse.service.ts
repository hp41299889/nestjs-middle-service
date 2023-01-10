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

    async renderView(res: Response, statusCode: number, view: string): Promise<void> {
        try {
            if (view == 'login') {
                return res.status(statusCode).render(view, { layout: this.indexLayout, navbar: false });
            } else {
                return res.status(statusCode).render(view, { layout: this.indexLayout, navbar: true });
            };
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

    async redirectView(res: Response, statusCode: number, view: string): Promise<void> {
        try {
            res.status(statusCode).redirect(`/MiddleService/${view}/view`);
        } catch (err) {
            throw err;
        };
    };
};