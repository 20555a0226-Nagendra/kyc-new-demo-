import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import MutualFundKYC from './pages/MutualFundKYC'
import BankingKYC from './pages/BankingKYC'
import MortgageDataEntry from './pages/MortgageDataEntry'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/mutual-fund" replace />} />
          <Route path="mutual-fund" element={<MutualFundKYC />} />
          <Route path="banking" element={<BankingKYC />} />
          <Route path="mortgage" element={<MortgageDataEntry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
