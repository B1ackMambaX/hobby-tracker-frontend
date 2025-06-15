import {ReactNode} from "react";
import {ActivePage} from "@/components/navBar/navBar.props.ts";

interface PageLayoutProps {
    children?: ReactNode;
    activePage: ActivePage;
    headingText?: string;
}

export default PageLayoutProps;