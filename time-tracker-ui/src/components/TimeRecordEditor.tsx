import { useEffect, useState } from "react";
import { TimeRecordInput } from "../interaction/TimeRecordInput";
import { CompleteTimeRecord, TimeRecord, toCompleteRecord } from "../types/TimeRecord";
import { Modal } from "antd";

const emptyTimeRecord = {
    date: null,
    from: null,
    to: null,
    task: null,
};

export interface TimeRecordEditorProps {
    records: CompleteTimeRecord[];
    editRecord: CompleteTimeRecord | null;
    onCreate: (record: CompleteTimeRecord) => any;
    onEdit: (editedRecord: CompleteTimeRecord, unchangedRecords: CompleteTimeRecord[]) => any;
}

export function TimeRecordEditor({ records, editRecord, onCreate, onEdit }: TimeRecordEditorProps) {
    const [timeRecord, setTimeRecord] = useState<TimeRecord>(emptyTimeRecord);
    useEffect(() => {
        if (editRecord != null) {
            setTimeRecord(editRecord);
        }
    }, [editRecord]);

    function handleCreate() {
        let oldRecords = records;
        if (editRecord != null) {
            oldRecords = records.filter((r) => r.key != editRecord?.key);
        }

        const newRecord = checkInput(timeRecord, oldRecords);

        if (newRecord) {
            if (editRecord == null) {
                onCreate(newRecord);
            } else {
                onEdit(newRecord, oldRecords);
            }

            setTimeRecord(emptyTimeRecord);
        }
    }

    function checkInput(record: TimeRecord, existing: CompleteTimeRecord[]) {
        if (record.from == record.to || [record.from, record.to].sort()[0] != record.from) {
            Modal.error({
                title: "Invalid Input",
                content: "Start and end time needs to be different and start time needs to be smaller than end time.",
            });
            return false;
        }

        const newRecord = toCompleteRecord(timeRecord);

        if (existing.filter((r) => r.key == newRecord.key).length != 0) {
            Modal.error({
                title: "Error adding record",
                content: "Record with the same start date and time already exists.",
            });
            return;
        }

        return newRecord;
    }

    return (
        <TimeRecordInput
            onCreate={handleCreate}
            editMode={editRecord != null}
            value={timeRecord}
            onChange={setTimeRecord}
        ></TimeRecordInput>
    );
}
