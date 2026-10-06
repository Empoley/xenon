'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import XenonLogo from '@/components/ui/XenonLogo';
import { getCurrentUser, getStoredUsers, saveUsers, setCurrentUser } from '@/lib/demoData';

export default function FirstLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('Please enter a username');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter a new password');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const currentUser = getCurrentUser();
      const users = getStoredUsers();

      const userIndex = users.findIndex(
        (u) => currentUser && u.id === currentUser.id
      );

      if (userIndex !== -1) {
        users[userIndex].username = username.trim();
        users[userIndex].password = password;
        users[userIndex].is_first_login = false;
        saveUsers(users);
        setCurrentUser(users[userIndex]);

        if (users[userIndex].role === 'manager') {
          router.push('/manager/dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        // Fallback for direct testing
        router.push('/dashboard');
      }
    }, 400);
  };

  return (
    <div className="update-details-page">
      <div className="update-details-card animate-fade-in">
        {/* Brand Logo centered */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <XenonLogo size="md" />
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: '1.65rem',
          fontWeight: 600,
          color: '#111827',
          marginBottom: 28,
          textAlign: 'center',
          letterSpacing: '-0.01em'
        }}>
          Update Your Account Details
        </h1>

        <form onSubmit={handleSave} noValidate>
          {/* New Username */}
          <div style={{ marginBottom: 18 }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              color: '#374151',
              marginBottom: 6,
              fontWeight: 500
            }}>
              Enter New Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                height: 48,
                padding: '0 16px',
                borderRadius: 8,
                border: '1.5px solid #27272a',
                background: 'transparent',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          {/* New Password */}
          <div style={{ marginBottom: 18 }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              color: '#374151',
              marginBottom: 6,
              fontWeight: 500
            }}>
              Enter New Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                height: 48,
                padding: '0 16px',
                borderRadius: 8,
                border: '1.5px solid #27272a',
                background: 'transparent',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              color: '#374151',
              marginBottom: 6,
              fontWeight: 500
            }}>
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: '100%',
                height: 48,
                padding: '0 16px',
                borderRadius: 8,
                border: '1.5px solid #27272a',
                background: 'transparent',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          {errorMessage && (
            <div style={{
              color: '#ef4444',
              fontSize: '0.825rem',
              marginBottom: 16,
              textAlign: 'center'
            }}>
              {errorMessage}
            </div>
          )}

          {/* Save Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <button
              type="submit"
              className="auth-btn-submit"
              style={{
                width: 'auto',
                minWidth: 140,
                padding: '0 40px',
                marginTop: 0
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
