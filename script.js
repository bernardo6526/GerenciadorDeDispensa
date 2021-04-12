let listasDeCompras = [];

let produtosCompras = [];
let idLista = -1;

let dispensa = [];

// flag para controlar as edicoes
let podeEditar = true;


onload = () => {
  // carrega os recursos salvos
  const lc = JSON.parse(localStorage.getItem('listasDeCompras'));
  if (lc) listasDeCompras = lc;
  const pc = JSON.parse(localStorage.getItem('produtosCompras'));
  if (pc) produtosCompras = pc;

  // cria um objeto com as abas
  let tabs = document.querySelectorAll('.navBar .tab');

  const mostra = (elem) => {
    if (elem) {
      for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
      elem.classList.add('active');
    }

    for (let i = 0; i < tabs.length; i++) {
      let comp = tabs[i].getAttribute('for');
      if (tabs[i].classList.contains('active'))
        document.querySelector('#' + comp).classList.remove('hidden');
      else document.querySelector('#' + comp).classList.add('hidden');
    }
  };

  for (let i = 0; i < tabs.length; i++)
    tabs[i].onclick = (e) => {
      mostra(e.target);
    };

  mostra();

  // carrega os vetores
  mostraListasCompras();

  // NavBar ---------------------------------------------
  document.querySelector('#tab1').onclick = () => {
    ativa('tela1');
  };
  document.querySelector('#tab2').onclick = () => {
    ativa('tela2');
  };
  // NavBar ---------------------------------------------

  // Formulario add lista de compras 
  document.querySelector('#addCompra').onclick = () => {
    // ativa a tela de formulario
    ativa('formulario');

    // foca no campo
    document.querySelector('#nome').focus();

    // esconde a barra de navegacao
    let nav = document.getElementById('nav').style;
    nav.visibility = 'hidden';

    // muda o titulo do formulario
    let lblNome = document.querySelector('#lblNome');
    lblNome.innerHTML = 'Adicionar lista de compras';

    // muda o nome do item do formulario
    let lblItem = document.querySelector('#lblItem');
    lblItem.innerHTML = 'Nome da Lista:';

    // esconde campos desnecessarios
    desabilitaCampos();

    // evento de inclusao
    document.querySelector('#btnInc').onclick = () => {
      let inputNome = document.getElementById('nome');

      // se o campo nao estiver vazio
      if (inputNome.value != '') {
        // insere o elemento
        listasDeCompras.push({
          id: Math.random().toString().replace('0.', ''),
          nome: inputNome.value,
        });
        // atualiza a lista
        mostraListasCompras();
        // salva localmente
        localStorage.setItem('listasDeCompras', JSON.stringify(listasDeCompras));

        // limpa o valor do campo
        inputNome.value = '';
        // volta a cor do field para o normal
        inputNome.style.borderColor = '#8f9799';

        // volta para tela anterior         
        ativa('tela1');

        // mostra a barra de navegacao
        nav.visibility = 'visible';
      } else { // caso de valor faltando no formulario
        // torna vermelho o campo com o valor faltando
        inputNome.style.borderColor = '#f00';
      }
    };

    // evento de cancelar
    document.querySelector('#btnCanc').onclick = () => {
      let inputNome = document.getElementById('nome');
      // limpa o valor do campo
      inputNome.value = '';
      // volta a cor do field para o normal
      inputNome.style.borderColor = '#8f9799';
      // volta para tela anterior         
      ativa('tela1');

      // mostra a barra de navegacao
      nav.visibility = 'visible';
    };
  }; // fim Formulario add lista de compras 


  // Formulario add produto para compra ---------------------------------------------
  document.querySelector('#addProduto').onclick = () => {
    // ativa a tela de formulario
    ativa('formulario');

    // foca no campo
    document.querySelector('#nome').focus();

    // esconde a barra de navegacao
    let nav = document.getElementById('nav').style;
    nav.visibility = 'hidden';

    // muda o titulo do formulario
    let lblNome = document.querySelector('#lblNome');
    lblNome.innerHTML = 'Adicionar Produto';

    // muda o nome do item do formulario
    let lblItem = document.querySelector('#lblItem');
    lblItem.innerHTML = 'Nome do Item:';

    // esconde campos desnecessarios
    desabilitaCampos();

    // habilita campos necessarios
    habilitaCampo('divQtd');
    habilitaCampo('divUnidade');

    // evento de inclusao
    document.querySelector('#btnInc').onclick = () => {
      // cria os objetos correspondentes aos campos do formulario
      let inputNome = document.getElementById('nome');
      let inputQtd = document.getElementById('qtd');
      let inputUnidade = document.getElementById('unidade');

      // torna vermelho o campo com o valor faltando 
      //ou remove o vermelho do campo com valor preenchido
      if (inputNome.value == '') inputNome.style.borderColor = '#f00';
      else inputNome.style.borderColor = '#8f9799';

      if (inputQtd.value == '') inputQtd.style.borderColor = '#f00';
      else inputQtd.style.borderColor = '#8f9799';

      if (inputUnidade.value == '') inputUnidade.style.borderColor = '#f00';
      else inputUnidade.style.borderColor = '#8f9799';

      // se os campos nao estiverem vazios
      if (inputNome.value != '' && inputQtd.value != '' && inputUnidade.value != '') {
        // insere o elemento
        produtosCompras.push({
          idLista: idLista,
          id: Math.random().toString().replace('0.', ''),
          nome: inputNome.value,
          qtd: inputQtd.value,
          unidade: inputUnidade.value
        });
        // atualiza a lista
        mostraProdutosCompra();
        // salva localmente
        localStorage.setItem('produtosCompras', JSON.stringify(produtosCompras));

        // limpa o valor dos campos
        inputNome.value = '';
        inputQtd.value = '';
        inputUnidade.value = '';

        // volta a cor dos fields para o normal
        inputNome.style.borderColor = '#8f9799';
        inputQtd.style.borderColor = '#8f9799';
        inputUnidade.style.borderColor = '#8f9799';

        // volta para tela anterior         
        ativa('tela3');

        // mostra a barra de navegacao
        nav.visibility = 'visible';
      }
    };

    // evento de cancelar
    document.querySelector('#btnCanc').onclick = () => {
      let inputNome = document.getElementById('nome');
      let inputQtd = document.getElementById('qtd');
      let inputUnidade = document.getElementById('unidade');

      // limpa o valor dos campos
      inputNome.value = '';
      inputQtd.value = '';
      inputUnidade.value = '';

      // volta a cor dos fields para o normal
      inputNome.style.borderColor = '#8f9799';
      inputQtd.style.borderColor = '#8f9799';
      inputUnidade.style.borderColor = '#8f9799';

      // volta para tela anterior         
      ativa('tela3');

      // mostra a barra de navegacao
      nav.visibility = 'visible';
    };
  }; // fim Formulario add produto para compra


}; // fim onload

