import { useRef, useState } from "react";
import { CreateTimeRecord } from "./interaction/CreateTimeRecord";
import { TimeRecord } from "./types/TimeRecord";
import { TimeRecordTable } from "./components/TimeRecordTable";
import { Button } from "antd";
import { useLocalStorage } from "./util/LocalStorageHook";
import { printElement } from "./util/Print";
import { flushSync } from "react-dom";

function App() {
    const printDivRef = useRef<HTMLDivElement>(null);
    const [renderPrintMode, setRenderPrintMode] = useState(false);

    const [timeRecords, setTimeRecords] = useLocalStorage<TimeRecord[]>("timerecords", []);

    const [timeRecord, setTimeRecord] = useState<TimeRecord>({
        date: null,
        from: null,
        to: null,
        task: null,
    });

    function handleCreate() {
        if (timeRecord.from == timeRecord.to || [timeRecord.from, timeRecord.to].sort()[0] != timeRecord.from) {
            alert("Start and end time needs to be different and start time needs to be smaller than end time.");
            return;
        }

        setTimeRecords((records) => [...records, timeRecord]);
        setTimeRecord({
            date: null,
            from: null,
            to: null,
            task: null,
        });
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
                onCreate={handleCreate}
            ></CreateTimeRecord>

            <br />

            <div ref={printDivRef} className="print-me">
                <h1 className="print-only">Time Records</h1>
                <TimeRecordTable records={timeRecords} renderAction={!renderPrintMode}></TimeRecordTable>
            </div>

            <br />

            <Button onClick={doPrint}>Print</Button>
        </div>
    );
}

export default App;
