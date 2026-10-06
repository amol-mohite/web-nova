import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactModal } from '@/components/ContactModal';
import { CallbackModal } from '@/components/CallbackModal';
import { useModal } from '@/context/ModalContext';

export function PublicLayout() {
  const { contactOpen, callbackOpen, closeContact, closeCallback } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={closeContact} />
      <CallbackModal open={callbackOpen} onClose={closeCallback} />
    </div>
  );
}