const ativa = (comp) => {
  let listaDeTelas = document.querySelectorAll('body > .component');
  listaDeTelas.forEach((c) => c.classList.add('hidden'));
  document.querySelector('#' + comp).classList.remove('hidden');
};

const mostraListasCompras = () => {
  const lc = document.querySelector('#listaCompras');
  lc.innerHTML = '';
  listasDeCompras.forEach((i) => {
    // cria o elemento da lista
    let lista = document.createElement('li');
    let label = document.createElement('label');
    label.innerHTML = i.nome;
    label.setAttribute('data-id', i.id);
    label.setAttribute('class', 'blockLabel'); // aumenta a area para clicar no label
    lista.appendChild(label);

    // cria o botao de alterar do elemento
    let btnAlterar = document.createElement('BUTTON');
    btnAlterar.innerHTML = '<img src="imagens\\edit.png" />';
    btnAlterar.setAttribute('id', "btnListaCompra" + i.id);
    btnAlterar.setAttribute('class', 'button primary');
    lista.appendChild(btnAlterar);

    label.onclick = () => {
      // muda o nome da tela dos produtos
      let tituloCompra = document.querySelector('#tituloCompra');
      tituloCompra.innerHTML = i.nome;
      // mostra a tela produtosCompra
      ativa('tela3');
      // atualiza o idLista
      idLista = i.id;
      // carrega os produtos
      mostraProdutosCompra();
    };

    btnAlterar.onclick = () => {
      alterarListaCompras(i);
    };
    lc.appendChild(lista);

  }); // fim do for
}; // fim mostraListasCompras

