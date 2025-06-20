// src/pages/CalendarPage.js

import React, { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtils';
import './CalendarPage.css'; // CSS specifico per il calendario

const EVENT_TYPES = ['Interrogazione', 'Verifica', 'Compito', 'Gita/Uscita', 'Scadenza Lavoro', 'Altro'];

function CalendarPage() {
  const [events, setEvents] = useState(() => {
    const savedEvents = loadFromLocalStorage('importantDates');
    // Assicurati che le date siano oggetti Date per il sorting
    return savedEvents ? savedEvents.map(event => ({ ...event, date: new Date(event.date) })) : [];
  });

  const [newEvent, setNewEvent] = useState({
    type: EVENT_TYPES[0],
    date: '',
    description: '',
  });

  useEffect(() => {
    // Salva gli eventi. Converti Date in stringhe per Local Storage
    saveToLocalStorage('importantDates', events.map(event => ({ ...event, date: event.date.toISOString() })));
  }, [events]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.date || !newEvent.description) {
      alert('Per favore, compila tutti i campi richiesti.');
      return;
    }
    setEvents(prevEvents => {
      const newEventsList = [...prevEvents, { ...newEvent, id: Date.now(), date: new Date(newEvent.date) }];
      // Ordina gli eventi per data
      return newEventsList.sort((a, b) => a.date - b.date);
    });
    setNewEvent({ type: EVENT_TYPES[0], date: '', description: '' }); // Reset form
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa data?")) {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    }
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="calendar-container">
      <h1>Calendarizzazione Date Importanti</h1>
      <p>Aggiungi esami, verifiche, scadenze di lavoro o altre date importanti per non perdere mai un impegno.</p>

      <form onSubmit={handleAddEvent} className="event-form">
        <div className="form-group">
          <label htmlFor="eventType">Tipo:</label>
          <select
            id="eventType"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
          >
            {EVENT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="eventDate">Data:</label>
          <input
            type="date"
            id="eventDate"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDescription">Descrizione:</label>
          <textarea
            id="eventDescription"
            rows="3"
            placeholder="Es: Esame di Analisi Matematica I, Consegna progetto database, Turno di lavoro serale..."
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit" className="add-event-button">Aggiungi Data</button>
      </form>

      <h2 className="events-list-title">Prossime Date:</h2>
      {events.length === 0 ? (
        <p className="no-events-message">Nessuna data importante aggiunta. Aggiungine una ora!</p>
      ) : (
        <ul className="events-list">
          {events.map(event => (
            <li key={event.id} className="event-item">
              <div className="event-info">
                <strong>{formatEventDate(event.date)}</strong> - {event.type}
                <p>{event.description}</p>
              </div>
              <button onClick={() => handleDeleteEvent(event.id)} className="delete-event-button">
                Elimina
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CalendarPage;