import { useState } from "react";
import { Button } from "antd";
import { CreateTimeRecord } from "./interaction/CreateTimeRecord";

function App() {
    const [count, setCount] = useState(1);
    const [timeRecord, setTimeRecord] = useState<{ date: string | null; from: string | null; to: string | null; task: string | null }>({
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
                dateValue={timeRecord.date}
                fromValue={timeRecord.from}
                toValue={timeRecord.to}
                taskValue={timeRecord.task}
                onChange={(date, from, to, task) => {
                    console.table({ date, from, to, task });
                    setTimeRecord({ date, from, to, task });
                }}
            ></CreateTimeRecord>
        </div>
    );
}

export default App;
