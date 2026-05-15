import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{minHeight:'100vh',fontFamily:'Inter,sans-serif',background:'#fff',color:'#0f172a'}}>
      <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.95)',backdropFilter:'blur(8px)',borderBottom:'1px solid #e2e8f0',padding:'0 20px',height:56,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:28,height:28,borderRadius:7,background:'#7c3aed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:800,color:'#fff'}}>S</div>
          <span style={{fontWeight:800,fontSize:16,color:'#0f172a'}}>ScopeCreep</span>
        </div>
        <div style={{display:'flex',gap:8}}>
          <Link href="/login" style={{padding:'7px 14px',fontSize:13,color:'#475569',textDecoration:'none',fontWeight:500}}>Log in</Link>
          <Link href="/signup" style={{padding:'8px 16px',fontSize:13,background:'#7c3aed',color:'#fff',textDecoration:'none',borderRadius:8,fontWeight:600}}>Try Free</Link>
        </div>
      </nav>

      <section style={{padding:'80px 20px 60px',textAlign:'center',background:'linear-gradient(180deg,#faf5ff 0%,#fff 100%)'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'#f5f3ff',border:'1px solid #ddd6fe',borderRadius:20,padding:'4px 12px',fontSize:11,color:'#7c3aed',fontWeight:700,marginBottom:20,textTransform:'uppercase',letterSpacing:'0.05em'}}>
          ⚡ AI-POWERED SCOPE PROTECTION
        </div>
        <h1 style={{fontSize:'clamp(32px,5vw,56px)',fontWeight:900,lineHeight:1.1,letterSpacing:'-1.5px',marginBottom:20,maxWidth:640,margin:'0 auto 20px'}}>
          Stop losing money<br/>
          <span style={{color:'#7c3aed'}}>to scope creep.</span>
        </h1>
        <p style={{fontSize:17,color:'#64748b',maxWidth:500,margin:'0 auto 32px',lineHeight:1.6}}>
          Paste your original scope and the client's new request. Get an instant AI verdict, professional response, and change order — in 30 seconds.
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:16}}>
          <Link href="/generate" style={{padding:'12px 28px',background:'#7c3aed',color:'#fff',textDecoration:'none',borderRadius:10,fontWeight:700,fontSize:15}}>
            Analyse free →
          </Link>
          <Link href="/signup" style={{padding:'12px 28px',background:'#fff',color:'#7c3aed',textDecoration:'none',borderRadius:10,fontWeight:700,fontSize:15,border:'2px solid #ddd6fe'}}>
            Start free trial
          </Link>
        </div>
        <p style={{fontSize:12,color:'#94a3b8'}}>✓ No credit card required &nbsp;·&nbsp; ✓ 3 free analyses &nbsp;·&nbsp; ✓ Cancel anytime</p>

        {/* Stats */}
        <div style={{display:'flex',gap:32,justifyContent:'center',flexWrap:'wrap',marginTop:48,padding:'28px',background:'#f5f3ff',borderRadius:16,maxWidth:600,margin:'48px auto 0'}}>
          {[
            { stat:'$50B+', label:'Lost to scope creep annually' },
            { stat:'70–90%', label:'Of projects affected' },
            { stat:'30 sec', label:'To get your answer' },
          ].map(s => (
            <div key={s.stat} style={{textAlign:'center'}}>
              <p style={{fontSize:28,fontWeight:800,color:'#7c3aed',marginBottom:4}}>{s.stat}</p>
              <p style={{fontSize:12,color:'#64748b'}}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:'60px 20px',maxWidth:1000,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <h2 style={{fontSize:30,fontWeight:800,letterSpacing:'-0.5px',marginBottom:8}}>How it works</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:20}}>
          {[
            { step:'01', icon:'📋', title:'Paste original scope', desc:'Copy your proposal, contract, or project brief into the scope field.' },
            { step:'02', icon:'💬', title:'Paste client request', desc:'Copy the exact message from your client asking for the new work.' },
            { step:'03', icon:'🤖', title:'Get instant verdict', desc:'AI analyses the change, tells you if it\'s scope creep, and suggests a charge.' },
            { step:'04', icon:'✉️', title:'Send the response', desc:'Use the AI-drafted professional response email to push back with confidence.' },
          ].map(f => (
            <div key={f.step} style={{background:'#f8fafc',borderRadius:12,border:'1px solid #e2e8f0',padding:24,position:'relative'}}>
              <div style={{fontSize:11,fontWeight:700,color:'#7c3aed',marginBottom:8}}>{f.step}</div>
              <div style={{fontSize:28,marginBottom:10}}>{f.icon}</div>
              <h3 style={{fontSize:14,fontWeight:700,color:'#0f172a',marginBottom:6}}>{f.title}</h3>
              <p style={{fontSize:12,color:'#64748b',lineHeight:1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:'60px 20px',maxWidth:900,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <h2 style={{fontSize:30,fontWeight:800,letterSpacing:'-0.5px',marginBottom:8}}>Simple pricing</h2>
          <p style={{fontSize:14,color:'#64748b'}}>One saved conversation pays for a year.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16}}>
          {[
            { name:'Free', price:'$0', desc:'Try it out', features:['3 analyses/month','AI verdict + reasoning','Draft response email'], cta:'Get started', highlight:false },
            { name:'Solo', price:'$19', desc:'For freelancers', features:['Unlimited analyses','DOCX change order','Project log','Running billable total'], cta:'Start free trial', highlight:false },
            { name:'Pro', price:'$39', desc:'For agencies', features:['Everything in Solo','Client portal','E-signature','CSV export'], cta:'Start free trial', highlight:true },
            { name:'Agency', price:'$49', desc:'For teams', features:['Everything in Pro','5 team seats','Template library','Team history'], cta:'Start free trial', highlight:false },
          ].map(plan => (
            <div key={plan.name} style={{borderRadius:14,border: plan.highlight ? '2px solid #7c3aed' : '1px solid #e2e8f0',padding:22,background: plan.highlight ? '#faf5ff' : '#fff',position:'relative'}}>
              {plan.highlight && <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#7c3aed',color:'#fff',fontSize:10,fontWeight:700,padding:'3px 12px',borderRadius:10,whiteSpace:'nowrap'}}>Most Popular</div>}
              <p style={{fontSize:14,fontWeight:700,color:'#0f172a',marginBottom:2}}>{plan.name}</p>
              <p style={{fontSize:11,color:'#64748b',marginBottom:10}}>{plan.desc}</p>
              <div style={{display:'flex',alignItems:'baseline',gap:2,marginBottom:14}}>
                <span style={{fontSize:28,fontWeight:800,color:'#0f172a'}}>{plan.price}</span>
                <span style={{fontSize:11,color:'#94a3b8'}}>/month</span>
              </div>
              <Link href="/signup" style={{display:'block',textAlign:'center',padding:'9px',borderRadius:8,
                background: plan.highlight ? '#7c3aed' : '#f5f3ff',
                color: plan.highlight ? '#fff' : '#7c3aed',
                textDecoration:'none',fontWeight:600,fontSize:12,marginBottom:14,
                border: plan.highlight ? 'none' : '1px solid #ddd6fe'}}>
                {plan.cta}
              </Link>
              <div style={{borderTop:'1px solid #e2e8f0',paddingTop:12}}>
                {plan.features.map(f => (
                  <div key={f} style={{display:'flex',gap:8,marginBottom:6}}>
                    <span style={{color:'#7c3aed',fontSize:12}}>✓</span>
                    <span style={{fontSize:11,color:'#475569'}}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:'60px 20px',background:'#7c3aed',textAlign:'center'}}>
        <h2 style={{fontSize:30,fontWeight:800,color:'#fff',marginBottom:12}}>Stop absorbing the cost.</h2>
        <p style={{fontSize:15,color:'#ddd6fe',marginBottom:28}}>One saved conversation pays for 26 months of ScopeCreep.</p>
        <Link href="/generate" style={{padding:'13px 28px',background:'#fff',color:'#7c3aed',textDecoration:'none',borderRadius:10,fontWeight:700,fontSize:15}}>
          Analyse free now →
        </Link>
      </section>

      <footer style={{padding:'24px 20px',borderTop:'1px solid #e2e8f0',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
        <span style={{fontWeight:700,fontSize:13}}>ScopeCreep</span>
        <p style={{fontSize:12,color:'#94a3b8'}}>© {new Date().getFullYear()} ScopeCreep. Built on Claude AI.</p>
        <div style={{display:'flex',gap:16}}>
          {['Privacy','Terms','Support'].map(l => <a key={l} href="#" style={{fontSize:12,color:'#64748b',textDecoration:'none'}}>{l}</a>)}
        </div>
      </footer>
    </div>
  )
}
