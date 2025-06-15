import PageLayout from "@/components/ui/pageLayout/PageLayout.tsx";
import {ActivePage} from "@/components/navBar/navBar.props.ts";
import Layout from "@/components/ui/layout/Layout.tsx";
import {RootState} from "@/store";
import {useSelector} from "react-redux";
import {Button} from "@chakra-ui/react";
import styles from './profilePage.module.scss';
import {useLogoutUserMutation} from "@/api/authApi.ts";

const ProfilePage = () => {
    const {user} = useSelector((state: RootState) => state.authReducer);
    const [logout] = useLogoutUserMutation();

    return <Layout>
        <PageLayout
            activePage={ActivePage.PROFILE}
            headingText={user ? `Привет, ${user.name}` : 'Произошла ошибка...'}
        >
            <Button onClick={() => logout()} colorPalette="red" variant="surface" size="2xl"
                    className={styles.button}>Выйти</Button>
        </PageLayout>
    </Layout>
}

export default ProfilePage;