const alterarListaCompras = (lista) => {
  // ativa a tela de formulario
  ativa('formulario');

  // preenche o campo
  document.querySelector('#nome').value = lista.nome;

  // foca no campo
  document.querySelector('#nome').focus();

  // esconde a barra de navegacao
  let nav = document.getElementById('nav').style;
  nav.visibility = 'hidden';

  // muda o titulo do formulario
  let lblNome = document.querySelector('#lblNome');
  lblNome.innerHTML = 'Alterar lista de compras';

  // muda o nome do item do formulario
  let lblItem = document.querySelector('#lblItem');
  lblItem.innerHTML = 'Nome da Lista:';

  // esconde campos desnecessarios
  desabilitaCampos();

  // muda o id dos botoes so pela semantica
  document.getElementById('btnInc').id = 'alteraCompra';
  document.getElementById('btnCanc').id = 'excluiCompra';

  // muda o texto dos botoes
  document.getElementById('alteraCompra').innerHTML = 'Salvar';
  document.getElementById('excluiCompra').innerHTML = 'Excluir';

  // evento de inclusao
  document.querySelector('#alteraCompra').onclick = () => {
    let inputNome = document.getElementById('nome');

    // se o campo nao estiver vazio
    if (inputNome.value != '') {
      // altera o elemento
      lista.nome = inputNome.value;
      // atualiza a lista
      mostraListasCompras();
      // salva localmente
      localStorage.setItem('listasDeCompras', JSON.stringify(listasDeCompras));

      // limpa o valor do campo
      inputNome.value = '';
      // volta a cor do field para o normal
      inputNome.style.borderColor = '#8f9799';
      // volta os botoes para o id generico
      document.getElementById('alteraCompra').id = 'btnInc';
      document.getElementById('excluiCompra').id = 'btnCanc';

      // volta o texto original dos botoes
      document.getElementById('btnInc').innerHTML = 'Incluir';
      document.getElementById('btnCanc').innerHTML = 'Cancelar';

      // volta para tela anterior         
      ativa('tela1');

      // mostra a barra de navegacao
      nav.visibility = 'visible';
    } else { // caso de valor faltando no formulario
      // torna vermelho o campo com o valor faltando
      inputNome.style.borderColor = '#f00';
    }
  };

  // evento de excluir
  document.querySelector('#excluiCompra').onclick = () => {
    let telaExclusao = document.getElementById('telaExclusao');
    // mostra a tela de exclusao
    telaExclusao.classList.remove("hidden");

    document.querySelector('#btnSim').onclick = () => {
      // exclui o elemento
      listasDeCompras = listasDeCompras.filter((obj) => obj.id != lista.id);
      // atualiza a lista
      mostraListasCompras();
      // salva localmente
      localStorage.setItem('listasDeCompras', JSON.stringify(listasDeCompras));

      let inputNome = document.getElementById('nome');
      // limpa o valor do campo
      inputNome.value = '';
      // volta a cor do field para o normal
      inputNome.style.borderColor = '#8f9799';
      inputNome.style.borderColor = '#8f9799';
      // volta os botoes para para o id generico
      document.getElementById('alteraCompra').id = 'btnInc';
      document.getElementById('excluiCompra').id = 'btnCanc';

      // volta o texto original do botao
      document.getElementById('btnInc').innerHTML = 'Incluir';
      document.getElementById('btnCanc').innerHTML = 'Cancelar';

      // volta para tela anterior         
      ativa('tela1');

      // mostra a barra de navegacao
      nav.visibility = 'visible';
    }

    document.querySelector('#btnNao').onclick = () => {
      // esconde a tela de exclusao
      telaExclusao.classList.add("hidden");
    }

  };
} // fim alterarListaCompras

