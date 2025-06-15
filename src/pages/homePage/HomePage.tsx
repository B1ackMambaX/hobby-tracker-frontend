import {useSelector} from "react-redux";
import {RootState} from "@/store";
import Layout from "@/components/ui/layout/Layout.tsx";
import PageLayout from "@/components/ui/pageLayout/PageLayout.tsx";
import {ActivePage} from "@/components/navBar/navBar.props.ts";
import WelcomeGuide from "@/components/welcomeGuide/WelcomeGuide.tsx";

const HomePage = () => {
    const {user} = useSelector((state: RootState) => state.authReducer);

    return <Layout>
        <PageLayout
            activePage={ActivePage.HOME}
            headingText={user ? `Привет, ${user.name}` : 'TravelTracker'}
        >
            <WelcomeGuide/>
        </PageLayout>
    </Layout>
}

export default HomePage;