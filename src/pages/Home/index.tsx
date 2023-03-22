import Button from 'components/Button';
import { Link } from 'react-router-dom';

import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content-container">
        <h1>Desafio Github API</h1>
        <h2>DevSuperior - Escola de programação</h2>
      </div>
      <div>
        <Link to="/gitsearch">
          <Button text="Começar" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
