import { useState } from 'react'
import LoginComponent from './components/LoginComponent'
import SigninComponent from './components/SigninComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SigninComponent />
    </>
  )
}

export default App
