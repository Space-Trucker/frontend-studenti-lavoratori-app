import React, { useState } from 'react';

const RegisterPage = () => {
  // Stato per nome, email e password
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Funzione per gestire l'invio del form di registrazione
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Controlla che le password coincidano
    if (password !== passwordConfirmation) {
      setError('Le password non corrispondono.');
      return;
    }

    // Logica per inviare i dati al backend
    console.log('Tentativo di registrazione con:', { name, email, password });

    // Qui in seguito aggiungeremo la logica di fetch/axios per l'API di Laravel
    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Importante per Laravel Sanctum
        },
        body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Gestione errori specifici dal backend Laravel
        if (response.status === 422 && data.errors) {
            // Errori di validazione di Laravel
            const errorMessages = Object.values(data.errors).flat().join(' ');
            setError(errorMessages);
        } else {
            setError(data.message || 'Errore durante la registrazione.');
        }
        return;
      }

      console.log('Registrazione riuscita!', data);
      setSuccess('Registrazione avvenuta con successo! Puoi ora effettuare il login.');
      setError(''); // Pulisci eventuali errori precedenti
      // Reindirizzare l'utente alla pagina di login, ad esempio
      // history.push('/login');

    } catch (err) {
      console.error('Errore di rete o del server:', err);
      setError('Impossibile connettersi al server. Riprova più tardi.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Registrati</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label htmlFor="passwordConfirmation">Conferma Password:</label>
          <input
            type="password"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
};

export default RegisterPage;