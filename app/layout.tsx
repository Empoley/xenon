import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EMS — Employee Management System',
  description: 'Centralized workspace for employee attendance, tasks, announcements, and department management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
