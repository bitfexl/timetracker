import { CompleteTimeRecord } from "./TimeRecord";

export interface Project {
    name: string | null;
    description: string | null;
    timeRecords: CompleteTimeRecord[];
}
