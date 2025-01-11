import { ErrorCodes } from '../constants/ErrorCodes'
import { ErrorMessages } from '../constants/ErrorMessages'
import { BaseError } from './BaseError'

export class VariablesNotSpecifiedError extends BaseError {
   constructor() {
      super({
         code: ErrorCodes.VariablesNotSpecified,
         message: ErrorMessages.VariablesNotSpecified,
         error: null
      })
   }
}
