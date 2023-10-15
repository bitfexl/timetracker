import { useMemo } from "react";
import { TimeRecord } from "../types/TimeRecord";
import dayjs from "dayjs";
import { Table } from "antd";

export interface TimeRecordTableProps {
    records: TimeRecord[];
}

export function TimeRecordTable({ records }: TimeRecordTableProps) {
    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "HH:mm";

    const sortedRecordsDataSource = useMemo(
        () => records.map((record) => ({ ...record, key: toNumber(record), time: getTime(record) })).sort((a, b) => b.key - a.key),
        [records]
    );

    function getTime(record: TimeRecord): string {
        return m2HHmm(dayjs(record.to, timeFormat).diff(dayjs(record.from, timeFormat), "m"));
    }

    function m2HHmm(minutes: number): string {
        let h = Math.floor(minutes / 60);
        let m = minutes % 60;

        return (h < 10 ? "0" + h.toString() : h.toString()) + ":" + (m < 10 ? "0" + m.toString() : m.toString());
    }

    function toNumber(record: TimeRecord): number {
        if (record.date != null) {
            if (record.from != null) {
                return dayjs(record.date + record.from, dateFormat + timeFormat).unix();
            } else {
                return dayjs(record.date, dateFormat).add(1, "day").unix();
            }
        } else if (record.from != null) {
            return dayjs("9999-12-31" + record.from, dateFormat + timeFormat).unix();
        } else {
            return 0;
        }
    }

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "From",
            dataIndex: "from",
        },
        {
            title: "To",
            dataIndex: "to",
        },
        {
            title: "Time",
            dataIndex: "time",
        },
        {
            title: "Task",
            dataIndex: "task",
        },
    ];

    return <Table columns={columns} dataSource={sortedRecordsDataSource} pagination={false}></Table>;
}
