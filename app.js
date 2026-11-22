var campanhas = [
  {
    id: 1,
    titulo: 'Campanha do Agasalho 2026',
    ong: 'Abrigo Esperança',
    endereco: 'Rua Exemplo, 100 - Centro',
    horario: 'Seg a Sex, 9h às 17h',
    categoria: 'Roupas',
    urgencia: 'Alta',
    progresso: 70,
    icone: '🧥',
    resumo: 'Casacos infantis, Cobertores',
    itens: [
      { id: 101, nome: 'Casaco tamanho 7 anos masculino', qtd: 2, atendido: false },
      { id: 102, nome: 'Casaco tamanho 4 anos feminino', qtd: 1, atendido: false },
      { id: 103, nome: 'Meias infantis', qtd: 10, atendido: true }
    ]
  },
  {
    id: 2,
    titulo: 'Volta às Aulas 2026',
    ong: 'Casa da Criança',
    endereco: 'Av. Central, 420 - Jardim Camburi',
    horario: 'Seg a Sex, 8h às 18h',
    categoria: 'Material Escolar',
    urgencia: 'Média',
    progresso: 45,
    icone: '📚',
    resumo: 'Cadernos, Mochilas, Lápis',
    itens: [
      { id: 201, nome: 'Caderno 96 folhas', qtd: 5, atendido: false },
      { id: 202, nome: 'Mochila escolar infantil', qtd: 3, atendido: false }
    ]
  },
  {
    id: 3,
    titulo: 'Cesta de Alimentos',
    ong: 'Lar Semente Você',
    endereco: 'Rua das Flores, 55 - Laranjeiras',
    horario: 'Seg a Sáb, 9h às 16h',
    categoria: 'Alimentos',
    urgencia: 'Alta',
    progresso: 25,
    icone: '📦',
    resumo: 'Cestas básicas, Leite em pó',
    itens: [
      { id: 301, nome: 'Cesta básica completa', qtd: 8, atendido: false },
      { id: 302, nome: 'Leite em pó integral', qtd: 12, atendido: false }
    ]
  },
  {
    id: 4,
    titulo: 'Apoio Emergencial - Vale Verde',
    ong: 'Instituto Mãos Unidas',
    endereco: 'Ginásio Municipal Central',
    horario: 'Todos os dias, 24h',
    categoria: 'Emergência',
    urgencia: 'Alta',
    progresso: 40,
    icone: '🚨',
    resumo: 'Água potável, Colchões, Produtos de higiene',
    itens: [
      { id: 401, nome: 'Fardo de água potável', qtd: 20, atendido: false },
      { id: 402, nome: 'Kit de higiene pessoal', qtd: 15, atendido: false }
    ]
  }
];

var minhasDoacoes = [
  { item: '2x Casaco tamanho 7 anos masculino', local: 'Abrigo Esperança', data: '2026-11-28', status: 'Agendada' }
];

var conversas = [
  {
    id: 1,
    ong: 'Abrigo Esperança',
    mensagens: [
      { tipo: 'enviada', texto: 'Olá, tenho 2 casacos para doar', hora: '10:02 ✓✓' },
      { tipo: 'recebida', texto: 'Ótimo! Pode trazer amanhã das 9h às 17h', hora: '10:05' }
    ]
  },
  {
    id: 2,
    ong: 'Casa da Criança',
    mensagens: [
      { tipo: 'recebida', texto: 'Obrigada pela doação!', hora: 'Ontem' }
    ]
  }
];

var pendenciasAdmin = [
  { id: 1, nome: 'Instituto Mãos Unidas', tipo: 'Entidade', cnpj: '14.222.333/0001-55', status: 'Pendente' },
  { id: 2, nome: 'Campanha Natal Sem Fome', tipo: 'Campanha', cnpj: '12.345.678/0001-90', status: 'Pendente' }
];

var perfilAtual = 'visitante';
var categoriaAtual = 'Todas';
var campanhaSelecionadaId = 1;
var conversaAtualId = 1;

