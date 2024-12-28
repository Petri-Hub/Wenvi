import { IEnvironmentRepository } from "../interfaces/IEnvironmentRepository";

export class RepositoryRegistry {
    private repositories = new Map<string, IEnvironmentRepository>();

    public set(name: string, command: IEnvironmentRepository): void {
        this.repositories.set(name, command);
    }

    public get(name: string): IEnvironmentRepository | null {
        return this.repositories.get(name) ?? null;
    }
}