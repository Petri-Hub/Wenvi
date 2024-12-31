import chalk from "chalk";
import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";

export class ViewCommand implements ICommand{
    public async execute({ repository, parameters: [subjectName, environmentName] }: CommandInput): Promise<void> {
        const variables = await repository.getEnvironment(subjectName, environmentName)
        const isEmpty = variables.replace(/[^A-Za-z0-9=]/gi, '').length === 0

        if (isEmpty) {
            Logger.log(`Environment ${chalk.bold.underline(environmentName)} of subject ${chalk.bold.underline(subjectName)} is empty`)
            return
        }

        Logger.log(`Seeing environment ${chalk.bold.underline(environmentName)} for subject ${chalk.bold.underline(subjectName)}:\n`)
        console.log(variables)
    }
}