const mostraProdutosCompra = () => {
  // cria um vetor de produtos da compra especifica
  let produtos = produtosCompras.filter((obj) => obj.idLista == idLista);

  // se nao houver produtos
  if (produtos.length == 0) {
    let enviarCompra = document.getElementById('enviarCompra');
    // esconde o botao de enviar para dispensa
    enviarCompra.classList.add("hidden");
  } else {
    // caso contrario mostra o botao de enviar para dispensa
    enviarCompra.classList.remove("hidden");
  }

  // cria o objeto dom que ira carregar os produtos
  const pc = document.querySelector('#produtosCompra');
  pc.innerHTML = '';

  // itera o vetor de produtos
  produtos.forEach((i) => {
    // cria a linha da tabela
    let tr = document.createElement('tr');

    // cria e edita os dados da linha
    let nome = document.createElement('td');
    nome.innerHTML = i.nome;
    let qtd = document.createElement('td');
    qtd.innerHTML = i.qtd;
    let unidade = document.createElement('td');
    unidade.innerHTML = i.unidade;

    // cria o checkbox
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.id = 'check' + i.id;
    checkbox.value = i.check;

    // insere o check box no td
    let checkArea = document.createElement('td');
    checkArea.appendChild(checkbox);


    // adiciona os dados a linha
    tr.appendChild(nome);
    tr.appendChild(qtd);
    tr.appendChild(unidade);
    tr.appendChild(checkArea);

    //alterar nome
    nome.onclick = () => {
      nome.onclick = () => {
        if (podeEditar) {
          // determina a flag como false para evitar outras alteracoes
          podeEditar = false;
          // cria o elemento para edicao
          var inputNome = document.createElement("INPUT");
          // define os atributos do elemento
          inputNome.setAttribute("type", "text");
          inputNome.setAttribute("class", "field alterarInput");
          inputNome.id = 'inputNome' + i.id;
          inputNome.value = i.nome;

          // adiciona o elemento no conteudo
          nome.innerHTML = '';
          nome.appendChild(inputNome);

          // cria o dom do elemento
          domQtd = document.querySelector('#inputNome' + i.id)
          
          // foca no elemento
          domQtd.focus();

          // se tiver blur salva a alteracao
          domQtd.addEventListener('blur', () => {
            podeEditar = true; // permite uma nova alteracao
            // altera o elemento no vetor
            let pos = produtosCompras.findIndex((obj) => obj.id==i.id);
            produtosCompras[pos].nome = inputNome.value;
            nome.innerHTML = i.nome; // altera na visualizacao

            // salva a alteracao
            localStorage.setItem('produtosCompras', JSON.stringify(produtosCompras));

          });

        } // fim do if pode editar
      }; // fim do segundo click
    }; // fim do nome.onclick()

    // alterar qtd
    qtd.onclick = () => {
      qtd.onclick = () => {
        if (podeEditar) {
          // determina a flag como false para evitar outras alteracoes
          podeEditar = false;
          // cria o elemento para edicao
          var inputQtd = document.createElement("INPUT");
          // define os atributos do elemento
          inputQtd.setAttribute("type", "number");
          inputQtd.setAttribute("class", "field alterarInput");
          inputQtd.id = 'inputQtd' + i.id;
          inputQtd.value = i.qtd;

          // adiciona o elemento no conteudo
          qtd.innerHTML = '';
          qtd.appendChild(inputQtd);

          // cria o dom do elemento
          domQtd = document.querySelector('#inputQtd' + i.id)
          
          // foca no elemento
          domQtd.focus();

          // se tiver blur salva a alteracao
          domQtd.addEventListener('blur', () => {
            podeEditar = true; // permite uma nova alteracao
            // altera o elemento no vetor
            let pos = produtosCompras.findIndex((obj) => obj.id==i.id);
            produtosCompras[pos].qtd = inputQtd.value;
            qtd.innerHTML = i.qtd; // altera na visualizacao

            // salva a alteracao
            localStorage.setItem('produtosCompras', JSON.stringify(produtosCompras));

          });

        } // fim do if pode editar
      }; // fim do segundo click
    }; // fim do qtd.onclick()

    // alterar unidade
    unidade.onclick = () => {
      unidade.onclick = () => {
        if (podeEditar) {
          // determina a flag como false para evitar outras alteracoes
          podeEditar = false;
          // cria o elemento para edicao
          var inputUnidade = document.createElement("INPUT");
          // define os atributos do elemento
          inputUnidade.setAttribute("type", "text");
          inputUnidade.setAttribute("class", "field alterarInput");
          inputUnidade.id = 'inputUnidade' + i.id;
          inputUnidade.value = i.unidade;

          // adiciona o elemento no conteudo
          unidade.innerHTML = '';
          unidade.appendChild(inputUnidade);

          // cria o dom do elemento
          domUnidade = document.querySelector('#inputUnidade' + i.id)
          
          // foca no elemento
          domUnidade.focus();

          // se tiver blur salva a alteracao
          domUnidade.addEventListener('blur', () => {
            podeEditar = true; // permite uma nova alteracao
            // altera o elemento no vetor
            let pos = produtosCompras.findIndex((obj) => obj.id==i.id);
            produtosCompras[pos].unidade = inputUnidade.value;
            unidade.innerHTML = i.unidade; // altera na visualizacao

            // salva a alteracao
            localStorage.setItem('produtosCompras', JSON.stringify(produtosCompras));

          });

        } // fim do if pode editar
      }; // fim do segundo click
    }; // fim do unidade.onclick()

    // adiciona a linha da tabela ao conteudo
    pc.appendChild(tr);

  }); // fim do for
}; // fim do mostraProdutosCompra

const alterarProdutoCompra = (idLista,id) => {
  
}; 

const desabilitaCampos = () => {
  // esconde campos opcionais
  let divQtd = document.getElementById('divQtd').style;
  divQtd.visibility = 'hidden'; divQtd.position = 'fixed'

  let divUnidade = document.getElementById('divUnidade').style;
  divUnidade.visibility = 'hidden'; divUnidade.position = 'fixed'

  let divValidade = document.getElementById('divValidade').style;
  divValidade.visibility = 'hidden'; divValidade.position = 'fixed'

}

const habilitaCampo = (idCampo) => {
  let elemento = document.getElementById(idCampo).style;
  elemento.visibility = 'visible'; elemento.position = 'relative';
}
