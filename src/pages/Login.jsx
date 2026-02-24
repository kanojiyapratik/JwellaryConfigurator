import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const nav = useNavigate()
  const submit = async (e)=>{
    e.preventDefault()
    try{
      const r = await axios.post('/api/auth/login',{ email, password })
      localStorage.setItem('token', r.data.token)
      nav('/')
    }catch(err){ alert('Login failed') }
  }
  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border p-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-black text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}
