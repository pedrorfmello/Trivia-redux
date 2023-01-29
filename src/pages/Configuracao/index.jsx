import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCategories } from '../../helpers/api';
import { changeConfig } from '../../redux/actions/settings';
import Footer from '../../components/Footer';
import './Configuracao.css';

const Configuracao = () => {
  const reduxSettings = useSelector(
    (state) => state.settings,
  );
  const [categoriesList, setCategoriesList] = useState();
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState(reduxSettings.difficulty);
  const [type, setType] = useState(reduxSettings.type);
  const [category, setCategory] = useState(reduxSettings.category);

  const dispatch = useDispatch();

  // Pega todas as categorias na API e atualiza o state para fazer as opções do dropdown
  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchAllCategories();
      setCategoriesList(categories);
      setLoading(false);
    };
    getCategories();
  });

  // Atualiza os valores no estate e no Redux ao mesmo tempo
  const handleChange = ({ target: { id, value } }) => {
    if (id === 'difficulty') {
      setDifficulty(value);
      dispatch(changeConfig({
        config: id,
        value,
      }));
    } else if (id === 'type') {
      setType(value);
      dispatch(changeConfig({
        config: id,
        value,
      }));
    } else {
      setCategory(value);
      dispatch(changeConfig({
        config: id,
        value,
      }));
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1>Configurações</h1>
        {loading ? (
          <h2>Carregando...</h2>
        ) : (
          <div className="settings-list">
            <label htmlFor="difficulty">
              Selecione a dificuldade:
              {' '}
              <select value={ difficulty } onChange={ handleChange } id="difficulty">
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
            <label htmlFor="type">
              Selecione o tipo:
              {' '}
              <select value={ type } onChange={ handleChange } id="type">
                <option value="any">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
              </select>
            </label>
            <label htmlFor="type">
              Selecione a categoria:
              {' '}
              <select value={ category } onChange={ handleChange } id="category">
                <option value="any">Any Category</option>
                {categoriesList.map((categ) => (
                  <option key={ categ.id } value={ categ.id }>
                    {categ.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        <Link to="/">
          <input data-testid="btn-go-home" className="btn" type="button" value="Inicio" />
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Configuracao;
