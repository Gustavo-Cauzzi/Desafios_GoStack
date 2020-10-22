import React, {useEffect, useState} from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories,setRepositories] = useState([])

  useEffect(() => {
    api.get("repositories").then(res => {
      setRepositories(res.data);
    })
  }, []);

  async function handleAddRepository() {
    const res = await api.post("repositories",{
      title:`Novo Repository ${Date.now()}`,
      owner:"Gustavo Cauzzi",
      url:"www.oloko.com"
    });

    const repo = res.data;

    setRepositories([ ...repositories, repo ]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);
    
    const newRepositories = repositories.filter(repo => repo.id !== id);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repo => 
        <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li> 
      )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
