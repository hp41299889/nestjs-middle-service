class RouteDto {
    prefix: string;
};

export class AppConfigDto extends RouteDto {
    name: string;
    port: string | number;
    sessionKey: string;
    sessionLife: string | number;
};

export class ControllerBasicDto extends RouteDto {
    viewRoute: string;
};