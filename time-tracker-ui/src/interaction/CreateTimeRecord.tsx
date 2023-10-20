import { Button, DatePicker, TimePicker } from "antd";
import { CreateTimeRecordLayout } from "../layout/CreateTimeRecordLayout";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { TimeRecord } from "../types/TimeRecord";

export interface CreateTimeRecordProps {
    onChange: (timeRecord: TimeRecord) => any;
    value: TimeRecord;
    onCreate: () => any;
    editMode: boolean;
}

export function CreateTimeRecord({ editMode, onChange, value, onCreate }: CreateTimeRecordProps) {
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
            title={`${editMode ? "Edit" : "Create"} Time Record`}
            datePicker={
                <DatePicker
                    format={dateFormat}
                    value={value.date == null ? undefined : dayjs(value.date, dateFormat)}
                    onChange={handleChangeDate}
                    style={{ width: 155 }}
                ></DatePicker>
            }
            fromPicker={
                <TimePicker
                    format={timeFormat}
                    value={value.from == null ? undefined : dayjs(value.from, timeFormat)}
                    onChange={handleChangeFrom}
                    minuteStep={5}
                    placeholder="Start time"
                    style={{ width: 155 }}
                ></TimePicker>
            }
            toPicker={
                <TimePicker
                    format={timeFormat}
                    value={value.to == null ? undefined : dayjs(value.to, timeFormat)}
                    onChange={handleChangeTo}
                    minuteStep={5}
                    placeholder="End time"
                    style={{ width: 155 }}
                ></TimePicker>
            }
            taskText={
                <TextArea
                    rows={5}
                    cols={40}
                    value={value.task ?? undefined}
                    placeholder="Enter the worked on task"
                    onChange={(e) => handleChangeTask(e.target.value)}
                ></TextArea>
            }
            createButton={
                <Button type="primary" onClick={onCreate}>
                    {`${editMode ? "Save" : "Create"}`}
                </Button>
            }
        ></CreateTimeRecordLayout>
    );
}
