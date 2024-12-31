import chalk from "chalk";
import { ICommand } from "../interfaces/ICommand";
import { CommandInput } from "../types/CommandInput";
import { Logger } from "../logging/Logger";
import { IRepository } from "../interfaces/IRepository";

export class DeleteCommand implements ICommand{
    public async execute({ repository, parameters: [subjectName, environmentName]}: CommandInput): Promise<void> {
        if(!environmentName){
            await this.deleteSubject(repository, subjectName);
        } else {
            await this.deleteEnvironment(repository, subjectName, environmentName);
        }
    }

    private async deleteSubject(repository: IRepository, subjectName: string): Promise<void> {
        await repository.deleteSubject(subjectName);

        Logger.success(`Subject ${chalk.bold.underline(subjectName)} deleted successfully.`);
    }

    private async deleteEnvironment(repository: IRepository, subjectName: string, environmentName: string): Promise<void> {
        await repository.deleteEnvironment(subjectName, environmentName);

        Logger.success(`Environment ${chalk.bold.underline(environmentName)} deleted successfully for subject ${chalk.bold.underline(subjectName)}.`);
    }
}