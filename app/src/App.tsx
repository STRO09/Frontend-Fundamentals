import {BrowserRouter, Routes, Route} from 'react-router'
import VirtualizedPage from './pages/VirtualizedList'
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<VirtualizedPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
