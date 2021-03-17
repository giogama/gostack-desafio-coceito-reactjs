import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Giovanni',
      url: 'https://github.com/giogama',
      techs: ['NodeJS', 'ReactJS']
    });

    setRepositories([...repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    //remover do backend
    await api.delete(`repositories/${id}`);

    //remover em tela
    setRepositories(repositories.filter(
      repository => repository.id != id 
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key = {repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
