import chalk from "chalk";
import { EnvironmentNotSpecifiedError } from "../errors/EnvironmentNotSpecifiedError";
import { SubjectNotSpecifiedError } from "../errors/SubjectNotSpecifiedError";
import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";
import fs from 'fs'

export class UseCommand implements ICommand{
    public async execute({ repository, parameters: [subjectName, environmentName] }: CommandInput): Promise<void>{
        if(!subjectName){
            throw new SubjectNotSpecifiedError()
        }
        if(!environmentName){
            throw new EnvironmentNotSpecifiedError()
        }
  
        const environment = await repository.getEnvironment(subjectName, environmentName)
        
        fs.writeFileSync(process.cwd() + '/.env', environment)

        Logger.success(`Using ${chalk.bold.underline(subjectName)} in ${chalk.bold.underline(environmentName)} environment`)
    }
}