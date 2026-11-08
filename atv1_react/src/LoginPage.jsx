import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from './auth/AuthContext.js';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const accepted = login(formData.get('username'), formData.get('password'));

    if (!accepted) {
      setError('Usuário ou senha inválidos.');
      return;
    }

    navigate('/financas', { replace: true });
  }

  return (
    <main className="app login-page">
      <header>
        <h1>Controle de finanças</h1>
        <p>Entre para acessar os lançamentos de exemplo.</p>
      </header>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            maxLength={64}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            maxLength={64}
            required
          />
        </div>
        {error && <p role="alert">{error}</p>}
        <button className="primary-button" type="submit">Entrar</button>
      </form>
      <p className="login-hint">Demonstração: usuário admin e senha admin.</p>
    </main>
  );
}
