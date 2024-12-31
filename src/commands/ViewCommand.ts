import chalk from "chalk";
import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";

export class ViewCommand implements ICommand{
    public async execute({ repository, parameters: [subjectName, environmentName] }: CommandInput): Promise<void> {
        const variables = await repository.get(subjectName, environmentName)
        
        Logger.log(`Seeing environment ${chalk.bold.underline(environmentName)} for subject ${chalk.bold.underline(subjectName)}:\n`)
        console.log(variables)
    }
}