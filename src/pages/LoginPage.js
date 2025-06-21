import React, { useState } from 'react';

const LoginPage = () => {
  // Stato per l'email e la password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Per la gestione degli errori

  // Funzione per gestire l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene il ricaricamento della pagina

    // Logica per inviare i dati al backend
    console.log('Tentativo di login con:', { email, password });

    // Qui in seguito aggiungeremo la logica di fetch/axios per l'API di Laravel
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Importante per Laravel Sanctum
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se la risposta non è OK (es. 401 Unauthorized, 422 Validation Error)
        setError(data.message || 'Errore durante il login.');
        return;
      }

      // Se il login ha successo, Laravel Sanctum gestirà i cookie di sessione.
      // Non è necessario gestire token JWT manualmente qui.
      console.log('Login riuscito!', data);
      // Reindirizzare l'utente o aggiornare lo stato dell'applicazione
      // Ad esempio: history.push('/dashboard');
    } catch (err) {
      console.error('Errore di rete o del server:', err);
      setError('Impossibile connettersi al server. Riprova più tardi.');
    }
  };

  return (
    <div>
      <h2>Accedi</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;