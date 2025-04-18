// Milestone 1: Creare un Form con Campi Controllati
// Crea un form di registrazione con i seguenti campi controllati (gestiti con useState):

// ✅ Nome completo (input di testo)

// ✅ Username (input di testo)

// ✅ Password (input di tipo password)

// ✅ Specializzazione (select con opzioni: "Full Stack", "Frontend", "Backend")

// ✅ Anni di esperienza (input di tipo number)

// ✅ Breve descrizione sullo sviluppatore (textarea)

// Aggiungi una validazione al submit, verificando che:

// Tutti i campi siano compilati
// L'input Anni di esperienza sia un numero positivo
// La Specializzazione sia selezionata

// Al submit, se il form è valido, stampa in console i dati.

import { useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !name.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specialization.trim() ||
      !yearsExperience.trim() ||
      yearsExperience <= 0 ||
      !description.trim()
    ) {
      alert("Errore: Compilare tutti i campi correttamente");
    }
    console.log('Submit effettuato:', {
      name,
      username,
      password,
      specialization,
      yearsExperience,
      description
    });
  }

  return (
    <div className='container'>
      <h1>EX - Web Developer Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Nome Completo</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <p>Username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <p>Specializzazione</p>
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">-- Seleziona --</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </label>
        <label>
          <p>Anni di esperienza</p>
          <input
            type="number"
            value={yearsExperience}
            onChange={(e) => setYearsExperience(e.target.value)}
          />
        </label>
        <label>
          <p>Descrizione</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type='submit'>Registrati</button>
      </form >
    </div>
  )
}

export default App;