export enum ActivePage {
    HOME,
    TRIPS,
    IDEAS,
    PROFILE
}

interface NavBarProps {
    activePage: ActivePage;
}

export default NavBarProps;