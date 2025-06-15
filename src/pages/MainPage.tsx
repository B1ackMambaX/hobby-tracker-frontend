import Layout from "@/components/ui/layout/Layout.tsx";
import TripsList from "@/components/tripsList/TripsList.tsx";
import PageLayout from "@/components/ui/pageLayout/PageLayout.tsx";
import {ActivePage} from "@/components/navBar/navBar.props.ts";

const MainPage = () => {
    return <Layout>
        <PageLayout activePage={ActivePage.HOME} headingText="Мои путешествия">
            <TripsList/>
        </PageLayout>
    </Layout>
}

export default MainPage