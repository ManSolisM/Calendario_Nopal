import { createContext, useContext, useState, useEffect } from 'react'

const AppCtx = createContext(null)

const CLIENTES_INICIALES = ['Juan Pérez', 'Pedro Ramírez', 'Luis García', 'María López', 'Carlos Soto']

// Migrar entrega vieja (cajas+precioCaja) al nuevo formato con categorias[]
const migrar = (e) => {
  if (e.categorias) return e
  return {
    ...e,
    categorias: [{ id: 1, nombre: 'Nopal', cajas: e.cajas ?? 0, precio: e.precioCaja ?? 0 }],
  }
}

const calcTotal = (categorias) =>
  (categorias || []).reduce((s, c) => s + (Number(c.cajas) || 0) * (Number(c.precio) || 0), 0)

const calcCajas = (categorias) =>
  (categorias || []).reduce((s, c) => s + (Number(c.cajas) || 0), 0)

const ENTREGAS_INICIALES = [
  { id: 1, fecha: '2026-04-01', cliente: 'Juan Pérez',    categorias: [{ id:1, nombre:'Nopal grande', cajas:10, precio:50 }], pagado: false, nota: '', recordatorio: 3 },
  { id: 2, fecha: '2026-03-31', cliente: 'Pedro Ramírez', categorias: [{ id:1, nombre:'Nopal mediano', cajas:8,  precio:50 }], pagado: true,  nota: '', recordatorio: 3 },
  { id: 3, fecha: '2026-03-30', cliente: 'Luis García',   categorias: [{ id:1, nombre:'Nopal grande',  cajas:7,  precio:55 }, { id:2, nombre:'Nopal chico', cajas:5, precio:30 }], pagado: false, nota: 'Entrega extra', recordatorio: 3 },
  { id: 4, fecha: '2026-03-28', cliente: 'María López',   categorias: [{ id:1, nombre:'Nopal mediano', cajas:6,  precio:55 }], pagado: true,  nota: '', recordatorio: 1 },
  { id: 5, fecha: '2026-03-25', cliente: 'Carlos Soto',   categorias: [{ id:1, nombre:'Nopal grande',  cajas:10, precio:50 }, { id:2, nombre:'Nopal chico', cajas:5, precio:28 }], pagado: false, nota: '', recordatorio: 7 },
].map(e => ({ ...e, total: calcTotal(e.categorias) }))

export function AppProvider({ children }) {
  const [entregas, setEntregas] = useState(() => {
    try {
      const saved = localStorage.getItem('nopal-entregas')
      const parsed = saved ? JSON.parse(saved) : ENTREGAS_INICIALES
      return parsed.map(migrar).map(e => ({ ...e, total: calcTotal(e.categorias) }))
    } catch { return ENTREGAS_INICIALES }
  })

  const [clientes, setClientes] = useState(() => {
    try {
      const saved = localStorage.getItem('nopal-clientes')
      return saved ? JSON.parse(saved) : CLIENTES_INICIALES
    } catch { return CLIENTES_INICIALES }
  })

  useEffect(() => { localStorage.setItem('nopal-entregas', JSON.stringify(entregas)) }, [entregas])
  useEffect(() => { localStorage.setItem('nopal-clientes', JSON.stringify(clientes)) }, [clientes])

  const agregarEntrega = (entrega) => {
    const total = calcTotal(entrega.categorias)
    const nueva = { ...entrega, id: Date.now(), total }
    setEntregas(prev => [nueva, ...prev])
    if (!clientes.includes(entrega.cliente)) {
      setClientes(prev => [...prev, entrega.cliente].sort())
    }
  }

  const editarEntrega = (id, datos) => {
    const total = calcTotal(datos.categorias)
    setEntregas(prev => prev.map(e => e.id === id ? { ...e, ...datos, total } : e))
  }

  const marcarPagado = (id) => setEntregas(prev => prev.map(e => e.id === id ? { ...e, pagado: true } : e))
  const eliminarEntrega = (id) => setEntregas(prev => prev.filter(e => e.id !== id))

  const agregarCliente = (nombre) => {
    if (nombre && !clientes.includes(nombre)) {
      setClientes(prev => [...prev, nombre].sort())
    }
  }

  const totales = entregas.reduce((acc, e) => ({
    pendiente: acc.pendiente + (!e.pagado ? e.total : 0),
    cobrado:   acc.cobrado   + ( e.pagado ? e.total : 0),
    cajas:     acc.cajas     + calcCajas(e.categorias),
  }), { pendiente: 0, cobrado: 0, cajas: 0 })

  return (
    <AppCtx.Provider value={{ entregas, clientes, totales, agregarEntrega, editarEntrega, marcarPagado, eliminarEntrega, agregarCliente }}>
      {children}
    </AppCtx.Provider>
  )
}

export const useApp = () => useContext(AppCtx)
