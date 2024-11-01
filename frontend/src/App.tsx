
import './index.css'
import { Form } from '../components/Form'
import { Customers } from '../components/Customers'
import { api } from './services/api'
import { useEffect, useState } from 'react'

type Customers = {
  id: string,
  name: string,
  email: string,
  status: boolean,
  created_at: string,
  updated_at: string
}

export default function App() {

  const [customers, setCustomers] = useState<Customers[]>([])

  useEffect(() => {
    loadCustomers();
  }, [])

  async function loadCustomers() {
    const response = await api.get("/customers")
    setCustomers(response.data)
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center px-4 flex-col">
      <main className="my-10 w-full md: max-w-2xl">
        <Form/>
        <Customers customersProps={customers}/>
      </main>
    </div>
  )
}


