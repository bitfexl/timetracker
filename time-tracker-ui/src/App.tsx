import { useState } from "react";
import { Button, DatePicker, TimePicker } from "antd";
import { DateTimePicker } from "./interaction/DateTimePicker";
import { CreateTimeRecordLayout } from "./layout/CreateTimeRecordLayout";
import TextArea from "antd/es/input/TextArea";

function App() {
    const [count, setCount] = useState(1);
    const [dateTime, setDateTime] = useState<{ date: string | null; from: string | null; to: string | null }>({
        date: null,
        from: null,
        to: null,
    });

    return (
        <div className="inline-flex flex-col gap-2">
            <Button type="primary" onClick={() => setCount((c) => c + 1)}>
                {count}
            </Button>

            <DateTimePicker
                onChange={(date, from, to) => {
                    setDateTime({ date, from, to });
                    console.log({ date, from, to });
                }}
                dateValue={dateTime.date}
                fromValue={dateTime.from}
                toValue={dateTime.to}
            ></DateTimePicker>

            <br />

            <CreateTimeRecordLayout
                datePicker={<DatePicker style={{ width: 155 }}></DatePicker>}
                fromPicker={<TimePicker placeholder="End time" style={{ width: 155 }}></TimePicker>}
                toPicker={<TimePicker placeholder="End time" style={{ width: 155 }}></TimePicker>}
                taskText={<TextArea rows={5} cols={40}></TextArea>}
                createButton={<Button type="primary">Create</Button>}
            ></CreateTimeRecordLayout>
        </div>
    );
}

export default App;
