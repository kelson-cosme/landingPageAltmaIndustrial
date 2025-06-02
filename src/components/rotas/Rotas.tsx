import { Route, Routes } from "react-router"
import Home from "../pages/Home"
import Teste from "../pages/Teste"

function Rotas(){

    return(
        <>      
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/teste" element={<Teste/>} />

            </Routes>
            
        </>
    )

}

export default Rotas