import { ExampleNotFoundError } from "../errors/ExampleNotConfiguredError";
import { ICommand } from "../interfaces/ICommand";
import { CommandInput } from "../types/CommandInput";

export class ValidateCommand implements ICommand{    
    public async execute({ repository }: CommandInput): Promise<void> {
        const example = await repository.getExample()

        const variables = example
            .split('\n')
            .map(line => line.split('=').at(0))

        const subjects = await repository.getSubjects()

        for(const subjectName of subjects){
            const environments = await repository.getEnvironments(subjectName)

            console.group(subjectName)

            for(const environmentFileName of environments){
                const missingVariables = []

                const environmentName = environmentFileName.split('.').pop() as string
                const environment = await repository.getEnvironment(subjectName, environmentName) as string
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