import chalk from "chalk";
import { IExecutableCommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";
import { SubjectNotSpecifiedError } from "../errors/SubjectNotSpecifiedError";
import { BaseCommand } from "./BaseCommand";

export class CreateCommand extends BaseCommand implements IExecutableCommand{
    public async execute({ parameters: [subjectName, environmentName, environment]}: CommandInput): Promise<void> {
        if(!subjectName){
            throw new SubjectNotSpecifiedError()
        }

        environmentName
            ? await this.createEnvironment(subjectName, environmentName, environment)
            : await this.createSubject(subjectName)
    }

    public async createSubject(subjectName: string): Promise<void> {
        const repository = this.getRepository()
        
        await repository.createSubject(subjectName);

        Logger.success(`Subject ${chalk.bold.underline(subjectName)} created successfully.`);
    }
    
    public async createEnvironment(subjectName: string, environmentName: string, environment?: string): Promise<void> {
        const repository = this.getRepository()
        
        await repository.createEnvironment(subjectName, environmentName, environment);

        Logger.success(`Environment ${chalk.bold.underline(environmentName)} created successfully for subject ${chalk.bold.underline(subjectName)}.`);
    }
}