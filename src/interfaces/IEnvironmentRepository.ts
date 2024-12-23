import { EnvironmentFile } from "../types/EnvironmentFile";

export interface IEnvironmentRepository {
   get(subject: string, environment: string): Promise<string | null>
   list(): Promise<EnvironmentFile[]>
   exists(): Promise<boolean>
}