'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Lock, KeyRound } from 'lucide-react';
import XenonLogo from '@/components/ui/XenonLogo';
import { getStoredUsers, setCurrentUser } from '@/lib/demoData';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError('');
    setPasswordError('');

    if (!username.trim()) {
      setUsernameError("Couldn't find your Account");
      return;
    }

    if (!password) {
      setPasswordError('The password you entered is incorrect');
      return;
    }

    setIsLoading(true);

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      const users = getStoredUsers();
      const cleanUsername = username.trim().toLowerCase();
      const user = users.find((u) => u.username.toLowerCase() === cleanUsername);

      if (!user) {
        setUsernameError("Couldn't find your Account");
        return;
      }

      if (user.password !== password) {
        setPasswordError('The password you entered is incorrect');
        return;
      }

      // Successful credentials
      setCurrentUser(user);

      // If user requires first-login credential update:
      if (user.is_first_login) {
        router.push('/first-login');
        return;
      }

      // Route based on user role
      if (user.role === 'manager') {
        router.push('/manager/dashboard');
      } else {
        router.push('/dashboard');
      }
    }, 400);
  };

  const handleQuickFill = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setUsernameError('');
    setPasswordError('');
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
            <h1 className="auth-heading-1">Welcome to Xenon</h1>
            <h2 className="auth-heading-2">Sign in to your account</h2>

            <form onSubmit={handleLogin} noValidate>
              {/* Username Input */}
              <div className="auth-input-group">
                <div className="auth-input-icon">
                  <User size={19} />
                </div>
                <input
                  type="text"
                  className={`auth-input ${usernameError ? 'auth-input-error' : ''}`}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (usernameError) setUsernameError('');
                  }}
                  autoComplete="username"
                  required
                />
                {usernameError && (
                  <span className="auth-error-text">{usernameError}</span>
                )}
              </div>

              {/* Password Input */}
              <div className="auth-input-group">
                <div className="auth-input-icon">
                  <Lock size={19} />
                </div>
                <input
                  type="password"
                  className={`auth-input ${passwordError ? 'auth-input-error' : ''}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  autoComplete="current-password"
                  required
                />
                {passwordError && (
                  <span className="auth-error-text">{passwordError}</span>
                )}
              </div>

              {/* Sign In Button */}
              <button type="submit" className="auth-btn-submit" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              {/* Or Divider */}
              <div className="auth-divider-line">
                <span className="auth-divider-text">or</span>
              </div>

              {/* Footer Link */}
              <div className="auth-footer-link">
                Don&apos;t have an account?{' '}
                <Link href="/activate">Activate Account</Link>
              </div>
            </form>

            {/* Quick Demo Fill Helper (convenient for testing all scenarios) */}
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
                <KeyRound size={14} /> Quick Demo Logins:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <button
                  type="button"
                  onClick={() => handleQuickFill('jampol', 'password123')}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: '#e4e4e7',
                    border: '1px solid #d4d4d8',
                    cursor: 'pointer',
                    fontSize: '0.725rem'
                  }}
                  title="First login scenario"
                >
                  jampol (1st login)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('arivera', 'password123')}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: '#e4e4e7',
                    border: '1px solid #d4d4d8',
                    cursor: 'pointer',
                    fontSize: '0.725rem'
                  }}
                  title="Employee role"
                >
                  arivera (Employee)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('sjenkins', 'password123')}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: '#e4e4e7',
                    border: '1px solid #d4d4d8',
                    cursor: 'pointer',
                    fontSize: '0.725rem'
                  }}
                  title="Manager role"
                >
                  sjenkins (Manager)
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
    </div>
  );
}
