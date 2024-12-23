import { BaseError } from "./BaseError";

export class EnvironmentNotSpecifiedError extends BaseError{
    constructor(){
        super({
            code: "WENVI_006",
            message: "The environment was not specified.",
            error: null
        })
    }
}