function atualizarMenu() {
  var menu = document.getElementById('menu-principal');
  var botoes = document.getElementById('botoes-usuario');

  if (perfilAtual === 'visitante') {
    menu.innerHTML =
      '<a class="menu-link" onclick="mostrarTela(\'tela-home\')">Início</a>' +
      '<a class="menu-link" onclick="mostrarTela(\'tela-buscar\')">Campanhas</a>' +
      '<a class="menu-link" onclick="mostrarTela(\'tela-login\')">Entrar</a>';
    botoes.innerHTML = '<button class="botao botao-primario" onclick="mostrarTela(\'tela-login\')">Entrar / Login</button>';
  } else if (perfilAtual === 'doador') {
    menu.innerHTML =
      '<a class="menu-link" onclick="mostrarTela(\'tela-home\')">Início</a>' +
      '<a class="menu-link" onclick="mostrarTela(\'tela-buscar\')">Buscar Campanhas</a>' +
      '<a class="menu-link" onclick="mostrarTela(\'tela-minhas-doacoes\')">Minhas Doações</a>';
    botoes.innerHTML =
      '<span class="etiqueta etiqueta-azul">Doador</span>' +
      '<button class="botao botao-sair" onclick="fazerLogout()">Sair</button>';
  } else if (perfilAtual === 'entidade') {
    menu.innerHTML =
      '<a class="menu-link" onclick="mostrarTela(\'tela-ong-dashboard\')">Necessidades (CRUD)</a>' +
      '<a class="menu-link" onclick="mostrarTela(\'tela-ong-nova\')">Nova Campanha</a>' +
      '<a class="menu-link" onclick="mostrarTela(\'tela-mensagens\')">Mensagens</a>';
    botoes.innerHTML =
      '<span class="etiqueta etiqueta-verde">Entidade</span>' +
      '<button class="botao botao-sair" onclick="fazerLogout()">Sair</button>';
  } else if (perfilAtual === 'admin') {
    menu.innerHTML =
      '<a class="menu-link" onclick="mostrarTela(\'tela-admin-aprovacao\')">Aprovações</a>' +
      '<a class="menu-link" onclick="mostrarTela(\'tela-admin-relatorios\')">Relatórios</a>' +
      '<a class="menu-link" onclick="mostrarTela(\'tela-buscar\')">Campanhas</a>';
    botoes.innerHTML =
      '<span class="etiqueta etiqueta-rosa">Administrador</span>' +
      '<button class="botao botao-sair" onclick="fazerLogout()">Sair</button>';
  }
}

function mostrarTela(idTela) {
  var telas = document.querySelectorAll('.tela');
  for (var i = 0; i < telas.length; i++) {
    telas[i].classList.remove('ativa');
  }

  var tela = document.getElementById(idTela);
  if (tela) {
    tela.classList.add('ativa');
  }

  window.scrollTo(0, 0);

  if (idTela === 'tela-home') desenharCampanhasHome();
  if (idTela === 'tela-buscar') desenharBusca();
  if (idTela === 'tela-minhas-doacoes') desenharMinhasDoacoes();
  if (idTela === 'tela-ong-dashboard') desenharDashboardOng();
  if (idTela === 'tela-mensagens') desenharChat();
  if (idTela === 'tela-admin-aprovacao') desenharAprovacaoAdmin();
}

function validarLogin(evento) {
  evento.preventDefault();
  var usuario = document.getElementById('login-usuario').value.trim();
  var senha = document.getElementById('login-senha').value.trim();
  var erroBox = document.getElementById('erro-login');

  if (usuario === 'doador' && senha === 'doa#2026') {
    perfilAtual = 'doador';
    erroBox.style.display = 'none';
    atualizarMenu();
    mostrarTela('tela-buscar');
  } else if (usuario === 'entidade' && senha === 'ent!2026') {
    perfilAtual = 'entidade';
    erroBox.style.display = 'none';
    atualizarMenu();
    mostrarTela('tela-ong-dashboard');
  } else if (usuario === 'admin' && senha === 'adm@2026') {
    perfilAtual = 'admin';
    erroBox.style.display = 'none';
    atualizarMenu();
    mostrarTela('tela-admin-aprovacao');
  } else {
    erroBox.style.display = 'block';
  }
}

function fazerLogout() {
  perfilAtual = 'visitante';
  atualizarMenu();
  mostrarTela('tela-login');
}

function mudarCategoria(novaCategoria, botaoClicado) {
  categoriaAtual = novaCategoria;
  var botoes = document.querySelectorAll('.filtros-rapidos .chip');
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].classList.remove('ativo');
  }
  botaoClicado.classList.add('ativo');
  desenharCampanhasHome();
}

