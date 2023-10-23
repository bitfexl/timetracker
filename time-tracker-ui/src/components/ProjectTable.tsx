import { Button, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { Project } from "../types/Project";

export interface ProjectTableProps {
    projects: Project[];
    renderAction: boolean;
    onOpen: (project: Project) => any;
    onEdit: (project: Project) => any;
}

export function ProjectTable({ projects, renderAction, onOpen, onEdit }: ProjectTableProps) {
    const columns: ColumnType<Project>[] = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
    ];

    if (renderAction) {
        columns.push({
            title: "Action",
            key: "action",
            render(text, project, index) {
                return (
                    <>
                        <Button type="link" onClick={() => onOpen(project)}>
                            Open
                        </Button>
                        <Button type="link" onClick={() => onEdit(project)}>
                            Edit
                        </Button>
                    </>
                );
            },
        });
    }

    return <Table rowKey={"name"} columns={columns} dataSource={projects} pagination={false}></Table>;
}
