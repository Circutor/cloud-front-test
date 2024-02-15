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
      const { status } = data;
      if (data) {
        setLoading(false);
        if (status !== 200) {
          data.json().then(({ message }) => setError(message));
          setTimeout(() => setError(null), 1500);
          return;
        }
        if (data.token === null) {
          navigate('/register');
          return;
        }
        if (status === 200) {
          localStorage.setItem('test-token', data.Token);
          localStorage.setItem('email', data.Email);
          navigate('/buildings');
          return;
        }
      }
    });
  };

  return { loading, error, handleSubmit };
};