function desenharCampanhasHome() {
  var caixa = document.getElementById('lista-campanhas-home');
  var textoBusca = document.getElementById('campo-busca-home').value.toLowerCase();
  var html = '';

  for (var i = 0; i < campanhas.length; i++) {
    var c = campanhas[i];
    var passaCategoria = categoriaAtual === 'Todas' || c.categoria === categoriaAtual;
    var passaBusca =
      c.titulo.toLowerCase().indexOf(textoBusca) !== -1 ||
      c.ong.toLowerCase().indexOf(textoBusca) !== -1 ||
      c.resumo.toLowerCase().indexOf(textoBusca) !== -1;

    if (passaCategoria && passaBusca) {
      var corTag = c.categoria === 'Emergência' ? 'etiqueta-vermelha' : 'etiqueta-rosa';
      html += '<article class="card">';
      html += '  <div class="capa-campanha">';
      html += '    <span class="etiqueta ' + corTag + '">' + c.categoria + '</span>';
      html += '    <span style="font-size:36px;">' + c.icone + '</span>';
      html += '  </div>';
      html += '  <h3 class="titulo-destaque" style="font-size:18px; margin-bottom:6px;">' + c.titulo + '</h3>';
      html += '  <div style="color:#41BDD9; font-weight:700; font-size:14px;">' + c.ong + ' • ✓ Verificada</div>';
      html += '  <div class="barra-progresso"><div class="barra-progresso-preenchida" style="width:' + c.progresso + '%;"></div></div>';
      html += '  <div style="display:flex; justify-content:space-between; align-items:center;">';
      html += '    <strong style="font-size:14px;">' + c.progresso + '% arrecadado</strong>';
      html += '    <button class="botao botao-primario botao-pequeno" onclick="abrirCampanha(' + c.id + ')">Doar agora</button>';
      html += '  </div>';
      html += '</article>';
    }
  }

  caixa.innerHTML = html;
}

function irParaBusca() {
  document.getElementById('campo-busca-lista').value = document.getElementById('campo-busca-home').value;
  mostrarTela('tela-buscar');
}

function desenharBusca() {
  var caixa = document.getElementById('resultado-busca-lista');
  var texto = document.getElementById('campo-busca-lista').value.toLowerCase();
  var catSel = document.querySelector('input[name="filtro-cat"]:checked').value;
  var urgSel = document.querySelector('input[name="filtro-urg"]:checked').value;
  var html = '';

  for (var i = 0; i < campanhas.length; i++) {
    var c = campanhas[i];
    var combinaTexto =
      c.ong.toLowerCase().indexOf(texto) !== -1 ||
      c.titulo.toLowerCase().indexOf(texto) !== -1 ||
      c.resumo.toLowerCase().indexOf(texto) !== -1;
    var combinaCat = catSel === 'Todas' || c.categoria === catSel;
    var combinaUrg = urgSel === 'Todas' || c.urgencia === urgSel;

    if (combinaTexto && combinaCat && combinaUrg) {
      html += '<article class="card card-instituicao">';
      html += '  <div>';
      html += '    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px;">';
      html += '      <strong class="titulo-destaque" style="font-size:18px;">' + c.titulo + '</strong>';
      html += '      <span class="etiqueta etiqueta-verde">✓ Verificada</span>';
      html += '      <span class="etiqueta etiqueta-vermelha">Urgência ' + c.urgencia + '</span>';
      html += '    </div>';
      html += '    <div style="color:#6B5E58; font-size:14px;">' + c.ong + ' • ' + c.endereco + '</div>';
      html += '    <div style="font-weight:700; font-size:14px; margin-top:4px;">Precisa de: ' + c.resumo + '</div>';
      html += '  </div>';
      html += '  <button class="botao botao-primario" onclick="abrirCampanha(' + c.id + ')">Ver Necessidades</button>';
      html += '</article>';
    }
  }

  if (html === '') {
    html = '<div class="card"><p style="color:#6B5E58;">Nenhuma campanha encontrada com esses filtros.</p></div>';
  }
  caixa.innerHTML = html;
}

function mudarModoBusca(modo) {
  var areaLista = document.getElementById('resultado-busca-lista');
  var areaMapa = document.getElementById('resultado-busca-mapa');
  var btnLista = document.getElementById('btn-modo-lista');
  var btnMapa = document.getElementById('btn-modo-mapa');

  if (modo === 'lista') {
    areaLista.style.display = 'block';
    areaMapa.style.display = 'none';
    btnLista.className = 'botao botao-primario';
    btnMapa.className = 'botao botao-claro';
  } else {
    areaLista.style.display = 'none';
    areaMapa.style.display = 'flex';
    btnLista.className = 'botao botao-claro';
    btnMapa.className = 'botao botao-primario';
  }
}

