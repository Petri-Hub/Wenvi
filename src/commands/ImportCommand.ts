import prompt from "prompt";
import { ExportedFileNotFoundError } from "../errors/ExportedFileNotFoundError";
import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";
import { BaseCommand } from "./BaseCommand";
import CryptoJS from "crypto-js";
import fs from 'fs-extra'
import { ExportedFileDecryptionError } from "../errors/ExportedFileDecryptionError";
import { WenviExportableContent } from "../types/WenviExportableContent";

export class ImportCommand extends BaseCommand implements ICommand{
    public async execute({ parameters: [path = process.cwd() + '/.wenvi'] }: CommandInput): Promise<void> {
        const repository = this.getRepository()

        const file = this.tryToReadExportedFile(path)
        const password = await this.promptDecryptionPassword()
        const data = this.decryptExportedFile(file, password)

        await repository.load(data)

        Logger.success('Data imported successfully!')
    }

    private tryToReadExportedFile(path: string): string {
        const fileWasNotFound = !fs.existsSync(path)

        if(fileWasNotFound){
            throw new ExportedFileNotFoundError()
        }

        return fs.readFileSync(path, 'utf-8')
    }

    private async promptDecryptionPassword(): Promise<string> {
        Logger.log('Please type the password to decrypt the exported data:\n')

        const result = await prompt.get({
            allowEmpty: false,
            description: 'password',
            replace: '*',
            required: true,
            hidden: true,
        })

        return result.question as string 
    }

    private decryptExportedFile(file: string, password: string): WenviExportableContent {
        try{
            const data = CryptoJS.AES
                .decrypt(file, password)
                .toString(CryptoJS.enc.Utf8)

            return JSON.parse(data) as WenviExportableContent 

        } catch(error){
            throw new ExportedFileDecryptionError(error)
        }
    }
}