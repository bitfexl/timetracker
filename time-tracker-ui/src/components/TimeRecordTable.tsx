import { useMemo } from "react";
import { CompleteTimeRecord } from "../types/TimeRecord";
import { Button, Table } from "antd";
import { ColumnType } from "antd/es/table";

export interface TimeRecordTableProps {
    records: CompleteTimeRecord[];
    renderAction: boolean;
    onDelete: (record: CompleteTimeRecord) => any;
    onEdit: (record: CompleteTimeRecord) => any;
}

export function TimeRecordTable({ records, renderAction, onDelete, onEdit }: TimeRecordTableProps) {
    const sortedRecordsDataSource = useMemo(() => [...records].sort((a, b) => b.key - a.key), [records]);

    const render = (content: string) => <span className="inline-block w-max">{content}</span>;

    const columns: ColumnType<CompleteTimeRecord>[] = [
        {
            title: "Date",
            dataIndex: "date",
            render,
        },
        {
            title: "From",
            dataIndex: "from",
            render,
        },
        {
            title: "To",
            dataIndex: "to",
            render,
        },
        {
            title: "Time",
            dataIndex: "time",
            render,
        },
        {
            title: "Task",
            dataIndex: "task",
        },
    ];

    if (renderAction) {
        columns.push({
            title: "Action",
            key: "action",
            render(text, record, index) {
                return (
                    <>
                        <Button type="link" onClick={() => onEdit(record)}>
                            Edit
                        </Button>
                        <Button type="link" onClick={() => onDelete(record)}>
                            Delete
                        </Button>
                    </>
                );
            },
        });
    }

    return <Table columns={columns} dataSource={sortedRecordsDataSource} pagination={false}></Table>;
}
