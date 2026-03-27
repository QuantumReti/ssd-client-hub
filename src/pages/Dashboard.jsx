import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddClientModal from './AddClientModal'

export default function Dashboard() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const navigate = useNavigate()

  const fetchClients = async () => {
    try {
      const r = await fetch('/api/clients')
      const d = await r.json()
      setClients(d.clients || [])
    } catch(e) { setClients([]) }
    setLoading(false)
  }

  useEffect(() => { fetchClients() }, [])

  return (
    <div style={{padding:32}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:32}}>
        <div>
          <h1 style={{fontSize:28,fontWeight:700,color:'#0e1b2e',margin:0}}>Clients</h1>
          <p style={{color:'#6b6560',margin:'4px 0 0'}}>Sun State Digital — {clients.length} active clients</p>
        </div>
        <button onClick={()=>setShowAdd(true)} style={{background:'#b5976b',color:'#fff',border:'none',borderRadius:8,padding:'10px 20px',fontWeight:600,cursor:'pointer',fontSize:14}}>+ Add Client</button>
      </div>

      {loading ? (
        <div style={{textAlign:'center',padding:64,color:'#6b6560'}}>Loading clients...</div>
      ) : clients.length === 0 ? (
        <div style={{textAlign:'center',padding:64,background:'#fff',borderRadius:12,border:'1px solid #e8e2da'}}>
          <div style={{fontSize:48,marginBottom:16}}>🏢</div>
          <h3 style={{color:'#0e1b2e',margin:'0 0 8px'}}>No clients yet</h3>
          <p style={{color:'#6b6560',margin:'0 0 24px'}}>Add your first client to get started</p>
          <button onClick={()=>setShowAdd(true)} style={{background:'#b5976b',color:'#fff',border:'none',borderRadius:8,padding:'10px 20px',fontWeight:600,cursor:'pointer'}}>Add Client</button>
        </div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:20}}>
          {clients.map(c => (
            <div key={c.id} onClick={()=>navigate(`/client/${c.id}`)} style={{background:'#fff',borderRadius:12,border:'1px solid #e8e2da',padding:24,cursor:'pointer',transition:'box-shadow 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.1)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <div style={{width:44,height:44,borderRadius:10,background:c.color||'#0e1b2e',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:18}}>
                  {c.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div style={{fontWeight:700,color:'#0e1b2e',fontSize:16}}>{c.name}</div>
                  <div style={{fontSize:13,color:'#6b6560'}}>{c.industry||'No industry set'}</div>
                </div>
              </div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {(c.services||[]).map(s=>(
                  <span key={s} style={{background:'#f5f3ef',color:'#6b6560',borderRadius:20,padding:'3px 10px',fontSize:12}}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && <AddClientModal onClose={()=>setShowAdd(false)} onSaved={()=>{fetchClients();setShowAdd(false)}} />}
    </div>
  )
}
