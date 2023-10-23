import { useState } from "react";
import { ProjectInput } from "../interaction/ProjectInput";
import { Project } from "../types/Project";
import { ProjectTable } from "../components/ProjectTable";
import { Modal } from "antd";

export interface ProjectSelectionPageProps {
    projects: Project[];
    onCreate: (project: Project) => any;
    onOpen: (project: Project) => any;
}

export function ProjectSelectionPage({ projects, onCreate, onOpen }: ProjectSelectionPageProps) {
    const [project, setProject] = useState<Project>({ name: null, description: null, timeRecords: [] });

    function handleCreate() {
        if (project.name == null || projects.filter((p) => p.name == project.name).length > 0) {
            Modal.error({
                title: "Invalid Input",
                content: "Project with name '" + project.name + "' already exists.",
            });
        } else {
            onCreate(project);
            setProject({ name: null, description: null, timeRecords: [] });
        }
    }

    return (
        <div className="flex flex-col gap-10">
            <div>
                <h3>Create Project</h3>

                <ProjectInput value={project} onChange={setProject} onCreate={handleCreate} editMode={false}></ProjectInput>
            </div>

            <ProjectTable projects={projects} onEdit={() => {}} onOpen={onOpen} renderAction={true}></ProjectTable>
        </div>
    );
}
