import { ExampleNotConfiguredError } from "../errors/ExampleNotConfiguredError";
import { LocalRepositoryNotConfiguredError } from "../errors/LocalRepositoryNotConfiguredError";
import { ICommand } from "../interfaces/ICommand";
import { IEnvironmentRepository } from "../interfaces/IEnvironmentRepository";

export class ValidateCommand implements ICommand{
    constructor(private repository: IEnvironmentRepository){}
    
    public async execute(): Promise<void> {
        if(!this.repository.exists()){
            throw new LocalRepositoryNotConfiguredError()
        }

        const example = await this.repository.example()

        if(!example){
            throw new ExampleNotConfiguredError()
        }

        const variables = example
            .split('\n')
            .map(line => line.split('=').at(0))

        const subjects = await this.repository.listSubjects()

        for(const subjectName of subjects){
            const environments = await this.repository.listEnvironments(subjectName)

            console.group(subjectName)

            for(const environmentFileName of environments){
                const missingVariables = []

                const environmentName = environmentFileName.split('.').pop() as string
                const environment = await this.repository.get(subjectName, environmentName) as string
                const environmentVariables = environment
                    .split('\n')
                    .map(line => line.split('=').at(0))

                for(const variable of variables){
                    if(!environmentVariables.includes(variable)){
                        missingVariables.push(variable)
                    }
                }

                if(missingVariables.length > 0){
                    console.log(`- ${environmentName}: ${missingVariables.join(', ')}`)
                } else {
                    console.log(`- ${environmentName}: No missing variables`)
                }
            }

            console.groupEnd()
        }
    }
}