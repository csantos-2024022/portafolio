import { useParticles } from '../hooks/useParticles';

export default function Aurora() {
  useParticles();

  return (
    <>
      <div className="aurora" aria-hidden="true"></div>
      <div className="aurora-terciaria" aria-hidden="true"></div>
      <div id="particles-js" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}></div>
    </>
  );
}
