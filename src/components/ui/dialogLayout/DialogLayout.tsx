import {Button, Dialog, Portal,} from "@chakra-ui/react";
import styles from "./dialogLayout.module.scss";
import DialogLayoutProps from "@/components/ui/dialogLayout/dialogLayout.props.ts";

const DialogLayout = ({
                          isOpen,
                          setIsOpen,
                          contentRef,
                          handleConfirm,
                          children,
                          heading,
                          overridingButton
                      }: DialogLayoutProps) => {
    return <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
            {overridingButton ? overridingButton : <Button className={styles.add}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M16.5 16.5V7.5H19.5V16.5H28.5V19.5H19.5V28.5H16.5V19.5H7.5V16.5H16.5Z"
                          fill="white"/>
                </svg>
            </Button>}
        </Dialog.Trigger>

        <Portal>
            <Dialog.Backdrop/>
            <Dialog.Positioner style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Dialog.Content className={styles.modal} ref={contentRef}>
                    <h3 className={styles.heading}>{heading}</h3>
                    {children}
                    <div className={styles.buttons}>
                        <Button onClick={handleConfirm} className={styles.button} size="lg">
                            Добавить
                        </Button>

                        <Button
                            onClick={() => setIsOpen(false)}
                            className={`${styles.button} ${styles.button_cancel}`}
                            size="lg"
                        >
                            Отмена
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
}

export default DialogLayout;