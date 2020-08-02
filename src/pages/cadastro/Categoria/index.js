import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';


function CadastroCategoria() {
    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: '',
    }
    const [categorias, setCategorias] = useState([]);
    const [values, setValues] = useState(valoresIniciais);

    function setValue(chave, valor) {
        setValues({
            ...values,
            [chave]: valor,
        })
    }
 
    function handleChange(infosDoEvento) {
        setValue(
            infosDoEvento.target.getAttribute('name'),
            infosDoEvento.target.value);
    }

 /* 
     function handleChange(infosDoEvento) {
         const { getAttribute, value} = infosDoEvento.target;
         setValue(
            getAttribute('name'),
            value
          );  
    }
*/
 useEffect(() => {
  
      const URL_TOP = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      :  'http://localhost:8080/categorias';// colocar a URL heroku
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
                    setValues(valoresIniciais)
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
                <div>
                    loding...
                </div>
                <ul>
                    {categorias.map((categoria) => {
                        return (
                            <li key={`${categoria.nome}`}>
                                {categoria.nome}
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