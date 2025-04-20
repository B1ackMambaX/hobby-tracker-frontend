import LoginPage from "@/pages/LoginPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import RegisterPage from "@/pages/RegisterPage.tsx";

const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<h1>Привет!</h1>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<RegisterPage/>}/>
        </Routes>
    </BrowserRouter>;
}

export default App;