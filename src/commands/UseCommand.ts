import chalk from "chalk";
import { EnvironmentNotSpecifiedError } from "../errors/EnvironmentNotSpecifiedError";
import { SubjectNotSpecifiedError } from "../errors/SubjectNotSpecifiedError";
import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";
import fs from 'fs'

export class UseCommand implements ICommand{
    public async execute({ repository, parameters: [subject, environment] }: CommandInput): Promise<void>{
        if(!subject){
            throw new SubjectNotSpecifiedError()
        }
        if(!environment){
            throw new EnvironmentNotSpecifiedError()
        }
  
        const environmentVariables = await repository.get(subject, environment)
        
        if(environmentVariables === null){
            return
        }

        fs.writeFileSync(process.cwd() + '/.env', environmentVariables)

        Logger.success(`Using ${chalk.bold.underline(subject)} in ${chalk.bold.underline(environment)} environment`)
    }
}