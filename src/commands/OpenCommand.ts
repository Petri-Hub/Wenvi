import { SubjectNotSpecifiedError } from "../errors/SubjectNotSpecifiedError";
import { ICommand } from "../interfaces/ICommand";
import { CommandInput } from "../types/CommandInput";
import { BaseCommand } from "./BaseCommand";

export class OpenCommand extends BaseCommand implements ICommand{
    public async execute({ parameters: [subjectName, environmentName] }: CommandInput){
        if(!subjectName){
            throw new SubjectNotSpecifiedError()
        }

        const repository = this.getRepository()

        environmentName
            ? await repository.openEnvironment(subjectName, environmentName)
            : await repository.openSubject(subjectName)
    }
}