import chalk from "chalk";
import { EnvironmentNotSpecifiedError } from "../errors/EnvironmentNotSpecifiedError";
import { SubjectNotSpecifiedError } from "../errors/SubjectNotSpecifiedError";
import { VariablesNotSpecifiedError } from "../errors/VariablesNotSpecifiedError";
import { IExecutableCommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";
import { BaseCommand } from "./BaseCommand";

export class GetKeyCommand extends BaseCommand implements IExecutableCommand{
    public async execute({ parameters: [subjectName, environmentName, variableKey] }: CommandInput){
        if(!subjectName){
            throw new SubjectNotSpecifiedError();
        }
        if(!environmentName){
            throw new EnvironmentNotSpecifiedError();
        }
        if(!variableKey){
            throw new VariablesNotSpecifiedError();
        }

        const value = await this.getRepository().getKey(subjectName, environmentName, variableKey)

        Logger.log(`Value of ${chalk.underline.bold(variableKey)} in ${chalk.underline.bold(subjectName)} > ${chalk.underline.bold(environmentName)} is: ${value}`)
    }
}