import LayoutProps from "@/components/layout/layout.props.ts";
import styles from "./layout.module.scss";

const Layout = ({children}: LayoutProps) => {
    return <main className={styles.layout}>
        {children}
    </main>
}

export default Layout;