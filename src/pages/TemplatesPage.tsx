import Layout from "@/components/ui/layout/Layout.tsx";
import PageLayout from "@/components/ui/pageLayout/PageLayout.tsx";
import {ActivePage} from "@/components/navBar/navBar.props.ts";
import TemplatesList from "@/components/templatesList/TemplatesList.tsx";

const TemplatesPage = () => {
    return <Layout>
        <PageLayout activePage={ActivePage.IDEAS} headingText="Идеи">
            <TemplatesList/>
        </PageLayout>
    </Layout>
}

export default TemplatesPage;