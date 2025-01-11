import CryptoJS from 'crypto-js'
import fs from 'fs-extra'
import path from 'path'
import prompt from 'prompt'
import { IExecutableCommand } from '../interfaces/ICommand'
import { Logger } from '../logging/Logger'
import { ExportedEnvironment } from '../types/ExportedEnvironment'
import { WenviExportableContent as WenviExportableData } from '../types/WenviExportableContent'
import { BaseCommand } from './BaseCommand'

export class ExportCommand extends BaseCommand implements IExecutableCommand {
   public async execute(): Promise<void> {
      const password = await this.promptPasswordToUser()
      const data = await this.getExportableContent()
      const file = await this.encryptExportedData(data, password)

      await this.createEncryptedFile(file)

      Logger.success('Environments exported sucessfully at .wenvi file')
   }

   private async promptPasswordToUser(): Promise<string> {
      Logger.log('Please type the password to encrypt the environments:\n')

      const result = await prompt.get({
         allowEmpty: false,
         description: 'password',
         replace: '*',
         required: true,
         hidden: true
      })

      return result.question as string
   }

   private async getExportableContent(): Promise<WenviExportableData> {
      const repository = this.getRepository()

      const data: WenviExportableData = {
         example: '',
         environments: await this.getAllEnvironments()
      }

      if (await repository.isExampleCreated()) {
         data.example = await repository.getExample()
      }

      return data
   }

   private async getAllEnvironments(): Promise<ExportedEnvironment[]> {
      const exportedEnvironments: ExportedEnvironment[] = []
      const repository = this.getRepository()

      for (const subjectName of await repository.getSubjects()) {
         for (const enviromentName of await repository.getEnvironments(
            subjectName
         )) {
            exportedEnvironments.push({
               subject: subjectName,
               environment: enviromentName,
               content: await repository.getEnvironment(
                  subjectName,
                  enviromentName
               )
            })
         }
      }

      return exportedEnvironments
   }

   private async encryptExportedData(
      data: WenviExportableData,
      password: string
   ): Promise<string> {
      const encrypted = CryptoJS.AES.encrypt(
         JSON.stringify(data),
         password
      ).toString()

      return encrypted
   }

   private async createEncryptedFile(file: string): Promise<void> {
      fs.writeFileSync(path.join(process.cwd(), '.wenvi'), file)
   }
}