function buscarCampanhaPorId(id) {
  for (var i = 0; i < campanhas.length; i++) {
    if (campanhas[i].id === id) return campanhas[i];
  }
  return campanhas[0];
}

function abrirCampanha(id) {
  campanhaSelecionadaId = id;
  var c = buscarCampanhaPorId(id);

  document.getElementById('detalhe-categoria').textContent = c.categoria + ' • Urgência ' + c.urgencia;
  document.getElementById('detalhe-titulo').textContent = c.titulo;
  document.getElementById('detalhe-subtitulo').textContent = c.ong + ' • ' + c.progresso + '% da meta arrecadada';
  document.getElementById('detalhe-barra').style.width = c.progresso + '%';
  document.getElementById('detalhe-ong-nome').textContent = c.ong;
  document.getElementById('detalhe-ong-info').innerHTML = '📍 ' + c.endereco + '<br />🕒 ' + c.horario;

  var htmlItens = '';
  for (var i = 0; i < c.itens.length; i++) {
    var item = c.itens[i];
    if (item.atendido) {
      htmlItens += '<div style="display:flex; justify-content:space-between; align-items:center; padding:12px 14px; border-radius:12px; margin-bottom:10px; background-color:#E8F9FC;">';
      htmlItens += '  <span style="color:#6B5E58; text-decoration:line-through;">☑ ' + item.nome + '</span>';
      htmlItens += '  <span class="etiqueta etiqueta-azul">Já atendido</span>';
      htmlItens += '</div>';
    } else {
      htmlItens += '<div style="padding:12px 14px; border-radius:12px; margin-bottom:10px; background-color:#FAF7F5; font-weight:700;">';
      htmlItens += '  ☐ ' + item.nome + ' (faltam ' + item.qtd + ')';
      htmlItens += '</div>';
    }
  }

  document.getElementById('detalhe-itens').innerHTML = htmlItens;
  mostrarTela('tela-campanha');
}

function abrirFormularioDoacao() {
  var c = buscarCampanhaPorId(campanhaSelecionadaId);
  document.getElementById('doar-subtitulo').textContent = c.titulo + ' • ' + c.ong;
  document.getElementById('doar-ponto').value = c.ong + ' - ' + c.endereco;

  var select = document.getElementById('doar-item');
  var opcoes = '';
  for (var i = 0; i < c.itens.length; i++) {
    if (!c.itens[i].atendido) {
      opcoes += '<option value="' + c.itens[i].nome + '">' + c.itens[i].nome + '</option>';
    }
  }
  select.innerHTML = opcoes;
  mostrarTela('tela-doar');
}

function enviarDoacao(evento) {
  evento.preventDefault();
  var emailInput = document.getElementById('doar-email');
  var erroBox = document.getElementById('erro-email');
  var email = emailInput.value;

  if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
    emailInput.classList.add('erro');
    erroBox.style.display = 'block';
    return;
  }

  emailInput.classList.remove('erro');
  erroBox.style.display = 'none';

  var item = document.getElementById('doar-item').value;
  var qtd = document.getElementById('doar-quantidade').value;
  var ponto = document.getElementById('doar-ponto').value;
  var data = document.getElementById('doar-data').value;

  minhasDoacoes.unshift({
    item: qtd + 'x ' + item,
    local: ponto,
    data: data,
    status: 'Agendada'
  });

  document.getElementById('confirmado-resumo').textContent = 'Você registrou: ' + qtd + 'x ' + item;
  document.getElementById('confirmado-ponto').textContent = 'Ponto de coleta: ' + ponto;
  document.getElementById('confirmado-data').textContent = 'Data prevista: ' + data;

  mostrarTela('tela-confirmado');
}

function desenharMinhasDoacoes() {
  var caixa = document.getElementById('lista-minhas-doacoes');
  var html = '';
  for (var i = 0; i < minhasDoacoes.length; i++) {
    var d = minhasDoacoes[i];
    html += '<div style="display:flex; justify-content:space-between; align-items:center; padding:14px; border-radius:12px; background-color:#FAF7F5; margin-bottom:10px; flex-wrap:wrap; gap:10px;">';
    html += '  <div><strong>' + d.item + '</strong><div style="color:#6B5E58; font-size:13px;">' + d.local + ' • Data: ' + d.data + '</div></div>';
    html += '  <span class="etiqueta etiqueta-azul">' + d.status + '</span>';
    html += '</div>';
  }
  caixa.innerHTML = html;
}

