import { useRef, useState } from "react";
import { CompleteTimeRecord } from "../types/TimeRecord";
import { TimeRecordTable } from "../components/TimeRecordTable";
import { Button } from "antd";
import { useLocalStorage } from "../util/LocalStorageHook";
import { printElement } from "../util/Print";
import { flushSync } from "react-dom";
import { TimeRecordEditor } from "../components/TimeRecordEditor";

export function ProjectPage() {
    const printDivRef = useRef<HTMLDivElement>(null);
    const [renderPrintMode, setRenderPrintMode] = useState(false);

    const [timeRecords, setTimeRecords] = useLocalStorage<CompleteTimeRecord[]>("timerecords", []);
    const [editRecord, setEditRecord] = useState<CompleteTimeRecord | null>(null);

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
            <TimeRecordEditor
                records={timeRecords}
                onCreate={(r) => setTimeRecords((records) => [...records, r])}
                onEdit={(r, records) => {
                    setTimeRecords([...records, r]);
                    setEditRecord(null);
                }}
                editRecord={editRecord}
            ></TimeRecordEditor>

            <br />

            <div ref={printDivRef} className="print-me">
                <h1 className="print-only">Time Records</h1>
                <TimeRecordTable
                    onDelete={handleDelete}
                    onEdit={setEditRecord}
                    records={timeRecords}
                    renderAction={!renderPrintMode}
                ></TimeRecordTable>
            </div>

            <br />

            <Button onClick={doPrint}>Print</Button>
        </div>
    );
}
