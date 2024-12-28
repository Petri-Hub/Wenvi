import { ICommand } from "../interfaces/ICommand";
import { CommandInput } from "../types/CommandInput";

export class ListCommand implements ICommand {
    public async execute({ repository }: CommandInput): Promise<void> {
        const environments = await repository.list()
        const isEmpty = environments.length === 0

        if(isEmpty){
            console.log('No environments found')
            return
        }

        console.log(environments)
    }
}