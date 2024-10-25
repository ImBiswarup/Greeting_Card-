import Header from './components/Header'
import FormCard from './components/FormCard'
import { Routes, Route } from 'react-router-dom'
import GreetingCard from './components/GreetingCard'
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<FormCard />} />
        <Route path='/:id' element={<GreetingCard />} />
      </Routes>
    </>
  )
}

export default App
