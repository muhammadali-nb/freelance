import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { AuthGuard } from '@/components/auth-guard';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto py-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
} 