import {useSelector} from "react-redux";
import {RootState} from "@/store";
import Layout from "@/components/ui/layout/Layout.tsx";
import PageLayout from "@/components/ui/pageLayout/PageLayout.tsx";
import {ActivePage} from "@/components/navBar/navBar.props.ts";
import WelcomeGuide from "@/components/welcomeGuide/WelcomeGuide.tsx";
import {useRefreshTokenQuery} from "@/api/authApi.ts";
import {Spinner} from "@chakra-ui/react";
import RemaindersList from "@/components/remaindersList/RemaindersList.tsx";

const HomePage = () => {
    const {user} = useSelector((state: RootState) => state.authReducer);
    const {isLoading, isError} = useRefreshTokenQuery();

    const getPageContent = () => {
        if (isError) {
            localStorage.removeItem('accessToken');
            return <WelcomeGuide/>;
        }

        return <RemaindersList/>
    }

    return <Layout>
        {isLoading ? <Spinner/> : <PageLayout
            activePage={ActivePage.HOME}
            headingText={user ? `Привет, ${user.name}` : 'TravelTracker'}
        >
            {getPageContent()}
        </PageLayout>}
    </Layout>
}

export default HomePage;