import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';


function CadastroCategoria() {

  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
    };

    const {handleChange, values, clearForm} = useForm(valoresIniciais);

   
    const [categorias, setCategorias] = useState([]);

 useEffect(() => {
  
      const URL_TOP = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      :  'https://nivaflix.herokuapp.com/categorias';// colocar a URL heroku
      fetch(URL_TOP)
        .then(async (respostaDoServidor) => {
        
            const resposta = await respostaDoServidor.json();
            setCategorias([
              ...resposta,
            ]);
       });
    
  });

  

    return (
            <PageDefault>
                <h1>Cadastro de Categoria: {values.nome}</h1>
                <form onSubmit={function handlesSubmit(infosDoEvento) {
                    infosDoEvento.preventDefault();
                    setCategorias([
                        ...categorias,
                        values
                    ]);
                    clearForm()
                 }}>

                   
                    <FormField
                    label="Nome da Categoria"
                    type="text"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                    />

                   <FormField
                    label="Descrição"
                    type="textarea"
                    name="descricao"
                    value={values.descricao}
                    onChange={handleChange}
                    />

          

                    <FormField
                    label="cor"
                    type="color"
                    name="cor"
                    value={values.cor}
                    onChange={handleChange}
                    />

                    <Button>
                        Cadastrar
                    </Button>
                </form>
           

             <ul>
                    {categorias.map((categoria) => {
                        return (
                            <li key={`${categoria.titulo}`}>
                                {categoria.titulo}
                            </li>
                        )
                    })}
                </ul>
            

                <Link to="/">
                    Ir para a Home
                </Link>
            </PageDefault>
    )
}

export default CadastroCategoria;