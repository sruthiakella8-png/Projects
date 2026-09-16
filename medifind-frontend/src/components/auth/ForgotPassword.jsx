import { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';

function ForgotPassword({ onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onForgotPassword(email);   // ← Sruthi plugs in API call here
      setMessage('Reset link sent to your email');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        <ErrorMessage message={error} />
        {message && <p className="text-green-600 text-sm mb-4 text-center">{message}</p>}
        <form onSubmit={handleSubmit}>
          <InputField label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your registered email" />
          <Button text="Send Reset Link" loading={loading} />
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;