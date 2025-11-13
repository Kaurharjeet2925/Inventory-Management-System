import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Inventory Management Login',
  description: 'Simple login page built with React Bootstrap and Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </body>
    </html>
  );
}
