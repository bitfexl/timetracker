import { Button, DatePicker, TimePicker } from "antd";
import { CreateTimeRecordLayout } from "../layout/CreateTimeRecordLayout";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { TimeRecord } from "../types/TimeRecord";

export interface CreateTimeRecordProps {
    onChange: (timeRecord: TimeRecord) => any;
    value: TimeRecord;
}

export function CreateTimeRecord({ onChange, value }: CreateTimeRecordProps) {
    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "HH:mm";

    function handleChangeDate(date: Dayjs | null) {
        onChange({ ...value, date: date?.format(dateFormat) ?? null });
    }

    function handleChangeFrom(from: Dayjs | null) {
        onChange({ ...value, from: from?.format(timeFormat) ?? null });
    }

    function handleChangeTo(to: Dayjs | null) {
        onChange({ ...value, to: to?.format(timeFormat) ?? null });
    }

    function handleChangeTask(task: string | null) {
        onChange({ ...value, task });
    }

    return (
        <CreateTimeRecordLayout
            datePicker={
                <DatePicker
                    format={dateFormat}
                    defaultValue={value.date == null ? undefined : dayjs(value.date, dateFormat)}
                    onChange={handleChangeDate}
                    style={{ width: 155 }}
                ></DatePicker>
            }
            fromPicker={
                <TimePicker
                    format={timeFormat}
                    defaultValue={value.from == null ? undefined : dayjs(value.from, timeFormat)}
                    onChange={handleChangeFrom}
                    placeholder="End time"
                    style={{ width: 155 }}
                ></TimePicker>
            }
            toPicker={
                <TimePicker
                    format={timeFormat}
                    defaultValue={value.to == null ? undefined : dayjs(value.to, timeFormat)}
                    onChange={handleChangeTo}
                    placeholder="End time"
                    style={{ width: 155 }}
                ></TimePicker>
            }
            taskText={
                <TextArea
                    rows={5}
                    cols={40}
                    defaultValue={value.task ?? undefined}
                    onChange={(e) => handleChangeTask(e.target.value)}
                ></TextArea>
            }
            createButton={<Button type="primary">Create</Button>}
        ></CreateTimeRecordLayout>
    );
}
