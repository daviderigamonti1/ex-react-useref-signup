// Milestone 2: Validare in tempo reale
// Aggiungere la validazione in tempo reale dei seguenti campi:

// ✅ Username: Deve contenere solo caratteri alfanumerici e almeno 6 caratteri (no spazi o simboli).

// ✅ Password: Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.

// ✅ Descrizione: Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali).

// Suggerimento: Per semplificare la validazione, puoi definire tre stringhe con i caratteri validi e usare .includes() per controllare se i caratteri appartengono a una di queste categorie:

// const letters = "abcdefghijklmnopqrstuvwxyz";
// const numbers = "0123456789";
// const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";
// Per ciascuno dei campi validati in tempo reale, mostrare un messaggio di errore (rosso) nel caso non siano validi, oppure un messaggio di conferma (verde) nel caso siano validi.

import { useState, useMemo } from 'react';

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [description, setDescription] = useState("");

  const isUsernameValid = useMemo(() => {
    const charsValid = username.split("").every(char =>
      letters.includes(char.toLowerCase()) || numbers.includes(char)
    );
    return charsValid && username.length >= 6;
  }, [username]);

  const isPasswordValid = useMemo(() => {
    return (
      password.trim().length >= 8 &&
      password.split("").some(char => letters.includes(char)) &&
      password.split("").some(char => numbers.includes(char)) &&
      password.split("").some(char => symbols.includes(char))
    );
  }, [password])

  const isDescriptionValid = useMemo(() => {
    return (
      description.trim().length >= 100 &&
      description.trim().length < 1000
    );
  }, [description])

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !name.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specialization.trim() ||
      !yearsExperience ||
      yearsExperience <= 0 ||
      !description.trim() ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isDescriptionValid
    ) {
      alert("Errore: Compilare tutti i campi correttamente");
      return;
    }
    console.log('Submit effettuato:', {
      name,
      username,
      password,
      specialization,
      yearsExperience,
      description
    });
    setName("");
    setUsername("");
    setPassword("");
    setSpecialization("");
    setYearsExperience("");
    setDescription("");
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
          {username.trim() && (
            <p style={{ color: isUsernameValid ? 'green' : 'red' }}>
              {isUsernameValid ? "Username valido" : "Deve avere almeno 6 caratteri alfanumerici"}
            </p>
          )}
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.trim() && (
            <p style={{ color: isPasswordValid ? 'green' : 'red' }}>
              {isPasswordValid ? "Password valida" : "Deve avere almeno 8 caratteri, 1 lettera, 1 numero, 1 simbolo."}
            </p>
          )}
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
          {description.trim() && (
            <p style={{ color: isDescriptionValid ? 'green' : 'red' }}>
              {isDescriptionValid ? "Descrizione valida" : `Deve avere tra 100 e 1000 caratteri (${description.trim().length}).`}
            </p>
          )}
        </label>
        <button type='submit'>Registrati</button>
      </form >
    </div>
  )
}

export default App;