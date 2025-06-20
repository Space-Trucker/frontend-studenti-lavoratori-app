// src/pages/ScheduleTablePage.js

import React, { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage } from '../utils/localStorageUtils';import './ScheduleTablePage.css'; // CSS specifico per la tabella

const DAYS = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
const HOURS = Array.from({ length: 10 }, (_, i) => `${i + 8}:00 - ${i + 9}:00`); // Dalle 8:00 alle 17:00

function ScheduleTablePage() {
  // Inizializza lo stato con i dati dal Local Storage o una tabella vuota
  const [schedule, setSchedule] = useState(() => {
    const savedSchedule = loadFromLocalStorage('weeklySchedule');
    return savedSchedule || {};
  });

  // Salva lo schedule nel Local Storage ogni volta che cambia
  useEffect(() => {
    saveToLocalStorage('weeklySchedule', schedule);
  }, [schedule]);

  const handleInputChange = (day, hour, field, value) => {
    setSchedule(prevSchedule => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [hour]: {
          ...(prevSchedule[day] && prevSchedule[day][hour]),
          [field]: value,
        },
      },
    }));
  };

  return (
    <div className="schedule-container">
      <h1>Orario Settimanale</h1>
      <p>Organizza il tuo tempo inserendo materie, insegnanti o impegni di lavoro per ogni fascia oraria.</p>

      <div className="schedule-table-responsive">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Ora</th>
              {DAYS.map(day => <th key={day}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {HOURS.map(hour => (
              <tr key={hour}>
                <td>{hour}</td>
                {DAYS.map(day => (
                  <td key={`<span class="math-inline">\{day\}\-</span>{hour}`} className="schedule-cell">
                    <input
                      type="text"
                      placeholder="Materia/Impegno"
                      value={schedule[day]?.[hour]?.materia || ''}
                      onChange={(e) => handleInputChange(day, hour, 'materia', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Docente/Luogo"
                      value={schedule[day]?.[hour]?.docente || ''}
                      onChange={(e) => handleInputChange(day, hour, 'docente', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Aula/Note"
                      value={schedule[day]?.[hour]?.aula || ''}
                      onChange={(e) => handleInputChange(day, hour, 'aula', e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="clear-button" onClick={() => {
        if (window.confirm("Sei sicuro di voler cancellare tutto l'orario?")) {
          setSchedule({});
          removeFromLocalStorage('weeklySchedule');
        }
      }}>
        Pulisci Orario
      </button>
    </div>
  );
}

export default ScheduleTablePage;