import { EnvironmentNotSpecifiedError } from "../errors/EnvironmentNotSpecifiedError";
import { LocalRepositoryNotConfiguredError } from "../errors/LocalRepositoryNotConfiguredError";
import { SubjectNotSpecifiedError } from "../errors/SubjectNotSpecifiedError";
import { ICommand } from "../interfaces/ICommand";
import { IEnvironmentRepository } from "../interfaces/IEnvironmentRepository";
import fs from 'fs'

export class UseCommand implements ICommand{
    constructor(private repository: IEnvironmentRepository){}

    public async execute(subject: string, environment: string): Promise<void>{
        if(!subject){
            throw new SubjectNotSpecifiedError()
        }
        if(!environment){
            throw new EnvironmentNotSpecifiedError()
        }
        if(!this.repository.exists()){
            throw new LocalRepositoryNotConfiguredError()
        }

        const environmentVariables = await this.repository.get(subject, environment)
        
        if(environmentVariables === null){
            return
        }

        fs.writeFileSync(process.cwd() + '/.env', environmentVariables)
    }
}