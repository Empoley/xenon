'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, User, KeyRound } from 'lucide-react';
import XenonLogo from '@/components/ui/XenonLogo';
import { getStoredUsers, saveUsers } from '@/lib/demoData';

export default function ActivateAccountPage() {
  const router = useRouter();
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [idError, setIdError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState('');

  const maskEmail = (str: string) => {
    const parts = str.split('@');
    if (parts.length < 2) return str;
    const name = parts[0];
    const domain = parts[1];
    const prefix = name.slice(0, 3);
    return `${prefix}***@${domain}`;
  };

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setIdError('');

    if (!idNumber.trim()) {
      setIdError('Not a valid ID or ID could not be found');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const users = getStoredUsers();
      const cleanId = idNumber.trim().toUpperCase();
      const userIndex = users.findIndex(
        (u) => u.employee_id.toUpperCase() === cleanId
      );

      if (userIndex === -1) {
        setIdError('Not a valid ID or ID could not be found');
        return;
      }

      const user = users[userIndex];

      // Mark account active if it was inactive
      users[userIndex].is_active = true;
      saveUsers(users);

      const targetEmail = email.trim() || user.email;
      setMaskedEmail(maskEmail(targetEmail));
      setIsSuccessModalOpen(true);
    }, 400);
  };

  const handleQuickFill = (idVal: string, emailVal: string) => {
    setIdNumber(idVal);
    setEmail(emailVal);
    setIdError('');
  };

  return (
    <div className="auth-page">
      {/* Brand Logo at Top Left */}
      <header className="auth-header">
        <Link href="/" aria-label="Xenon Home">
          <XenonLogo size="md" />
        </Link>
      </header>

      {/* Main Container */}
      <div className="auth-main-container">
        {/* Left Form Card */}
        <div className="auth-card-side">
          <div className="auth-form-card">
            <h1 className="auth-heading-1" style={{ marginBottom: 28, fontSize: '1.9rem', lineHeight: 1.3 }}>
              Activate your account<br />using your ID
            </h1>

            <form onSubmit={handleActivate} noValidate>
              {/* ID Number Input */}
              <div className="auth-input-group">
                <div className="auth-input-icon">
                  <Lock size={19} />
                </div>
                <input
                  type="text"
                  className={`auth-input ${idError ? 'auth-input-error' : ''}`}
                  placeholder="ID Number"
                  value={idNumber}
                  onChange={(e) => {
                    setIdNumber(e.target.value);
                    if (idError) setIdError('');
                  }}
                  required
                />
                {idError && (
                  <span className="auth-error-text">{idError}</span>
                )}
              </div>

              {/* Email Input */}
              <div className="auth-input-group">
                <div className="auth-input-icon">
                  <User size={19} />
                </div>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Activate Button */}
              <button type="submit" className="auth-btn-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Activating...' : 'Activate'}
              </button>

              {/* Or Divider */}
              <div className="auth-divider-line">
                <span className="auth-divider-text">or</span>
              </div>

              {/* Footer Link */}
              <div className="auth-footer-link">
                Already have an account?{' '}
                <Link href="/login">Sign in</Link>
              </div>
            </form>

            {/* Quick Demo Fill Helper */}
            <div style={{
              marginTop: 28,
              padding: '12px 14px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.04)',
              border: '1px dashed #a1a1aa',
              fontSize: '0.75rem',
              color: '#52525b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, marginBottom: 8, color: '#27272a' }}>
                <KeyRound size={14} /> Quick Demo IDs:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <button
                  type="button"
                  onClick={() => handleQuickFill('EMP-003', 'marcus.chen@xenon.corp')}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: '#e4e4e7',
                    border: '1px solid #d4d4d8',
                    cursor: 'pointer',
                    fontSize: '0.725rem'
                  }}
                >
                  EMP-003 (New Employee)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('EMP-001', 'jampol@gmail.com')}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: '#e4e4e7',
                    border: '1px solid #d4d4d8',
                    cursor: 'pointer',
                    fontSize: '0.725rem'
                  }}
                >
                  EMP-001 (jampol)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hero Frame */}
        <div className="auth-hero-side">
          <div className="auth-hero-frame">
            <Image
              src="/auth/hero-building.png"
              alt="Xenon Architectural Landmark"
              width={738}
              height={888}
              priority
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* Activation Successful Modal (matches Activation Successful - Login.png) */}
      {isSuccessModalOpen && (
        <div className="modal-overlay">
          <div className="activation-success-modal animate-fade-in">
            <h3>Activation Successful!</h3>
            <p>
              Please check your email {maskedEmail} for your default password and username.
            </p>
            <button
              type="button"
              className="auth-btn-submit"
              style={{ marginTop: 0, padding: '0 32px', width: 'auto', display: 'inline-flex', minWidth: 160 }}
              onClick={() => router.push('/login')}
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