function desenharDashboardOng() {
  var tabela = document.getElementById('tabela-itens-ong');
  var html = '';
  var totalPendentes = 0;
  var c = campanhas[0];

  for (var i = 0; i < c.itens.length; i++) {
    var item = c.itens[i];
    if (!item.atendido) totalPendentes++;

    html += '<div class="linha-tabela">';
    html += '  <strong>' + item.nome + '</strong>';
    html += '  <span>' + item.qtd + '</span>';
    if (item.atendido) {
      html += '  <span><span class="etiqueta etiqueta-verde">Recebido ✓</span></span>';
    } else {
      html += '  <span><span class="etiqueta etiqueta-amarela">Pendente</span></span>';
    }
    html += '  <div class="acoes-linha">';
    html += '    <button class="botao botao-editar botao-pequeno" onclick="iniciarEdicao(' + item.id + ')">Editar</button>';
    html += '    <button class="botao botao-excluir botao-pequeno" onclick="excluirNecessidade(' + item.id + ')">Excluir</button>';
    if (!item.atendido) {
      html += '    <button class="botao botao-primario botao-pequeno" onclick="marcarComoAtendido(' + item.id + ')">Recebido</button>';
    }
    html += '  </div>';
    html += '</div>';
  }

  tabela.innerHTML = html;
  document.getElementById('kpi-pendentes').textContent = totalPendentes;
  document.getElementById('kpi-campanhas').textContent = campanhas.length;
}

function salvarNecessidade() {
  var idEdicao = document.getElementById('crud-id-edicao').value;
  var nome = document.getElementById('crud-nome').value.trim();
  var qtd = Number(document.getElementById('crud-qtd').value);
  if (nome === '' || qtd < 1) return;

  var c = campanhas[0];

  if (idEdicao === '') {
    c.itens.push({
      id: Date.now(),
      nome: nome,
      qtd: qtd,
      atendido: false
    });
  } else {
    for (var i = 0; i < c.itens.length; i++) {
      if (c.itens[i].id === Number(idEdicao)) {
        c.itens[i].nome = nome;
        c.itens[i].qtd = qtd;
      }
    }
  }

  cancelarEdicao();
  desenharDashboardOng();
}

function iniciarEdicao(idItem) {
  var c = campanhas[0];
  for (var i = 0; i < c.itens.length; i++) {
    if (c.itens[i].id === idItem) {
      document.getElementById('crud-id-edicao').value = c.itens[i].id;
      document.getElementById('crud-nome').value = c.itens[i].nome;
      document.getElementById('crud-qtd').value = c.itens[i].qtd;
      document.getElementById('titulo-form-crud').textContent = 'Editar Necessidade';
      document.getElementById('btn-salvar-crud').textContent = 'Salvar Alteração';
      document.getElementById('btn-cancelar-crud').style.display = 'inline-flex';
    }
  }
}

function cancelarEdicao() {
  document.getElementById('crud-id-edicao').value = '';
  document.getElementById('crud-nome').value = '';
  document.getElementById('crud-qtd').value = 1;
  document.getElementById('titulo-form-crud').textContent = 'Cadastrar Nova Necessidade';
  document.getElementById('btn-salvar-crud').textContent = 'Adicionar';
  document.getElementById('btn-cancelar-crud').style.display = 'none';
}

function excluirNecessidade(idItem) {
  var c = campanhas[0];
  var novaLista = [];
  for (var i = 0; i < c.itens.length; i++) {
    if (c.itens[i].id !== idItem) {
      novaLista.push(c.itens[i]);
    }
  }
  c.itens = novaLista;
  desenharDashboardOng();
}

function marcarComoAtendido(idItem) {
  var c = campanhas[0];
  for (var i = 0; i < c.itens.length; i++) {
    if (c.itens[i].id === idItem) {
      c.itens[i].atendido = true;
    }
  }
  desenharDashboardOng();
}

