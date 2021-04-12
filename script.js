let listasDeCompras = [];
let produtosCompra = [];
let dispensa = [];

onload = () => {
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

  // Formulario add lista de compras
  document.querySelector('#addCompra').onclick = () => {
    // ativa a tela de formulario
    ativa('tela4');

    // muda o titulo do formulario
    const lblNome = document.querySelector('#lblNome');
    lblNome.innerHTML = 'Adicionar lista de compras';

    // muda o nome do item do formulario
    const lblItem = document.querySelector('#lblItem');
    lblItem.innerHTML = 'Nome da Lista:';

    // esconde campos desnecessarios
    const divQtd = document.getElementById('divQtd').style;
    divQtd.visibility = 'hidden'; divQtd.position = 'fixed'

    const divUnidade = document.getElementById('divUnidade').style;
    divUnidade.visibility = 'hidden'; divUnidade.position = 'fixed'

    const divValidade = document.getElementById('divValidade').style;
    divValidade.visibility = 'hidden'; divValidade.position = 'fixed'

    document.getElementById('btnInc').id = 'incCompra';

    document.querySelector('#incCompra').onclick = () => {
      document.getElementById('incCompra').id = 'btnInc';
      ativa('tela1')
    };
  };

  

  document.querySelector('#tab1').onclick = () => {
    ativa('tela1');
  };

  document.querySelector('#tab2').onclick = () => {
    ativa('tela2');
  };
};

const ativa = (comp) => {
  let listaDeTelas = document.querySelectorAll('body > .component');
  listaDeTelas.forEach((c) => c.classList.add('hidden'));
  document.querySelector('#' + comp).classList.remove('hidden');
};
