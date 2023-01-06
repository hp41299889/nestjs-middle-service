export class RMQMessageDto {
    jsonrpc: string;
    method: string;
    params: object;
    id: number;
};