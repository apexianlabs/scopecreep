'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const VERTICALS = [
  'Web Development', 'Design', 'Marketing', 'Video Production',
  'Copywriting', 'SEO', 'Consulting', 'Other'
]

function ScopeCreepInner() {
  const router = useRouter()
  const [user, setUser]         = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [result, setResult]     = useState(null)
  const [form, setForm]         = useState({
    original_scope: '',
    client_request: '',
    contract_value: '',
    project_type: 'Web Development'
  })

  useEffect(() => {
    const match = document.cookie.match(/sc_user=([^;]+)/)
    if (match) {
      try { setUser(JSON.parse(decodeURIComponent(match[1]))) } catch(e) {}
    }
  }, [])

  const handleSubmit = async () => {
    if (!form.original_scope.trim()) return setError('Please enter the original scope.')
    if (!form.client_request.trim()) return setError('Please enter the client request.')
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const token = document.cookie.match(/sc_token=([^;]+)/)?.[1] || ''
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...form, userId: user?.id })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Analysis failed')
      setResult(data.result)
    } catch(e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const getVerdictStyle = (verdict) => {
    if (!verdict) return { bg: '#f8fafc', color: '#475569', border: '#e2e8f0' }
    const v = verdict.toLowerCase()
    if (v.includes('scope creep') || v.includes('out_of_scope') || v.includes('out of scope')) return { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' }
    if (v.includes('borderline') || v.includes('grey') || v.includes('gray') || v.includes('partial')) return { bg: '#fffbeb', color: '#d97706', border: '#fde68a' }
    return { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' }
  }

  const formatVerdict = (verdict) => {
    if (!verdict) return ''
    return verdict
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase())
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px', border: '1px solid #e2e8f0',
    borderRadius: 10, fontSize: 14, color: '#0f172a', background: '#fff',
    outline: 'none', fontFamily: 'Inter,sans-serif', boxSizing: 'border-box'
  }

  const labelStyle = {
    fontSize: 11, fontWeight: 600, color: '#475569',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    display: 'block', marginBottom: 6
  }

  return (
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'Inter,sans-serif'}}>
      {/* Nav */}
      <nav style={{background:'#fff',borderBottom:'1px solid #e2e8f0',height:56,display:'flex',alignItems:'center',padding:'0 24px',gap:16,position:'sticky',top:0,zIndex:10}}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <div style={{width:28,height:28,borderRadius:7,background:'#7c3aed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:800,color:'#fff'}}>S</div>
          <span style={{fontWeight:700,color:'#0f172a',fontSize:15}}>ScopeCreep</span>
        </Link>
        <div style={{flex:1}}/>
        {user ? (
          <Link href="/dashboard" style={{fontSize:13,color:'#64748b',textDecoration:'none'}}>Dashboard</Link>
        ) : (
          <Link href="/login" style={{fontSize:13,color:'#7c3aed',fontWeight:600,textDecoration:'none'}}>Sign in</Link>
        )}
      </nav>

      <div style={{maxWidth:720,margin:'0 auto',padding:'40px 24px'}}>
        <div style={{marginBottom:28}}>
          <h1 style={{fontSize:26,fontWeight:800,color:'#0f172a',marginBottom:6}}>Is this scope creep?</h1>
          <p style={{fontSize:14,color:'#64748b'}}>Paste your original scope and the client's new request. Get an instant AI verdict, impact assessment, and a professional response.</p>
        </div>

        {error && (
          <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:10,padding:'12px 16px',fontSize:13,color:'#dc2626',marginBottom:20}}>
            {error}
          </div>
        )}

        {result ? (
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {/* Verdict */}
            {result.verdict && (() => {
              const vs = getVerdictStyle(result.verdict)
              return (
                <div style={{background:vs.bg,border:`2px solid ${vs.border}`,borderRadius:14,padding:24}}>
                  <p style={{fontSize:11,fontWeight:700,color:vs.color,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>Verdict</p>
                  <p style={{fontSize:22,fontWeight:800,color:vs.color,marginBottom:8}}>{formatVerdict(result.verdict)}</p>
                  {result.reasoning && <p style={{fontSize:14,color:'#374151',lineHeight:1.6}}>{result.reasoning}</p>}
                </div>
              )
            })()}

            {/* Impact */}
            {(result.impact || result.reasoning) && (
              <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:20}}>
                <p style={{fontSize:11,fontWeight:700,color:'#475569',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>💰 Impact Assessment</p>
                <p style={{fontSize:14,color:'#374151',lineHeight:1.6}}>{result.impact || result.reasoning}</p>
              </div>
            )}

            {/* Recommended charge */}
            {result.recommended_charge || result.estimated_additional_cost && (
              <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:12,padding:20}}>
                <p style={{fontSize:11,fontWeight:700,color:'#15803d',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>💵 Recommended Charge</p>
                <p style={{fontSize:20,fontWeight:800,color:'#15803d'}}>{result.recommended_charge || result.estimated_additional_cost}</p>
              </div>
            )}

            {/* Response email */}
            {result.suggested_response || result.recommended_response && (
              <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:20}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                  <p style={{fontSize:11,fontWeight:700,color:'#475569',textTransform:'uppercase',letterSpacing:'0.08em'}}>✉️ Suggested Response</p>
                  <button onClick={() => navigator.clipboard.writeText(result.suggested_response || result.recommended_response)}
                    style={{fontSize:11,color:'#7c3aed',background:'#f5f3ff',border:'1px solid #ddd6fe',borderRadius:6,padding:'4px 10px',cursor:'pointer',fontFamily:'Inter,sans-serif',fontWeight:600}}>
                    Copy
                  </button>
                </div>
                <p style={{fontSize:13,color:'#374151',lineHeight:1.7,whiteSpace:'pre-wrap'}}>{result.suggested_response || result.recommended_response}</p>
              </div>
            )}

            {/* Change order badge */}
            {result.change_order_needed && (
              <div style={{background:'#fffbeb',border:'1px solid #fde68a',borderRadius:10,padding:'10px 16px',display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:16}}>📋</span>
                <span style={{fontSize:13,fontWeight:600,color:'#d97706'}}>Change order required — get client sign-off before proceeding</span>
              </div>
            )}

            {/* Actions */}
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <button onClick={() => { setResult(null); setForm({ original_scope:'', client_request:'', contract_value:'', project_type:'Web Development' }) }}
                style={{flex:1,minWidth:140,padding:'11px',borderRadius:10,border:'1px solid #e2e8f0',background:'#fff',fontSize:13,fontWeight:600,color:'#475569',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
                Analyse another
              </button>
              {!user && (
                <Link href="/signup"
                  style={{flex:2,minWidth:200,padding:'11px',borderRadius:10,border:'none',background:'#7c3aed',color:'#fff',fontSize:13,fontWeight:700,textDecoration:'none',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  Save to dashboard →
                </Link>
              )}
              {user && (
                <Link href="/dashboard"
                  style={{flex:2,minWidth:200,padding:'11px',borderRadius:10,border:'none',background:'#7c3aed',color:'#fff',fontSize:13,fontWeight:700,textDecoration:'none',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  View dashboard →
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,padding:28}}>
            <div style={{marginBottom:18}}>
              <label style={labelStyle}>Project type</label>
              <select value={form.project_type} onChange={e => setForm({...form, project_type: e.target.value})}
                style={{...inputStyle, background:'#fff'}}>
                {VERTICALS.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            <div style={{marginBottom:18}}>
              <label style={labelStyle}>Contract value</label>
              <input value={form.contract_value} onChange={e => setForm({...form, contract_value: e.target.value})}
                placeholder="e.g. $5,000 or 5000"
                style={inputStyle}/>
            </div>

            <div style={{marginBottom:18}}>
              <label style={labelStyle}>Original scope *</label>
              <textarea value={form.original_scope} onChange={e => setForm({...form, original_scope: e.target.value})}
                placeholder="Paste your original project scope, proposal, or contract description..."
                rows={5}
                style={{...inputStyle, resize:'vertical'}}/>
            </div>

            <div style={{marginBottom:24}}>
              <label style={labelStyle}>Client's new request *</label>
              <textarea value={form.client_request} onChange={e => setForm({...form, client_request: e.target.value})}
                placeholder="Paste the exact message or description of what the client is asking for..."
                rows={4}
                style={{...inputStyle, resize:'vertical'}}/>
            </div>

            <button onClick={handleSubmit} disabled={loading}
              style={{width:'100%',padding:'13px',borderRadius:10,border:'none',
                background: loading ? '#a78bfa' : '#7c3aed',
                color:'#fff',fontSize:15,fontWeight:700,cursor:loading?'not-allowed':'pointer',
                fontFamily:'Inter,sans-serif',transition:'background 0.15s'}}>
              {loading ? '🔍 Analysing...' : 'Analyse scope change →'}
            </button>

            {!user && (
              <p style={{textAlign:'center',fontSize:12,color:'#94a3b8',marginTop:12}}>
                <Link href="/signup" style={{color:'#7c3aed',textDecoration:'none',fontWeight:600}}>Sign up free</Link> to save analyses and track billable extras.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter,sans-serif',color:'#94a3b8'}}>Loading...</div>}>
      <ScopeCreepInner />
    </Suspense>
  )
}
