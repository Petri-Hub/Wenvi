import { EnvironmentFile } from "../types/EnvironmentFile";

export interface IEnvironmentRepository {
   get(subject: string, environment: string): Promise<EnvironmentFile | null>
   list(): Promise<EnvironmentFile[]>
   exists(): Promise<boolean>
}