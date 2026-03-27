import { useState } from 'react'

const PASSWORD = 'ssd2026'

export default function Login({ onLogin, users }) {
  const [email, setEmail] = useState(users[0])
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const handle = (e) => {
    e.preventDefault()
    if (pass === PASSWORD) onLogin(email)
    else setError('Incorrect password')
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0e1b2e'}}>
      <div style={{background:'#fff',borderRadius:12,padding:40,width:360,boxShadow:'0 8px 32px rgba(0,0,0,0.3)'}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{fontSize:24,fontWeight:700,color:'#0e1b2e'}}>SSD Client Hub</div>
          <div style={{fontSize:14,color:'#6b6560',marginTop:4}}>Sun State Digital</div>
        </div>
        <form onSubmit={handle}>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:13,fontWeight:600,color:'#0e1b2e',display:'block',marginBottom:6}}>Email</label>
            <select value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:'10px 12px',border:'1px solid #e8e2da',borderRadius:8,fontSize:14,background:'#f5f3ef'}}>
              {users.map(u=><option key={u}>{u}</option>)}
            </select>
          </div>
          <div style={{marginBottom:24}}>
            <label style={{fontSize:13,fontWeight:600,color:'#0e1b2e',display:'block',marginBottom:6}}>Password</label>
            <input type="password" value={pass} onChange={e=>setPass(e.target.value)} style={{width:'100%',padding:'10px 12px',border:'1px solid #e8e2da',borderRadius:8,fontSize:14,boxSizing:'border-box'}} placeholder="Enter password" />
          </div>
          {error && <div style={{color:'#e53e3e',fontSize:13,marginBottom:16}}>{error}</div>}
          <button type="submit" style={{width:'100%',padding:'12px',background:'#b5976b',color:'#fff',border:'none',borderRadius:8,fontSize:15,fontWeight:600,cursor:'pointer'}}>Sign In</button>
        </form>
      </div>
    </div>
  )
}
