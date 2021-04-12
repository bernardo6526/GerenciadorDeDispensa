let listasDeCompras = [{ "id": "0", "nome": "Compra do Mês" }, { "id": "1", "nome": "Niver do Jairo" }];
let produtosCompra = [];
let dispensa = [];

onload = () => {
  const lc = JSON.parse(localStorage.getItem('listasDeCompras'));
  if (lc) listasDeCompras = lc;
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

  // Formulario add lista de compras ---------------------------------------------
  document.querySelector('#addCompra').onclick = () => {
    // ativa a tela de formulario
    ativa('tela4');

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
    let divQtd = document.getElementById('divQtd').style;
    divQtd.visibility = 'hidden'; divQtd.position = 'fixed'

    let divUnidade = document.getElementById('divUnidade').style;
    divUnidade.visibility = 'hidden'; divUnidade.position = 'fixed'

    let divValidade = document.getElementById('divValidade').style;
    divValidade.visibility = 'hidden'; divValidade.position = 'fixed'

    // muda o id dos botoes para executar funcoes especificas
    document.getElementById('btnInc').id = 'incCompra';
    document.getElementById('btnCanc').id = 'cancCompra';

    // evento de inclusao
    document.querySelector('#incCompra').onclick = () => {
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
        // volta os botoes para para o id generico
        document.getElementById('incCompra').id = 'btnInc';
        document.getElementById('cancCompra').id = 'btnCanc';
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
    document.querySelector('#cancCompra').onclick = () => {
      let inputNome = document.getElementById('nome');
      // limpa o valor do campo
      inputNome.value = '';
      // volta a cor do field para o normal
      inputNome.style.borderColor = '#8f9799';
      // volta os botoes para para o id generico
      document.getElementById('incCompra').id = 'btnInc';
      document.getElementById('cancCompra').id = 'btnCanc';
      // volta para tela anterior         
      ativa('tela1');

      // mostra a barra de navegacao
      nav.visibility = 'visible';
    };
  };
  // Formulario add lista de compras ---------------------------------------------


};

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
      ativa('tela3');
    };

    btnAlterar.onclick = () => {
      alterarListaCompras(i);
    };
    lc.appendChild(lista);

  }); // fim do for
};

const alterarListaCompras = (lista) => {
  // ativa a tela de formulario
  ativa('tela4');

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
  let divQtd = document.getElementById('divQtd').style;
  divQtd.visibility = 'hidden'; divQtd.position = 'fixed'

  let divUnidade = document.getElementById('divUnidade').style;
  divUnidade.visibility = 'hidden'; divUnidade.position = 'fixed'

  let telaExclusao = document.getElementById('divValidade').style;
  telaExclusao.visibility = 'hidden'; telaExclusao.position = 'fixed'

  // muda o id dos botoes para executar funcoes especificas
  document.getElementById('btnInc').id = 'alteraCompra';
  document.getElementById('btnCanc').id = 'excluiCompra';

  // muda o texto do botao
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

      // esconde a tela de exclusao
      telaExclusao.classList.add("hidden");
    }

    document.querySelector('#btnNao').onclick = () => {
      // esconde a tela de exclusao
      telaExclusao.classList.add("hidden");
    }

  };
} // fim alterar lista compras