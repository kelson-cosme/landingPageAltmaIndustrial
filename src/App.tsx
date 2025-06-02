
import './index.css'
import { BrowserRouter } from 'react-router'
import Rotas from './components/rotas/Rotas'

function App() {

  return (  
    <div className="relative w-full   m-auto ">
      <BrowserRouter>
        <Rotas/>
      </BrowserRouter>
    </div>
  )
}

export default App

