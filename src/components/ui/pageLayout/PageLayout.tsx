import styles from "./pageLayout.module.scss";
import NavBar from "@/components/navBar/NavBar.tsx";
import Logo from "@/components/ui/logo/Logo.tsx";
import PageLayoutProps from "@/components/ui/pageLayout/pageLayout.props.ts";

const PageLayout = ({activePage, headingText, children}: PageLayoutProps) => {
    return <section className={styles.wrapper}>
        <NavBar activePage={activePage}/>
        <Logo className={styles.logo} color={'var(--green)'}/>
        <h1 className={styles.heading}>{headingText}</h1>
        {children}
    </section>
}

export default PageLayout;