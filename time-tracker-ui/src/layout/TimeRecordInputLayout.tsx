import { ReactNode } from "react";

export interface TimeRecordInputLayoutProps {
    title: string;
    datePicker: ReactNode;
    fromPicker: ReactNode;
    toPicker: ReactNode;
    taskText: ReactNode;
    createButton: ReactNode;
}

export function TimeRecordInputLayout({ title, datePicker, fromPicker, toPicker, taskText, createButton }: TimeRecordInputLayoutProps) {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <h3>{title}</h3>
            </div>

            <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <b>Date</b>

                        {datePicker}
                    </div>

                    <div className="flex flex-col gap-1">
                        <b>From</b>

                        {fromPicker}
                    </div>

                    <div className="flex flex-col gap-1">
                        <b>To</b>

                        {toPicker}
                    </div>
                </div>

                <div className="flex flex-col gap-4 relative">
                    <div className="flex flex-col gap-1">
                        <div>
                            <b>Task</b>
                        </div>

                        <div className="mb-10">{taskText}</div>
                    </div>

                    <div className="text-right absolute bottom-0 right-0">{createButton}</div>
                </div>
            </div>
        </div>
    );
}
