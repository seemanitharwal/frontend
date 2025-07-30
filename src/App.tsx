import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import VerifyPage from './pages/VerifyPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import DownloadPage from './pages/DownloadPage'
import NotFoundPage from './pages/NotFoundPage'
import AdminProjectsPage from './pages/AdminProjectsPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/admin/projects" element={<AdminProjectsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App