import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import About from './Pages/About';
import Home from './Pages/Home';

function App() {
  const [activeNavItemIndex, setActiveNavItemIndex] = useState(0)

  const navbarItemList = [
    {title: '首页', component: <Home /> },
    {title: '关于', component: <About /> },
  ]

  const handleClick = (index) => {
    setActiveNavItemIndex(index)
  }


  return (
    <div className='appWrapper'>
      <div className='navbar'>
        {navbarItemList.map((item, index) => {
          return (
            <div 
              className='navbarItem' 
              key={item.title} 
              onClick={() => handleClick(index)}
            >
              {item.title}
            </div>
          )
        })}
      </div>

      <div className='content'>
        {navbarItemList[activeNavItemIndex].component}
      </div>
    </div>
  )
}

export default App
