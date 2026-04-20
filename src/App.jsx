import { useEffect } from 'react';
import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero/Hero';
import { Operacao } from './components/Operacao';
import { Beneficios } from './components/Beneficios';
import { Depoimentos } from './components/Depoimentos';
import { Selecao } from './components/Selecao';
import { Treinamento } from './components/Treinamento';
import { Numeros } from './components/Numeros';
import { FAQ } from './components/FAQ';
import { CtaFinal } from './components/CtaFinal/CtaFinal';

export default function App() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, [reduced]);

  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Operacao />
        <Beneficios />
        <Depoimentos />
        <Selecao />
        <Numeros />
        <Treinamento />
        <CtaFinal />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
