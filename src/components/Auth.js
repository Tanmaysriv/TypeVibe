import React, { useState, useRef, useEffect } from 'react';
import { auth, signInWithEmail, signUpWithEmail, signOutUser, signInWithGoogle } from '../utils/auth';

const friendlyError = (msg) => {
  if (msg.includes('auth/user-not-found')) return 'No account found with this email.';
  if (msg.includes('auth/wrong-password')) return 'Incorrect password.';
  if (msg.includes('auth/email-already-in-use')) return 'Email is already in use.';
  if (msg.includes('auth/invalid-email')) return 'Invalid email address.';
  if (msg.includes('auth/weak-password')) return 'Password should be at least 6 characters.';
  return msg.replace('Firebase:', '').replace('auth/', '').replace(/-/g, ' ');
};

const Auth = ({ user, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const emailRef = useRef();

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmail(email, password);
      } else {
        userCredential = await signUpWithEmail(email, password);
      }
      setUser(userCredential.user);
      setSuccess(true);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(friendlyError(err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    setSuccess(false);
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      setSuccess(true);
    } catch (err) {
      setError(friendlyError(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={async () => { await signOutUser(); setUser(null); }}>Logout</button>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            style={{
              width: '100%',
              background: '#fff',
              color: '#222',
              border: '1.5px solid #6366f1',
              borderRadius: 8,
              padding: '10px 0',
              fontWeight: 600,
              fontSize: '1rem',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            <span style={{ fontSize: 20, marginRight: 6 }}>🔵</span> Sign in with Google
          </button>
          <form onSubmit={handleSubmit} autoComplete="on">
            <h2 style={{ marginBottom: 8 }}>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="username"
              required
              disabled={loading}
            />
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
                disabled={loading}
                style={{ width: '100%' }}
              />
              <button
                type="button"
                tabIndex={-1}
                className="dark-toggle"
                style={{ position: 'absolute', right: 8, top: 8, fontSize: 18, background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1' }}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading || !email || !password}
              style={{ opacity: loading || !email || !password ? 0.7 : 1 }}
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
            </button>
            <p
              onClick={() => { setIsLogin(l => !l); setError(''); setSuccess(false); }}
              style={{ cursor: 'pointer', color: '#6366f1', margin: '10px 0 0', fontWeight: 500 }}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') { setIsLogin(l => !l); setError(''); setSuccess(false); } }}
              aria-label={isLogin ? 'Switch to sign up' : 'Switch to login'}
            >
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </p>
            {error && <p style={{ color: 'red', margin: '8px 0 0' }}>{error}</p>}
            {success && <p style={{ color: 'green', margin: '8px 0 0' }}>{isLogin ? 'Login successful!' : 'Sign up successful!'}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default Auth; 