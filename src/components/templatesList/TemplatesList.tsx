import styles from "./templatesList.module.scss";
import NavBar from "@/components/navBar/NavBar.tsx";
import {ActivePage} from "@/components/navBar/navBar.props.ts";
import Logo from "@/components/logo/Logo.tsx";
import {useGetTemplatesQuery} from "@/api/tripTemplateApi.ts";
import TripIdea from "@/components/tripIdea/TripIdea.tsx";
import Spinner from "@/components/spinner/Spinner.tsx";
import {VStack} from "@chakra-ui/react";

const TemplatesList = () => {
    const {data: templates, isLoading} = useGetTemplatesQuery();

    const processIdeas = () => {
        if (templates && templates.length > 0) {
            return templates.map((template) => (
                <TripIdea key={template._id!} {...template}/>))
        } else {
            return <p>Пока что нет шаблонов</p>;
        }
    }

    return <section className={styles.wrapper}>
        <NavBar activePage={ActivePage.IDEAS}/>
        <Logo className={styles.logo} color={'var(--green)'}/>
        <h1 className={styles.heading}>Идеи для путешествий</h1>
        <VStack className={styles.list} gap={'0.75rem'}>
            {isLoading ? <Spinner/> : processIdeas()}
        </VStack>
    </section>
}

export default TemplatesList;