import chalk from "chalk";
import { EnvironmentNotSpecifiedError } from "../errors/EnvironmentNotSpecifiedError";
import { SubjectNotSpecifiedError } from "../errors/SubjectNotSpecifiedError";
import { VariablesNotSpecifiedError } from "../errors/VariablesNotSpecifiedError";
import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";
import { BaseCommand } from "./BaseCommand";

export class UpdateCommad extends BaseCommand implements ICommand{
    public async execute({ parameters: [subjectName, environmentName, variables]}: CommandInput): Promise<void> {
        if(!subjectName){
            throw new SubjectNotSpecifiedError()
        }
        if(!environmentName){
            throw new EnvironmentNotSpecifiedError()
        }
        if(!variables){
            throw new VariablesNotSpecifiedError()
        }

        await this.getRepository().updateEnvironment(subjectName, environmentName, variables)

        Logger.success(`Enivronment ${chalk.underline.bold(environmentName)} for subject ${chalk.underline.bold(subjectName)} updated successfully:\n`)
        console.log(variables)
    }
}