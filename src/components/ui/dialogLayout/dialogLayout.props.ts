import {ReactNode, RefObject} from "react";

interface DialogLayoutProps {
    isOpen: boolean;
    heading: string;
    setIsOpen: (details: unknown) => void;
    contentRef?: RefObject<HTMLDivElement | null>;
    overridingButton?: ReactNode;
    children?: ReactNode;
    handleConfirm: () => void;
}

export default DialogLayoutProps;