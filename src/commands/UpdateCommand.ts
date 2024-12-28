import { ICommand } from "../interfaces/ICommand";
import { execSync } from "child_process";

export class UpgradeCommand implements ICommand{
    public async execute(): Promise<void> {
        execSync('npm install -g wenvi')
    }
}