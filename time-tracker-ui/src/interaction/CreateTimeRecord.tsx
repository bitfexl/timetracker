import { Button, DatePicker, TimePicker } from "antd";
import { CreateTimeRecordLayout } from "../layout/CreateTimeRecordLayout";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";

export interface CreateTimeRecordProps {
    onChange: (date: string | null, from: string | null, to: string | null, task: string | null) => any;
    dateValue: string | null;
    fromValue: string | null;
    toValue: string | null;
    taskValue: string | null;
}

export function CreateTimeRecord({ onChange, dateValue, fromValue, toValue, taskValue }: CreateTimeRecordProps) {
    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "HH:mm";

    function handleChangeDate(date: Dayjs | null) {
        onChange(date?.format(dateFormat) ?? null, fromValue, toValue, taskValue);
    }

    function handleChangeFrom(from: Dayjs | null) {
        onChange(dateValue, from?.format(timeFormat) ?? null, toValue, taskValue);
    }

    function handleChangeTo(to: Dayjs | null) {
        onChange(dateValue, fromValue, to?.format(timeFormat) ?? null, taskValue);
    }

    function handleChangeTask(task: string | null) {
        onChange(dateValue, fromValue, toValue, task);
    }

    return (
        <CreateTimeRecordLayout
            datePicker={
                <DatePicker
                    format={dateFormat}
                    defaultValue={dateValue == null ? undefined : dayjs(dateValue, dateFormat)}
                    onChange={handleChangeDate}
                    style={{ width: 155 }}
                ></DatePicker>
            }
            fromPicker={
                <TimePicker
                    format={timeFormat}
                    defaultValue={fromValue == null ? undefined : dayjs(fromValue, timeFormat)}
                    onChange={handleChangeFrom}
                    placeholder="End time"
                    style={{ width: 155 }}
                ></TimePicker>
            }
            toPicker={
                <TimePicker
                    format={timeFormat}
                    defaultValue={toValue == null ? undefined : dayjs(toValue, timeFormat)}
                    onChange={handleChangeTo}
                    placeholder="End time"
                    style={{ width: 155 }}
                ></TimePicker>
            }
            taskText={
                <TextArea
                    rows={5}
                    cols={40}
                    defaultValue={taskValue ?? undefined}
                    onChange={(e) => handleChangeTask(e.target.value)}
                ></TextArea>
            }
            createButton={<Button type="primary">Create</Button>}
        ></CreateTimeRecordLayout>
    );
}
