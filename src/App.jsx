import { PortafolioProvider } from './context/PortafolioContext';
import { useCustomCursor } from './hooks/useCustomCursor';
import Aurora from './components/Aurora';
import HamburgerButton from './components/HamburgerButton';
import Overlay from './components/Overlay';
import Sidebar from './components/Sidebar';
import Contenido from './components/Contenido';
import SourceCodeOverlay from './components/SourceCodeOverlay';
import Lightbox from './components/Lightbox';
import IntroLoader from './components/IntroLoader';

function Layout() {
  useCustomCursor();

  return (
    <>
      <Aurora />
      <HamburgerButton />
      <Overlay />
      <Sidebar />
      <Contenido />
      <SourceCodeOverlay />
      <Lightbox />
      <IntroLoader />
    </>
  );
}

export default function App() {
  return (
    <PortafolioProvider>
      <Layout />
    </PortafolioProvider>
  );
}
