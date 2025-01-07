import { EnvironmentNotSpecifiedError } from "../errors/EnvironmentNotSpecifiedError";
import { SubjectNotSpecifiedError } from "../errors/SubjectNotSpecifiedError";
import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";
import { BaseCommand } from "./BaseCommand";
import chalk from "chalk";
import fs from 'fs'

export class UseCommand extends BaseCommand implements ICommand{
    public async execute({ parameters: [subjectName, environmentName] }: CommandInput): Promise<void>{
        if(!subjectName){
            throw new SubjectNotSpecifiedError()
        }
        if(!environmentName){
            throw new EnvironmentNotSpecifiedError()
        }
  
        const repository = this.getRepository()
        const environment = await repository.getEnvironment(subjectName, environmentName)
        
        fs.writeFileSync(process.cwd() + '/.env', environment)
        Logger.success(`Using ${chalk.bold.underline(subjectName)} in ${chalk.bold.underline(environmentName)} environment`)
    }
}