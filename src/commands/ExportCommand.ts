import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { ExportedEnvironment } from "../types/ExportedEnvironment";
import { BaseCommand } from "./BaseCommand";
import CryptoJS from 'crypto-js'
import fs from 'fs-extra'
import path from 'path'
import prompt from 'prompt'

export class ExportCommand extends BaseCommand implements ICommand{
    public async execute(): Promise<void> {
        const password = await this.promptPasswordToUser()
        const environments = await this.getAllEnvironments()
        const file = await this.encryptAllEnviroments(environments, password)

        await this.createEncryptedFile(file)

        Logger.success('Environments exported sucessfully at .wenvi file')
    }

    private async promptPasswordToUser(): Promise<string> {
        return "123"
    }

    private async getAllEnvironments(): Promise<ExportedEnvironment[]> {
        const exportedEnvironments: ExportedEnvironment[] = []
        const repository = this.getRepository()
        
        for(const subjectName of await repository.getSubjects()){
            for(const enviromentName of await repository.getEnvironments(subjectName)){
                exportedEnvironments.push({
                    subject: subjectName,
                    environment: enviromentName,
                    content: await repository.getEnvironment(subjectName, enviromentName)
                })
            }
        }
        
        return exportedEnvironments
    }

    private async encryptAllEnviroments(environments: ExportedEnvironment[], password: string): Promise<string> {
        const data = JSON.stringify(environments)
        const encrypted = CryptoJS.AES.encrypt(data, password).toString()

        return encrypted
    }

    private async createEncryptedFile(file: string): Promise<void> {
        fs.writeFileSync(path.join(process.cwd(), '.wenvi'), file)
    }
}