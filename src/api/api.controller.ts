import { Controller, Get, Post, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

@Controller('/api/v1')
export class ApiController {
    constructor(
    ) { }

    @Post('/file')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: diskStorage({
                destination: './upload',
                filename(req, file, callback) {
                    const name = file.originalname;
                    callback(null, name);
                },
            })
        }))
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(files);
        return 'upload OK!';
    };

    @Get('/device/attributes')
    async getAttributes() {
    };
};