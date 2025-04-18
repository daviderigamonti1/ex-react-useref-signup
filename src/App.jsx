// Bonus: Migliorare l'Usabilità
// Utilizziamo useRef() per migliorare l’esperienza utente, implementando le seguenti funzionalità:

// Focus automatico al primo input (Nome) al mount del componente.
// Bottone "Reset" in fondo al form per ripristinare tutti i valori:
// Gli input controllati devono tornare ai valori iniziali.
// Gli input non controllati devono essere resettati manualmente usando useRef().
// Freccia fissa in basso a destra che, quando cliccata, riporta l'utente all'inizio del form (bisogna usare position: fixed).


import { useState, useMemo, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  const refName = useRef();
  const refSpecialization = useRef();
  const refExperience = useRef();

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
    const name = refName.current.value;
    const specialization = refSpecialization.current.value;
    const yearsExperience = refExperience.current.value;
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

    resetForm();
  }

  function resetForm() {
    // Reset dei campi controllati
    setUsername("");
    setPassword("");
    setDescription("");

    // Reset dei campi non controllati (via ref)
    refName.current.value = "";
    refSpecialization.current.value = "";
    refExperience.current.value = "";

    refName.current.focus();
  }

  useEffect(() => {
    refName.current.focus();
  }, []);

  const formRef = useRef();

  return (
    <div className='container'>
      <h1>EX - Web Developer Signup</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label>
          <p>Nome Completo</p>
          <input
            type="text"
            ref={refName}
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
            ref={refSpecialization}
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
            ref={refExperience}
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
        <button type='button' onClick={resetForm}>Reset</button>
      </form >
      <footer style={{ height: '100vh' }}></footer>
      <button id='scrolltop-arrow' onClick={() => {
        formRef.current.scrollIntoView({ behavior: "smooth" })
      }}><FontAwesomeIcon icon={faArrowUp} /></button>
    </div>
  )
}

export default App;