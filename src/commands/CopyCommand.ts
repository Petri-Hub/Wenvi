import chalk from "chalk";
import { EnvironmentNotSpecifiedError } from "../errors/EnvironmentNotSpecifiedError";
import { SubjectNotSpecifiedError } from "../errors/SubjectNotSpecifiedError";
import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";
import clipboard from "clipboardy";

export class CopyCommand implements ICommand{
    public async execute({ repository, parameters: [subjectName, environmentName] }: CommandInput): Promise<void> {
        if(!subjectName){
            throw new SubjectNotSpecifiedError()
        }

        if(!environmentName){
            throw new EnvironmentNotSpecifiedError()
        }

        const environment = await repository.getEnvironment(subjectName, environmentName)

        clipboard.writeSync(environment)

        Logger.success(`Copied environment ${chalk.underline.bold(environmentName)} for subject ${chalk.underline.bold(subjectName)} to clipboard`)
    }
}