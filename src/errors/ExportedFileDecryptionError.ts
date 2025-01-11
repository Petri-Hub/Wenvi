import { ErrorCodes } from '../constants/ErrorCodes'
import { ErrorMessages } from '../constants/ErrorMessages'
import { BaseError } from './BaseError'

export class ExportedFileDecryptionError extends BaseError {
   constructor(error: unknown) {
      super({
         code: ErrorCodes.ExportedFileDecryption,
         message: ErrorMessages.ExportedFileDecryption,
         error
      })
   }
}
