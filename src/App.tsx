import LoginPage from "@/pages/LoginPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import RegisterPage from "@/pages/RegisterPage.tsx";
import MainPage from "@/pages/MainPage.tsx";
import TripPage from "@/pages/TripPage.tsx";
import PrivateRoute from "@/components/privateRoute/PrivateRoute.tsx";
import AuthRoute from "@/components/authRoute/AuthRoute.tsx";
import TemplatesPage from "@/pages/TemplatesPage.tsx";
import ProfilePage from "@/pages/profilePage/ProfilePage.tsx";

const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path={"/"} element={<MainPage/>}/>
                <Route path="/trip/:id" element={<TripPage/>}/>
                <Route path="/ideas" element={<TemplatesPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
            </Route>
            <Route element={<AuthRoute/>}>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<RegisterPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>;
}

export default App;