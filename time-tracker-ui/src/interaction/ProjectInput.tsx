import TextArea from "antd/es/input/TextArea";
import { Project } from "../types/Project";
import { Button, Input } from "antd";

export interface ProjectInputProps {
    value: Project;
    onChange: (project: Project) => any;
    onCreate: () => any;
    editMode: boolean;
}

export function ProjectInput({ value, onChange, onCreate, editMode }: ProjectInputProps) {
    function handleChangeName(name: string) {
        onChange({ ...value, name });
    }

    function handleChangeDescription(description: string) {
        onChange({ ...value, description });
    }

    return (
        <div className="inline-flex flex-col gap-4">
            <Input value={value.name ?? undefined} placeholder="Project name" onChange={(e) => handleChangeName(e.target.value)}></Input>

            <TextArea
                rows={5}
                cols={40}
                value={value.description ?? undefined}
                placeholder="A description of the project"
                onChange={(e) => handleChangeDescription(e.target.value)}
            ></TextArea>

            <Button type="primary" onClick={onCreate}>
                {`${editMode ? "Save" : "Create"}`}
            </Button>
        </div>
    );
}
