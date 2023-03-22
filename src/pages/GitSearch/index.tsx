import Button from 'components/Button';
import './styles.css';
import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

// Representando os dados do formulário, cada campo do form
type FormData = {
  usuario: string;
};

type UsuarioGitHub = {
  avatar_url: string;
  url: string;
  name: string;
  location: string;
  followers: string;
};

const GitSearch = () => {
  const [usuarioGitHub, setUsuarioGitHub] = useState<UsuarioGitHub>();

  const [formData, setFormData] = useState<FormData>({
    // Iniciando com valor
    usuario: '',
  });

  // Evento ao alterar o imput text
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Saber qual dos imputs foi altereado
    // pegar o nome do imput
    const name = event.target.name;
    // pegar o valor do imput
    const value = event.target.value;

    // Chama o estado e atualiza o valor dele (... aproveita o valor que já tem nele),  [name]: value (alterando o valor pelo nome)
    setFormData({ ...formData, [name]: value });
  };

  // Evento ao enviar o form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .get(`https://api.github.com/users/${formData.usuario}`)
      .then((response) => {
        setUsuarioGitHub(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setUsuarioGitHub(undefined);
        console.log(error);
      });
  };

  return (
    <div className="gitsearch-container">
      <div className="base-card gitsearch-card">
        <form onSubmit={handleSubmit}>
          <div className="gitsearch-content-container">
            <h1>Encontre um perfil Github</h1>
            <input
              type="text"
              name="usuario"
              // Amarrando a caixinha com o valor do estado(controle do dado que está na caixa)
              value={formData.usuario}
              placeholder="Usuário Github"
              className="search-imput"
              onChange={handleChange}
            />
          </div>
          <div>
            <Button text="Encontrar" />
          </div>
        </form>
      </div>
      {/*Só renderiza o que tem para baixo se o usuarioGitHub não for undefined*/}
      {usuarioGitHub && (
        <>
          <div className="base-card gitsearch-card-container">
            <div className="gitsearch-card-info">
              <div className="gitsearch-image-container">
                <img src={usuarioGitHub.avatar_url} alt="Imagem do perfil" />
              </div>
              <div className="base-card gitsearch-form-container">
                <h4>Informações</h4>
                <div className="resultcard-perfil"><ResultCard title="Perfil" description={usuarioGitHub?.url} /></div>
                <ResultCard
                  title="Seguidores"
                  description={usuarioGitHub.followers}
                />
                <ResultCard
                  title="Localidade"
                  description={usuarioGitHub.location}
                />
                <ResultCard title="Nome" description={usuarioGitHub?.name} />
              </div>
              <div className="gitsearch-card-info-content"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GitSearch;
