import { BaseError } from "./BaseError";

export class ExampleNotConfiguredError extends BaseError{
    constructor(){
        super({
            code: 'WENVI_007',
            message: 'The example file was not configured. Please create a file at environments/ with the name .env.example',
            error: null
        })
    }
}