function publicarCampanha() {
  var titulo = document.getElementById('nova-titulo').value.trim();
  var categoria = document.getElementById('nova-categoria').value;
  var nomeItem = document.getElementById('nova-item').value.trim();
  var qtd = Number(document.getElementById('nova-qtd').value);

  if (titulo === '') titulo = 'Nova Campanha Solidária';
  if (nomeItem === '') nomeItem = 'Item essencial';

  campanhas.unshift({
    id: Date.now(),
    titulo: titulo,
    ong: 'Abrigo Esperança',
    endereco: 'Rua Exemplo, 100 - Centro',
    horario: 'Seg a Sex, 9h às 17h',
    categoria: categoria,
    urgencia: 'Alta',
    progresso: 0,
    icone: '🎁',
    resumo: nomeItem,
    itens: [{ id: Date.now() + 1, nome: nomeItem, qtd: qtd, atendido: false }]
  });

  mostrarTela('tela-ong-dashboard');
}

function desenharChat() {
  var lista = document.getElementById('lista-conversas');
  var htmlLista = '';
  var conversaAtual = conversas[0];

  for (var i = 0; i < conversas.length; i++) {
    var conv = conversas[i];
    if (conv.id === conversaAtualId) conversaAtual = conv;
    var classeAtiva = conv.id === conversaAtualId ? 'ativa' : '';
    var ultimaMsg = conv.mensagens[conv.mensagens.length - 1].texto;

    htmlLista += '<div class="item-conversa ' + classeAtiva + '" onclick="abrirConversa(' + conv.id + ')">';
    htmlLista += '  <div style="font-weight:800; font-size:15px;">👤 ' + conv.ong + '</div>';
    htmlLista += '  <div style="color:#6B5E58; font-size:13px;">' + ultimaMsg + '</div>';
    htmlLista += '</div>';
  }
  lista.innerHTML = htmlLista;

  document.getElementById('chat-nome-ong').textContent = conversaAtual.ong;
  var bolhas = '';
  for (var j = 0; j < conversaAtual.mensagens.length; j++) {
    var m = conversaAtual.mensagens[j];
    var classeBolha = m.tipo === 'enviada' ? 'bolha-enviada' : 'bolha-recebida';
    bolhas += '<div class="bolha ' + classeBolha + '">' + m.texto + ' <span style="opacity:0.75; font-size:12px; margin-left:8px;">' + m.hora + '</span></div>';
  }
  document.getElementById('chat-bolhas').innerHTML = bolhas;
}

function abrirConversa(id) {
  conversaAtualId = id;
  desenharChat();
}

function enviarMensagem() {
  var campo = document.getElementById('campo-mensagem');
  var texto = campo.value.trim();
  if (texto === '') return;

  for (var i = 0; i < conversas.length; i++) {
    if (conversas[i].id === conversaAtualId) {
      conversas[i].mensagens.push({ tipo: 'enviada', texto: texto, hora: 'Agora ✓✓' });
    }
  }
  campo.value = '';
  desenharChat();
}

function desenharAprovacaoAdmin() {
  var caixa = document.getElementById('lista-aprovacao-admin');
  var html = '';
  for (var i = 0; i < pendenciasAdmin.length; i++) {
    var p = pendenciasAdmin[i];
    html += '<div style="display:flex; justify-content:space-between; align-items:center; padding:14px; border-radius:12px; background-color:#FAF7F5; margin-bottom:10px; flex-wrap:wrap; gap:10px;">';
    html += '  <div><strong>' + p.nome + '</strong><div style="color:#6B5E58; font-size:13px;">' + p.tipo + ' • CNPJ: ' + p.cnpj + '</div></div>';
    if (p.status === 'Pendente') {
      html += '  <div class="acoes-linha">';
      html += '    <button class="botao botao-primario botao-pequeno" onclick="alterarStatusAdmin(' + p.id + ', \'Aprovado\')">Aprovar</button>';
      html += '    <button class="botao botao-excluir botao-pequeno" onclick="alterarStatusAdmin(' + p.id + ', \'Rejeitado\')">Rejeitar</button>';
      html += '  </div>';
    } else {
      var cor = p.status === 'Aprovado' ? 'etiqueta-verde' : 'etiqueta-vermelha';
      html += '  <span class="etiqueta ' + cor + '">' + p.status + '</span>';
    }
    html += '</div>';
  }
  caixa.innerHTML = html;
}

function alterarStatusAdmin(id, novoStatus) {
  for (var i = 0; i < pendenciasAdmin.length; i++) {
    if (pendenciasAdmin[i].id === id) {
      pendenciasAdmin[i].status = novoStatus;
    }
  }
  desenharAprovacaoAdmin();
}

atualizarMenu();
desenharCampanhasHome();
