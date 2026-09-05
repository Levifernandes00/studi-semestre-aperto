import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProgressProvider } from './state/ProgressContext'
import { HomePage } from './pages/HomePage'
import { UnitaPage } from './pages/UnitaPage'
import { CalendarioPage } from './pages/CalendarioPage'
import { SimulazionePage } from './pages/SimulazionePage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/unita/:id" element={<UnitaPage />} />
            <Route path="/calendario" element={<CalendarioPage />} />
            <Route path="/simulazione" element={<SimulazionePage />} />
            <Route path="/impostazioni" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ProgressProvider>
  )
}
