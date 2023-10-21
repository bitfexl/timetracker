import { ReactNode, useRef, useState } from "react";
import { CompleteTimeRecord } from "../types/TimeRecord";
import { TimeRecordTable } from "../components/TimeRecordTable";
import { Button } from "antd";
import { printElement } from "../util/Print";
import { flushSync } from "react-dom";
import { TimeRecordEditor } from "../components/TimeRecordEditor";

export interface RecordsUpdateEvent {
    /**
     * The type of update.
     */
    type: "add" | "edit" | "delete";

    /**
     * The affected record.
     */
    record: CompleteTimeRecord;

    /**
     * The old records with the update applied (record added, removed or changed).
     */
    records: CompleteTimeRecord[];
}

export interface TrackingPageProps {
    records: CompleteTimeRecord[];
    onUpdate: (event: RecordsUpdateEvent) => any;
    printHeader: ReactNode;
    printFooter: ReactNode;
}

export function TrackingPage({ records, onUpdate, printHeader, printFooter }: TrackingPageProps) {
    const printDivRef = useRef<HTMLDivElement>(null);
    const [renderPrintMode, setRenderPrintMode] = useState(false);

    const [editRecord, setEditRecord] = useState<CompleteTimeRecord | null>(null);

    function handleCreate(record: CompleteTimeRecord) {
        onUpdate({
            type: "add",
            record,
            records: [...records, record],
        });
    }

    function handleDelete(deletedRecord: CompleteTimeRecord) {
        onUpdate({
            type: "delete",
            record: deletedRecord,
            records: records.filter((record) => !Object.is(record, deletedRecord)),
        });
    }

    function handleEdit(record: CompleteTimeRecord, unchangedRecords: CompleteTimeRecord[]) {
        onUpdate({
            type: "edit",
            record,
            records: [...unchangedRecords, record],
        });

        setEditRecord(null);
    }

    function doPrint() {
        flushSync(async () => {
            setRenderPrintMode(true);
            await printElement(printDivRef.current!);
            setRenderPrintMode(false);
        });
    }

    return (
        <div className="inline-flex flex-col gap-2">
            <TimeRecordEditor records={records} onCreate={handleCreate} onEdit={handleEdit} editRecord={editRecord}></TimeRecordEditor>

            <br />

            <div ref={printDivRef}>
                {renderPrintMode && printHeader}

                <TimeRecordTable
                    onDelete={handleDelete}
                    onEdit={setEditRecord}
                    records={records}
                    renderAction={!renderPrintMode}
                ></TimeRecordTable>

                {renderPrintMode && printFooter}
            </div>

            <br />

            <Button onClick={doPrint}>Print</Button>
        </div>
    );
}
