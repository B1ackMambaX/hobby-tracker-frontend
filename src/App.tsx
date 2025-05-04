import LoginPage from "@/pages/LoginPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import RegisterPage from "@/pages/RegisterPage.tsx";
import MainPage from "@/pages/MainPage.tsx";
import TripPage from "@/pages/TripPage.tsx";

const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<MainPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<RegisterPage/>}/>
            <Route path="/trip" element={<TripPage/>}/>
        </Routes>
    </BrowserRouter>;
}

export default App;