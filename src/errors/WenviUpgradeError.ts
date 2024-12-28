import { BaseError } from "./BaseError";

export class WenviUpgradeError extends BaseError{
    constructor(error: unknown){
        super({
            code: 'WENVI_008',
            message: "An error ocurred while trying to upgrade Wenvi",
            error: error
        })
    }
}