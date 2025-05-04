import LoginPage from "@/pages/LoginPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import RegisterPage from "@/pages/RegisterPage.tsx";
import MainPage from "@/pages/MainPage.tsx";
import TripPage from "@/pages/TripPage.tsx";
import PrivateRoute from "@/components/privateRoute/PrivateRoute.tsx";
import AuthRoute from "@/components/authRoute/AuthRoute.tsx";

const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path={"/"} element={<MainPage/>}/>
                <Route path="/trip/:id" element={<TripPage/>}/>
            </Route>
            <Route element={<AuthRoute/>}>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<RegisterPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>;
}

export default App;