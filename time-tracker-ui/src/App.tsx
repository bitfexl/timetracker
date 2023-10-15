import { useState } from "react";
import { Button } from "antd";
import { CreateTimeRecord } from "./interaction/CreateTimeRecord";
import { TimeRecord } from "./types/TimeRecord";

function App() {
    const [count, setCount] = useState(1);
    const [timeRecord, setTimeRecord] = useState<TimeRecord>({
        date: null,
        from: null,
        to: null,
        task: null,
    });

    return (
        <div className="inline-flex flex-col gap-2">
            <Button type="primary" onClick={() => setCount((c) => c + 1)}>
                {count}
            </Button>

            <CreateTimeRecord
                value={timeRecord}
                onChange={(timeRecord) => {
                    console.table(timeRecord);
                    setTimeRecord(timeRecord);
                }}
            ></CreateTimeRecord>
        </div>
    );
}

export default App;
