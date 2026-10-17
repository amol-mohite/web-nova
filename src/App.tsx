import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteDataProvider } from '@/context/SiteDataContext';
import { ModalProvider } from '@/context/ModalContext';
import { AuthProvider } from '@/context/AuthContext';
import { ScrollToTop } from '@/components/ScrollToTop';
import { PublicLayout } from '@/components/PublicLayout';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ServiceDetailPage } from '@/pages/ServiceDetailPage';
import { WorkPage } from '@/pages/WorkPage';
import { AdminPage } from '@/pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteDataProvider>
          <ModalProvider>
            <ScrollToTop />
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                <Route path="/work" element={<WorkPage />} />
              </Route>
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </ModalProvider>
        </SiteDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
