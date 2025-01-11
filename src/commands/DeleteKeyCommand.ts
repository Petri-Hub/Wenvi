import { EnvironmentNotSpecifiedError } from "../errors/EnvironmentNotSpecifiedError";
import { SubjectNotSpecifiedError } from "../errors/SubjectNotSpecifiedError";
import { VariablesNotSpecifiedError } from "../errors/VariablesNotSpecifiedError";
import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";
import { BaseCommand } from "./BaseCommand";

export class DeleteKeyCommand extends BaseCommand implements ICommand{
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

        await this.getRepository().deleteKey(subjectName, environmentName, variableKey)

        Logger.log('Variable deleted sucessfully')
    }
}