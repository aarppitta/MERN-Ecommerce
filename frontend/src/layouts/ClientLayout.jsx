import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const ClientLayout = () => {
  return (
    <div>
      <Navbar />
      <div className='p-6 bg-gray-50 min-h-screen'>
        <Outlet/>
      </div>
    </div>
  )
}

export default ClientLayout
