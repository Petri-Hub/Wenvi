import { ICommand } from "../interfaces/ICommand";
import * as fs from 'fs';
import * as path from 'path';

export class VersionCommand implements ICommand {
    public async execute(): Promise<void> {
        const packageJsonPath = path.resolve(__dirname, '../../package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        const version = packageJson.version;
        
        console.log(`Wenvi CLI v${version}`);
    }
}