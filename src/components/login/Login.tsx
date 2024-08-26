import React, { useState } from 'react';
import { auth, appleProvider, googleProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard'); // Redirect to Dashboard on success
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      console.log(result.user);
      navigate('/dashboard'); // Redirect to Dashboard on success
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      navigate('/dashboard'); // Redirect to Dashboard on success
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="login-container col-12 col-t-6 col-d-6">
      <div className='login-container-title col-12'>
        <h2 className='col-12'>{isRegistering ? 'Create Your Account' : 'Sign In to Your Account'}</h2>
        <p>{isRegistering ? 'Join us by creating a new account.' : 'Please sign in to continue.'}</p>
      </div>
      <form onSubmit={handleSubmit} className="form-container col-12">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <div className='other-sign col-12'>
        <button onClick={handleAppleSignIn} className="apple-signin-button">
          Sign in with Apple
        </button>
        <button onClick={handleGoogleSignIn} className="google-signin-button">
          Sign in with Google
        </button>
        {error && <p className="error">{error}</p>}
        <button onClick={() => setIsRegistering(!isRegistering)} className="toggle-auth-button">
          {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
      </div>
    </div>
  );
};

export default Login;