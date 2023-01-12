export class JSFileDto {
    scriptID?: number;
    scriptVersion?: number;
};

export class ChildJSDto extends JSFileDto {
    input?: object;
};