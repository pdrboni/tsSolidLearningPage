import { createRoot } from 'react-dom/client';
import { App } from './App';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { SRP } from './components/srp';
import { OCP } from './components/ocp';
import { LSP } from './components/lsp';
import { ISP } from './components/isp';
import { DIP } from './components/dip';
import { Footer } from './components/Footer';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="srp" element={<SRP />} />
      <Route path="ocp" element={<OCP />} />
      <Route path="lsp" element={<LSP />} />
      <Route path="isp" element={<ISP />} />
      <Route path="dip" element={<DIP />} />
    </Routes>
    <Footer />
  </BrowserRouter>,
);
