import chalk from "chalk";
import { IExecutableCommand } from "../interfaces/ICommand";
import { CommandInput } from "../types/CommandInput";
import { Logger } from "../logging/Logger";
import { SubjectNotSpecifiedError } from "../errors/SubjectNotSpecifiedError";
import { BaseCommand } from "./BaseCommand";

export class DeleteCommand extends BaseCommand implements IExecutableCommand{
    public async execute({ parameters: [subjectName, environmentName]}: CommandInput): Promise<void> {
        if(!subjectName){
            throw new SubjectNotSpecifiedError()
        }
        
        environmentName
            ? await this.deleteEnvironment(subjectName, environmentName)
            : await this.deleteSubject(subjectName)
    }

    private async deleteSubject(subjectName: string): Promise<void> {
        const repository = this.getRepository()

        await repository.deleteSubject(subjectName);

        Logger.success(`Subject ${chalk.bold.underline(subjectName)} deleted successfully.`);
    }

    private async deleteEnvironment(subjectName: string, environmentName: string): Promise<void> {
        const repository = this.getRepository()

        await repository.deleteEnvironment(subjectName, environmentName);

        Logger.success(`Environment ${chalk.bold.underline(environmentName)} deleted successfully for subject ${chalk.bold.underline(subjectName)}.`);
    }
}