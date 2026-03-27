import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DataTabs from '../components/tabs/DataTabs'

export default function ClientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/clients?id=${id}`)
      .then(r => r.json())
      .then(d => { setClient(d.client); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <div style={{padding:32,color:'#6b6560'}}>Loading...</div>
  if (!client) return <div style={{padding:32}}>Client not found. <button onClick={()=>navigate('/')}>Back</button></div>

  return (
    <div style={{padding:32}}>
      <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:32}}>
        <button onClick={()=>navigate('/')} style={{background:'none',border:'1px solid #e8e2da',borderRadius:8,padding:'8px 16px',cursor:'pointer',color:'#6b6560',fontSize:14}}>← Back</button>
        <div style={{width:48,height:48,borderRadius:12,background:client.color||'#0e1b2e',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:20}}>
          {client.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h1 style={{fontSize:24,fontWeight:700,color:'#0e1b2e',margin:0}}>{client.name}</h1>
          <p style={{color:'#6b6560',margin:'2px 0 0',fontSize:14}}>{client.industry||'No industry set'}</p>
        </div>
      </div>
      <DataTabs client={client} />
    </div>
  )
}
