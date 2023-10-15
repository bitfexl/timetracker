import { useState } from "react";
import { CreateTimeRecord } from "./interaction/CreateTimeRecord";
import { TimeRecord } from "./types/TimeRecord";
import { TimeRecordTable } from "./components/TimeRecordTable";
import { Button } from "antd";

function App() {
    const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([]);
    const [timeRecord, setTimeRecord] = useState<TimeRecord>({
        date: null,
        from: null,
        to: null,
        task: null,
    });

    function handleCreate() {
        setTimeRecords((records) => [...records, timeRecord]);
        setTimeRecord({
            date: null,
            from: null,
            to: null,
            task: null,
        });
    }

    return (
        <div className="inline-flex flex-col gap-2 ml-80">
            <CreateTimeRecord
                value={timeRecord}
                onChange={(timeRecord) => {
                    console.table(timeRecord);
                    setTimeRecord(timeRecord);
                }}
                onCreate={handleCreate}
            ></CreateTimeRecord>

            <br />

            <div className="print-me">
                <h1 className="print-only">Time Records</h1>
                <TimeRecordTable records={timeRecords}></TimeRecordTable>
            </div>

            <br />

            <Button onClick={window.print}>Print</Button>
        </div>
    );
}

export default App;
