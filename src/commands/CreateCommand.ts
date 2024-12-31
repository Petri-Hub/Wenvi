import chalk from "chalk";
import { ICommand } from "../interfaces/ICommand";
import { IRepository } from "../interfaces/IRepository";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";
import { SubjectNotSpecifiedError } from "../errors/SubjectNotSpecifiedError";

export class CreateCommand implements ICommand{
    public async execute({ repository, parameters: [subjectName, environmentName]}: CommandInput): Promise<void> {
        if(!subjectName){
            throw new SubjectNotSpecifiedError()
        }

        environmentName
            ? await this.createEnvironment(repository, subjectName, environmentName)
            : await this.createSubject(repository, subjectName)
    }

    public async createSubject(repository: IRepository, subjectName: string): Promise<void> {
        await repository.createSubject(subjectName);

        Logger.success(`Subject ${chalk.bold.underline(subjectName)} created successfully.`);
    }

    public async createEnvironment(repository: IRepository, subjectName: string, environmentName: string): Promise<void> {
        await repository.createEnvironment(subjectName, environmentName);

        Logger.success(`Environment ${chalk.bold.underline(environmentName)} created successfully for subject ${chalk.bold.underline(subjectName)}.`);
    }
}