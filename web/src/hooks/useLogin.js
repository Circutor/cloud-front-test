import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoginUser } from '../api/auth';

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    LoginUser(email, password).then((data) => {
      setLoading(false);
      if (!data.Token) {
        const { message } = data;
        setError(message);
        setTimeout(() => setError(null), 1500);
        return;
      }
      if (data.Token) {
        const { Token: token, Email: email } = data;
        localStorage.setItem('test-token', token);
        localStorage.setItem('email', email);
        navigate('/buildings');
        return;
      }
    });
  };

  return { loading, error, handleSubmit };
};
