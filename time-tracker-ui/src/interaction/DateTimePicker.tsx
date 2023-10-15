import { DatePicker, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

export interface DateTimePickerProps {
    onChange: (date: string | null, from: string | null, to: string | null) => any;
    dateValue: string | null;
    fromValue: string | null;
    toValue: string | null;
}

export function DateTimePicker({ onChange, dateValue, fromValue, toValue }: DateTimePickerProps) {
    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "HH:mm";

    function handleChangeDate(date: Dayjs | null) {
        onChange(date?.format(dateFormat) ?? null, fromValue, toValue);
    }

    function handleChangeTime(values: [Dayjs, Dayjs] | null) {
        if (values != null) {
            const [from, to] = values;
            onChange(dateValue, from.format(timeFormat), to.format(timeFormat));
        } else {
            onChange(dateValue, null, null);
        }
    }

    return (
        <div className="inline-flex flex-row gap-2">
            <DatePicker format={dateFormat} onChange={(value) => handleChangeDate(value)}></DatePicker>

            <TimePicker.RangePicker
                format={timeFormat}
                defaultValue={[
                    fromValue == null ? null : dayjs(fromValue, timeFormat),
                    toValue == null ? null : dayjs(toValue, timeFormat),
                ]}
                minuteStep={5}
                onChange={(values) => handleChangeTime(values as any)}
            ></TimePicker.RangePicker>
        </div>
    );
}
