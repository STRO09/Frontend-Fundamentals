import {BrowserRouter, Routes, Route} from 'react-router'
import VirtualizedPage from './pages/VirtualizedList'
import BloomFilterPage from './pages/BloomFilter'
import './App.css'

const AppElement =()=> { 
  return (
    <div>
      <h2>Practicing and Implementing Frontend fundamentals while exploring Pages router in react ts ig</h2>
    </div>
  )
}

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<AppElement/>}/>
      <Route path ='/virtualization' element={<VirtualizedPage/>} />
      <Route path ='/bloom' element={<BloomFilterPage/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
