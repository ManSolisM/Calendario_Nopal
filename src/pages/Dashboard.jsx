import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './Dashboard.module.css'

const fmt = (n) => `$${n.toLocaleString('es-MX')}`

const fmtFecha = (str) => {
  const [y, m, d] = str.split('-')
  const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  return `${d} ${meses[parseInt(m)-1]}`
}

export default function Dashboard() {
  const { entregas, totales } = useApp()
  const nav = useNavigate()
  const ultimas = entregas.slice(0, 4)

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>🌵</div>
        <div>
          <h1 className={styles.titulo}>Control Nopal</h1>
          <p className={styles.subtitulo}>Gestión de entregas</p>
        </div>
      </div>

      {/* Resumen cards */}
      <div className={styles.cards}>
        <div className={`${styles.card} ${styles.cardPendiente}`}>
          <span className={styles.cardIcon}>💰</span>
          <div>
            <div className={styles.cardLabel}>Pendiente</div>
            <div className={styles.cardValor}>{fmt(totales.pendiente)}</div>
          </div>
        </div>
        <div className={`${styles.card} ${styles.cardCobrado}`}>
          <span className={styles.cardIcon}>✅</span>
          <div>
            <div className={styles.cardLabel}>Cobrado</div>
            <div className={styles.cardValor}>{fmt(totales.cobrado)}</div>
          </div>
        </div>
        <div className={`${styles.card} ${styles.cardCajas}`}>
          <span className={styles.cardIcon}>📦</span>
          <div>
            <div className={styles.cardLabel}>Cajas totales</div>
            <div className={styles.cardValor}>{totales.cajas}</div>
          </div>
        </div>
      </div>

      {/* Botón nueva entrega */}
      <button className={styles.btnNueva} onClick={() => nav('/nueva')}>
        <span>➕</span> Nueva entrega
      </button>

      {/* Últimas entregas */}
      <div className={styles.seccion}>
        <div className={styles.seccionHeader}>
          <h2 className={styles.seccionTitulo}>📋 Últimas entregas</h2>
          <button className={styles.verTodas} onClick={() => nav('/entregas')}>Ver todas →</button>
        </div>

        <div className={styles.lista}>
          {ultimas.map((e, i) => (
            <div key={e.id} className={styles.item} style={{ animationDelay: `${i * 0.07}s` }}>
              <div className={styles.itemFecha}>{fmtFecha(e.fecha)}</div>
              <div className={styles.itemInfo}>
                <span className={styles.itemCliente}>{e.cliente.split(' ')[0]}</span>
                <span className={styles.itemDetalle}>{(e.categorias||[]).reduce((s,c)=>s+(Number(c.cajas)||0),0)} cajas · {fmt(e.total)}</span>
              </div>
              <span className={e.pagado ? 'badge-pagado' : 'badge-pendiente'}>
                {e.pagado ? '✅ Pagado' : '❌ Pendiente'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Acceso rápido */}
      <div className={styles.accesos}>
        <button className={styles.acceso} onClick={() => nav('/notificaciones')}>
          <span>🔔</span>
          <span>Recordatorios</span>
        </button>
        <button className={styles.acceso} onClick={() => nav('/graficas')}>
          <span>📊</span>
          <span>Gráficas</span>
        </button>
      </div>
    </div>
  )
}
