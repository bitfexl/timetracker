import { useRef, useState } from "react";
import { CreateTimeRecord } from "./interaction/CreateTimeRecord";
import { CompleteTimeRecord, TimeRecord, toCompleteRecord } from "./types/TimeRecord";
import { TimeRecordTable } from "./components/TimeRecordTable";
import { Button, Modal } from "antd";
import { useLocalStorage } from "./util/LocalStorageHook";
import { printElement } from "./util/Print";
import { flushSync } from "react-dom";

const emptyTimeRecord = {
    date: null,
    from: null,
    to: null,
    task: null,
};

function App() {
    const printDivRef = useRef<HTMLDivElement>(null);
    const [renderPrintMode, setRenderPrintMode] = useState(false);

    const [timeRecords, setTimeRecords] = useLocalStorage<CompleteTimeRecord[]>("timerecords", []);

    const [timeRecord, setTimeRecord] = useState<TimeRecord>(emptyTimeRecord);

    const [editRecordKey, setEditRecordKey] = useState<number | null>(null);

    function handleCreate() {
        const errorTitle = "Error creating record";

        if (timeRecord.from == timeRecord.to || [timeRecord.from, timeRecord.to].sort()[0] != timeRecord.from) {
            Modal.error({
                title: errorTitle,
                content: "Start and end time needs to be different and start time needs to be smaller than end time.",
            });
            return;
        }

        const newRecord = toCompleteRecord(timeRecord);

        if (timeRecords.filter((r) => r.key == newRecord.key).length != 0) {
            Modal.error({
                title: errorTitle,
                content: "Record with the same start date and time already exists.",
            });
            return;
        }

        setTimeRecords((records) => [...records, newRecord]);
        setTimeRecord(emptyTimeRecord);
    }

    function handleEdit(record: CompleteTimeRecord) {
        setEditRecordKey(record.key);
        setTimeRecord(record);
    }

    function handleEditConfirm() {
        const oldRecords = timeRecords.filter((r) => r.key != editRecordKey);

        const newRecord = toCompleteRecord(timeRecord);

        if (oldRecords.filter((r) => r.key == newRecord.key).length != 0) {
            Modal.error({
                title: "Error editing record",
                content: "Record with the same start date and time already exists.",
            });
            return;
        } else {
            setTimeRecords([...oldRecords, newRecord]);
            setTimeRecord(emptyTimeRecord);
            setEditRecordKey(null);
        }
    }

    function handleDelete(deletedRecord: CompleteTimeRecord) {
        setTimeRecords((records) => records.filter((record) => !Object.is(record, deletedRecord)));
    }

    function doPrint() {
        flushSync(async () => {
            setRenderPrintMode(true);
            await printElement(printDivRef.current!);
            setRenderPrintMode(false);
        });
    }

    return (
        <div className="inline-flex flex-col gap-2 ml-40 mr-40">
            <CreateTimeRecord
                value={timeRecord}
                onChange={(timeRecord) => {
                    console.table(timeRecord);
                    setTimeRecord(timeRecord);
                }}
                onCreate={editRecordKey == null ? handleCreate : handleEditConfirm}
                editMode={editRecordKey != null}
            ></CreateTimeRecord>

            <br />

            <div ref={printDivRef} className="print-me">
                <h1 className="print-only">Time Records</h1>
                <TimeRecordTable
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    records={timeRecords}
                    renderAction={!renderPrintMode}
                ></TimeRecordTable>
            </div>

            <br />

            <Button onClick={doPrint}>Print</Button>
        </div>
    );
}

export default App;
