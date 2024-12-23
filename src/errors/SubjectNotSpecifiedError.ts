import { BaseError } from "./BaseError";

export class SubjectNotSpecifiedError extends BaseError{
    constructor(){
        super({
            code: "WENVI_005",
            message: "The subject was not specified.",
            error: null
        })
    }
}