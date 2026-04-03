import { HashRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import NuevaEntrega from './pages/NuevaEntrega'
import ListaEntregas from './pages/ListaEntregas'
import EditarEntrega from './pages/EditarEntrega'
import Notificaciones from './pages/Notificaciones'
import Calendario from './pages/Calendario'
import Graficas from './pages/Graficas'
import './index.css'

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/nueva" element={<NuevaEntrega />} />
          <Route path="/entregas" element={<ListaEntregas />} />
          <Route path="/editar/:id" element={<EditarEntrega />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/graficas" element={<Graficas />} />
        </Routes>
        <Navbar />
      </HashRouter>
    </AppProvider>
  )
}
