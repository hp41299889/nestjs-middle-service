//dtos
import { ControllerBasicDto } from "src/basics/dtos/config.dto";

export class AuthControllerConfigDto extends ControllerBasicDto {
    loginRoute: string;
    logoutRoute: string;
};