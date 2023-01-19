import { Request, Response, NextFunction } from "express";

declare module 'express-session' {
    interface SessionData {
        token: string;
    }
};

export const sessionCheck = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.session.token) {
            res.status(200).redirect('/MiddleService/Auth/view');
        } else {
            next();
        };
    } catch (err) {
        throw err;
    };
};