import { BaseError } from "./BaseError";

export class CommandNotFoundError extends BaseError{
    constructor(){
        super({
            code: "WENVI_004",
            message: "Command not found.",
            error: null
        })
    }
}