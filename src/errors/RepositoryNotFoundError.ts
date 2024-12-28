import { BaseError } from "./BaseError";

export class RepositoryNotFoundError extends BaseError{
    constructor(){
        super({
            code: "WENVI_005",
            message: "Repository not configured. Use `wenvi init` to setup.",
            error: null
        })
    }
}