import { ErrorCodes } from '../constants/ErrorCodes'
import { ErrorMessages } from '../constants/ErrorMessages'
import { BaseError } from './BaseError'

export class CurrentEnvironmentNotSetError extends BaseError {
   constructor() {
      super({
         code: ErrorCodes.CurrentEnvironmentNotSet,
         message: ErrorMessages.CurrentEnvironmentNotSet,
         error: null
      })
   }
}
