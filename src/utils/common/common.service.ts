//packages
import { Injectable } from "@nestjs/common";
import * as UglifyJS from 'uglify-js';

@Injectable()
export class CommonService {
    async uglifyContent(content: string): Promise<string> {
        try {
            const mini = UglifyJS.minify(content, {
                mangle: false,
                compress: false,

                output: {
                    quote_style: 3,
                    beautify: false
                },
            });
            return mini.code;
        } catch (err) {
            throw err;
        };
    };
};