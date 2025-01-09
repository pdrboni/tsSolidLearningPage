import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { SRP } from './components/srp';
import { OCP } from './components/ocp';
import { LSP } from './components/lsp';
import { ISP } from './components/isp';
import { DIP } from './components/dip';
import { Footer } from './components/Footer';
import { DarkModeButton } from './components/DarkModeButton';
import { TitleTSSOLID } from './components/TitleTSSOLID';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/scss/main.scss';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <DarkModeButton />
      <Routes>
        <Route path="/" element={<TitleTSSOLID />} />
        <Route path="/srp" element={<SRP />} />
        <Route path="/ocp" element={<OCP />} />
        <Route path="/lsp" element={<LSP />} />
        <Route path="/isp" element={<ISP />} />
        <Route path="/dip" element={<DIP />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  </BrowserRouter>,
);
