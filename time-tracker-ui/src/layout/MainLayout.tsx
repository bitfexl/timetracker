import { ReactNode } from "react";
import { ChildrenProps } from "../util/Props";
import { Divider } from "antd";

export interface MainLayoutProps extends ChildrenProps {
    header?: ReactNode;
    footer?: ReactNode;
}

export function MainLayout({ header = null, children = null, footer = null }: MainLayoutProps) {
    return (
        <div className="pt-10 flex gap-20 justify-between flex-col max-w-screen-lg ml-4 mr-4 md:ml-10 md:mr-10 lg:ml-20 lg:mr-20 xl:ml-40 xl:mr-40 min-h-screen">
            <div className="flex flex-col gap-10">
                <header>{header}</header>
                <main>{children}</main>
            </div>

            <footer className="pb-10">
                <Divider></Divider>
                {footer}
            </footer>
        </div>
    );
}
