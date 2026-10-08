'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, User, KeyRound } from 'lucide-react';
import emailjs from '@emailjs/browser';
import XenonLogo from '@/components/ui/XenonLogo';
import { getStoredUsers, saveUsers } from '@/lib/demoData';

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || 'service_6wb4g1n';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_afo0usg';
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || 'lKL2Tb2SKCPRUMBVy';

export default function ActivateAccountPage() {
  const router = useRouter();
  const [idNumber, setIdNumber]               = useState('');
  const [email, setEmail]                     = useState('');
  const [idError, setIdError]                 = useState('');
  const [emailError, setEmailError]           = useState('');
  const [isSubmitting, setIsSubmitting]       = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [maskedEmail, setMaskedEmail]         = useState('');

  const maskEmail = (str: string) => {
    const parts = str.split('@');
    if (parts.length < 2) return str;
    const name   = parts[0];
    const domain = parts[1];
    const prefix = name.slice(0, 3);
    return `${prefix}***@${domain}`;
  };

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIdError('');
    setEmailError('');

    const cleanId    = idNumber.trim().toUpperCase();
    const cleanEmail = email.trim();

    if (!cleanId) {
      setIdError('Enter your Employee ID to continue.');
      return;
    }

    if (!cleanEmail) {
      setEmailError('Enter an email address to receive your credentials.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Look up employee in Supabase database first
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      
      const { data: dbUser } = await supabase
        .from('users')
        .select('*')
        .eq('employee_id', cleanId)
        .maybeSingle();

      let targetUser: any = null;

      if (dbUser) {
        targetUser = {
          username: dbUser.default_username || dbUser.current_username || dbUser.employee_id.toLowerCase(),
          password: dbUser.default_password || 'Xenon@2026!',
          full_name: dbUser.full_name,
          employee_id: dbUser.employee_id,
        };
      } else {
        // Fallback to local store
        const users = getStoredUsers();
        const localFound = users.find(
          (u) => u.employee_id.toUpperCase() === cleanId
        );
        if (localFound) {
          targetUser = localFound;
        }
      }

      if (!targetUser) {
        setIdError('No account found with that Employee ID.');
        setIsSubmitting(false);
        return;
      }

      const credentialsSummary = 
`Your account has been activated!

Username: ${targetUser.username}
Temporary Password: ${targetUser.password}
Login URL: ${typeof window !== 'undefined' ? window.location.origin : ''}/login

Please log in and set your new password.`;

      // 2. Send real email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email:     cleanEmail,
          to_name:      targetUser.full_name ?? targetUser.username,
          username:     targetUser.username,
          temp_password: targetUser.password,
          login_url:    typeof window !== 'undefined' ? `${window.location.origin}/login` : '',
          name:         targetUser.full_name ?? targetUser.username,
          message:      credentialsSummary,
          title:        'Your Xenon Account Credentials',
        },
        EMAILJS_PUBLIC_KEY
      );

      // 3. Assign the entered email and mark account active in Supabase
      if (dbUser) {
        const { error: updateErr } = await supabase
          .from('users')
          .update({
            status: 'active',
            activated_at: new Date().toISOString(),
            activation_sent_at: new Date().toISOString(),
            email: cleanEmail,
          })
          .eq('employee_id', cleanId);

        if (updateErr) {
          console.error('Error assigning email in Supabase:', updateErr);
        }
      } else if (targetUser) {
        // If employee only existed locally, register and assign email in Supabase
        const { error: upsertErr } = await supabase
          .from('users')
          .upsert({
            employee_id: targetUser.employee_id,
            full_name: targetUser.full_name || targetUser.username,
            email: cleanEmail,
            role: 'EMPLOYEE',
            default_username: targetUser.username,
            default_password: targetUser.password,
            current_username: targetUser.username,
            current_password_hash: targetUser.password,
            status: 'active',
            activated_at: new Date().toISOString(),
            activation_sent_at: new Date().toISOString(),
          }, { onConflict: 'employee_id' });

        if (upsertErr) {
          console.error('Error inserting user to Supabase:', upsertErr);
        }
      }

      // Also mark in local store
      const users = getStoredUsers();
      const userIndex = users.findIndex(
        (u) => u.employee_id.toUpperCase() === cleanId
      );
      if (userIndex !== -1) {
        users[userIndex].is_active = true;
        saveUsers(users);
      }

      // 4. Show success modal
      setMaskedEmail(maskEmail(cleanEmail));
      setIsSuccessModalOpen(true);

    } catch (err: any) {
      console.error('Activation email failed:', err);
      const detail = err?.text || err?.message || (typeof err === 'string' ? err : 'Please check your connection and EmailJS configuration.');
      setEmailError(`Failed to send email: ${detail}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = (idVal: string, emailVal: string) => {
    setIdNumber(idVal);
    setEmail(emailVal);
    setIdError('');
    setEmailError('');
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
                  placeholder="Employee ID"
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
                  className={`auth-input ${emailError ? 'auth-input-error' : ''}`}
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  required
                />
                {emailError && (
                  <span className="auth-error-text">{emailError}</span>
                )}
              </div>

              {/* Activate Button */}
              <button type="submit" className="auth-btn-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending credentials…' : 'Activate'}
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
                  onClick={() => handleQuickFill('EMP-001', 'bundockeithwency@gmail.com')}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: '#e4e4e7',
                    border: '1px solid #d4d4d8',
                    cursor: 'pointer',
                    fontSize: '0.725rem'
                  }}
                >
                  EMP-001 · Jonh Paul (Supabase)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('EMP-002', 'bundockeithwency@gmail.com')}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: '#e4e4e7',
                    border: '1px solid #d4d4d8',
                    cursor: 'pointer',
                    fontSize: '0.725rem'
                  }}
                >
                  EMP-002 · Alex Rivera (Supabase)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('EMP-004', 'leilani.santos@xenon.corp')}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: '#e4e4e7',
                    border: '1px solid #d4d4d8',
                    cursor: 'pointer',
                    fontSize: '0.725rem'
                  }}
                >
                  EMP-004 · Leilani Santos
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

      {/* Activation Successful Modal */}
      {isSuccessModalOpen && (
        <div className="modal-overlay">
          <div className="activation-success-modal animate-fade-in">
            <h3>Activation Successful!</h3>
            <p>
              Your login credentials have been sent to{' '}
              <strong>{maskedEmail}</strong>. Check your inbox and use them to
              sign in — you will be asked to set a new password on first login.
            </p>
            <button
              type="button"
              className="auth-btn-submit"
              style={{ marginTop: 0, padding: '0 32px', width: 'auto', display: 'inline-flex', minWidth: 160 }}
              onClick={() => router.push('/login')}
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
