/* ============================================
   ABRAÇO - Rede Solidária
   Lógica simples em JavaScript puro
   ============================================ */

// Lista de campanhas (dados de exemplo do projeto)
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
  }
];

// Lista de conversas do chat
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
  },
  {
    id: 3,
    ong: 'Lar Semente Você',
    mensagens: [
      { tipo: 'enviada', texto: 'Vocês têm tamanho 4?', hora: 'Seg' }
    ]
  }
];

// Variáveis que guardam o que está selecionado no momento
var categoriaAtual = 'Todas';
var campanhaSelecionadaId = 1;
var conversaAtualId = 1;
var perfilLogin = 'doador';

// ============================================
// 1. NAVEGAÇÃO ENTRE TELAS
// ============================================
function mostrarTela(idTela) {
  // Pega todas as sections com classe "tela" e esconde uma por uma
  var telas = document.querySelectorAll('.tela');
  for (var i = 0; i < telas.length; i++) {
    telas[i].classList.remove('ativa');
  }

  // Mostra apenas a tela desejada
  var telaEscolhida = document.getElementById(idTela);
  if (telaEscolhida) {
    telaEscolhida.classList.add('ativa');
  }

  // Volta a rolagem da página para o topo
  window.scrollTo(0, 0);

  // Atualiza os dados da tela aberta
  if (idTela === 'tela-home') desenharCampanhasHome();
  if (idTela === 'tela-buscar') desenharBusca();
  if (idTela === 'tela-ong-dashboard') desenharDashboardOng();
  if (idTela === 'tela-mensagens') desenharChat();
}

// ============================================
// 2. HOME E FILTRO DE CAMPANHAS
// ============================================
function mudarCategoria(novaCategoria, botaoClicado) {
  categoriaAtual = novaCategoria;

  // Tira o destaque dos outros botões e marca o clicado
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

    // Verifica filtro de categoria
    var passaCategoria = false;
    if (categoriaAtual === 'Todas') {
      passaCategoria = true;
    } else if (categoriaAtual === 'Urgente' && c.urgencia === 'Alta') {
      passaCategoria = true;
    } else if (c.categoria === categoriaAtual) {
      passaCategoria = true;
    }

    // Verifica texto digitado na busca
    var passaBusca =
      c.titulo.toLowerCase().indexOf(textoBusca) !== -1 ||
      c.ong.toLowerCase().indexOf(textoBusca) !== -1 ||
      c.resumo.toLowerCase().indexOf(textoBusca) !== -1;

    if (passaCategoria && passaBusca) {
      var corTag = c.urgencia === 'Alta' ? 'etiqueta-rosa' : 'etiqueta-coral';

      html += '<div class="card">';
      html += '  <div class="capa-campanha">';
      html += '    <span class="etiqueta ' + corTag + '">' + c.categoria + '</span>';
      html += '    <span style="font-size:38px;">' + c.icone + '</span>';
      html += '  </div>';
      html += '  <h3 class="titulo-destaque" style="font-size:19px; margin-bottom:6px;">' + c.titulo + '</h3>';
      html += '  <div style="color:#41BDD9; font-weight:700; font-size:14px;">' + c.ong + ' • ✓ Verificada</div>';
      html += '  <div class="barra-progresso"><div class="barra-progresso-preenchida" style="width:' + c.progresso + '%;"></div></div>';
      html += '  <div style="display:flex; justify-content:space-between; align-items:center;">';
      html += '    <strong style="font-size:14px;">' + c.progresso + '% arrecadado</strong>';
      html += '    <button class="botao botao-primario botao-pequeno" onclick="abrirCampanha(' + c.id + ')">Doar agora</button>';
      html += '  </div>';
      html += '</div>';
    }
  }

  caixa.innerHTML = html;
}

function irParaBusca() {
  var texto = document.getElementById('campo-busca-home').value;
  document.getElementById('campo-busca-lista').value = texto;
  mostrarTela('tela-buscar');
}

// ============================================
// 3. TELA DE BUSCA (LISTA E MAPA)
// ============================================
function desenharBusca() {
  var caixa = document.getElementById('resultado-busca-lista');
  var texto = document.getElementById('campo-busca-lista').value.toLowerCase();
  var html = '';

  for (var i = 0; i < campanhas.length; i++) {
    var c = campanhas[i];
    var combina =
      c.ong.toLowerCase().indexOf(texto) !== -1 ||
      c.titulo.toLowerCase().indexOf(texto) !== -1 ||
      c.resumo.toLowerCase().indexOf(texto) !== -1;

    if (combina) {
      html += '<div class="card card-instituicao">';
      html += '  <div>';
      html += '    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px;">';
      html += '      <strong class="titulo-destaque" style="font-size:18px;">' + c.ong + '</strong>';
      html += '      <span class="etiqueta etiqueta-verde">✓ Verificada</span>';
      html += '      <span class="etiqueta etiqueta-vermelha">Urgência ' + c.urgencia + '</span>';
      html += '    </div>';
      html += '    <div style="color:#6B5E58; font-size:14px;">' + c.endereco + '</div>';
      html += '    <div style="font-weight:700; font-size:14px; margin-top:4px;">Precisa de: ' + c.resumo + '</div>';
      html += '  </div>';
      html += '  <button class="botao botao-primario" onclick="abrirCampanha(' + c.id + ')">Ver Necessidades</button>';
      html += '</div>';
    }
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

// ============================================
// 4. DETALHE DA CAMPANHA E DOAÇÃO
// ============================================
function buscarCampanhaPorId(id) {
  for (var i = 0; i < campanhas.length; i++) {
    if (campanhas[i].id === id) {
      return campanhas[i];
    }
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

  // Monta a lista de itens necessários
  var htmlItens = '';
  for (var i = 0; i < c.itens.length; i++) {
    var item = c.itens[i];
    if (item.atendido) {
      htmlItens += '<div style="display:flex; justify-content:space-between; align-items:center; padding:14px 16px; border-radius:12px; margin-bottom:10px; background-color:#E8F9FC;">';
      htmlItens += '  <span style="color:#6B5E58; text-decoration:line-through;">☑ ' + item.nome + ' — já atendido</span>';
      htmlItens += '  <span class="etiqueta etiqueta-azul">Já atendido</span>';
      htmlItens += '</div>';
    } else {
      htmlItens += '<div style="padding:14px 16px; border-radius:12px; margin-bottom:10px; background-color:#FAF7F5; font-weight:700;">';
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
  document.getElementById('doar-ponto').value = 'Sede do ' + c.ong + ' - ' + c.endereco;

  // Preenche o select apenas com os itens que ainda não foram atendidos
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

function enviarDoacao() {
  var emailInput = document.getElementById('doar-email');
  var erroBox = document.getElementById('erro-email');
  var email = emailInput.value;

  // Validação simples de e-mail (verifica se tem @ e .)
  if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
    emailInput.classList.add('erro');
    erroBox.style.display = 'block';
    return;
  }

  emailInput.classList.remove('erro');
  erroBox.style.display = 'none';

  // Monta os dados da tela de confirmação
  var item = document.getElementById('doar-item').value;
  var qtd = document.getElementById('doar-quantidade').value;
  var ponto = document.getElementById('doar-ponto').value;
  var dia = document.getElementById('doar-dia').value;
  var mes = document.getElementById('doar-mes').value;
  var ano = document.getElementById('doar-ano').value;

  document.getElementById('confirmado-resumo').textContent = 'Você registrou: ' + qtd + 'x ' + item;
  document.getElementById('confirmado-ponto').textContent = 'Ponto de coleta: ' + ponto;
  document.getElementById('confirmado-data').textContent = 'Data prevista: ' + dia + '/' + mes + '/' + ano;

  mostrarTela('tela-confirmado');
}

// ============================================
// 5. LOGIN E LOGOUT
// ============================================
function selecionarPerfilLogin(perfil) {
  perfilLogin = perfil;
  var abaDoador = document.getElementById('aba-doador');
  var abaOng = document.getElementById('aba-ong');
  var campoCnpj = document.getElementById('campo-cnpj');

  if (perfil === 'ong') {
    abaOng.classList.add('ativo');
    abaDoador.classList.remove('ativo');
    campoCnpj.style.display = 'block';
  } else {
    abaDoador.classList.add('ativo');
    abaOng.classList.remove('ativo');
    campoCnpj.style.display = 'none';
  }
}

function fazerLogin() {
  var botoesTopo = document.getElementById('botoes-usuario');
  botoesTopo.innerHTML =
    '<button class="botao botao-primario" onclick="mostrarTela(\'tela-mensagens\')">👤 Minha Conta</button>' +
    '<button class="botao botao-sair" onclick="fazerLogout()">Sair</button>';

  if (perfilLogin === 'ong') {
    mostrarTela('tela-ong-dashboard');
  } else {
    mostrarTela('tela-home');
  }
}

function fazerLogout() {
  var botoesTopo = document.getElementById('botoes-usuario');
  botoesTopo.innerHTML = '<button class="botao botao-primario" onclick="mostrarTela(\'tela-login\')">Entrar / Cadastrar</button>';
  mostrarTela('tela-login');
}

// ============================================
// 6. PAINEL DA ONG (DASHBOARD E NOVA CAMPANHA)
// ============================================
function desenharDashboardOng() {
  var tabela = document.getElementById('tabela-itens-ong');
  var html = '';
  var totalPendentes = 0;

  for (var i = 0; i < campanhas.length; i++) {
    var c = campanhas[i];
    for (var j = 0; j < c.itens.length; j++) {
      var item = c.itens[j];
      if (!item.atendido) {
        totalPendentes++;
      }

      html += '<div class="linha-tabela">';
      html += '  <strong>' + item.nome + '</strong>';
      html += '  <span>' + item.qtd + '</span>';

      if (item.atendido) {
        html += '  <span><span class="etiqueta etiqueta-verde">Recebido ✓</span></span>';
        html += '  <span style="color:#6B5E58; font-size:13px;">Concluído</span>';
      } else {
        html += '  <span><span class="etiqueta etiqueta-amarela">Pendente!</span></span>';
        html += '  <span><button class="botao botao-primario botao-pequeno" onclick="marcarComoAtendido(' + c.id + ',' + item.id + ')">Marcar como Atendido</button></span>';
      }

      html += '</div>';
    }
  }

  tabela.innerHTML = html;
  document.getElementById('kpi-pendentes').textContent = totalPendentes;
  document.getElementById('kpi-campanhas').textContent = campanhas.length;
}

function marcarComoAtendido(idCampanha, idItem) {
  var c = buscarCampanhaPorId(idCampanha);
  for (var i = 0; i < c.itens.length; i++) {
    if (c.itens[i].id === idItem) {
      c.itens[i].atendido = true;
      c.progresso = c.progresso + 15;
      if (c.progresso > 100) c.progresso = 100;
    }
  }
  desenharDashboardOng();
}

function publicarCampanha() {
  var titulo = document.getElementById('nova-titulo').value;
  var categoria = document.getElementById('nova-categoria').value;
  var nomeItem = document.getElementById('nova-item').value;
  var qtd = document.getElementById('nova-qtd').value;

  if (titulo === '') titulo = 'Nova Campanha Solidária';
  if (nomeItem === '') nomeItem = 'Item essencial';

  var novaCampanha = {
    id: campanhas.length + 1,
    titulo: titulo,
    ong: 'Abrigo Esperança',
    endereco: 'Rua Exemplo, 100 - Centro',
    horario: 'Seg a Sex, 9h às 17h',
    categoria: categoria,
    urgencia: 'Alta',
    progresso: 0,
    icone: '🎁',
    resumo: nomeItem,
    itens: [
      { id: Date.now(), nome: nomeItem, qtd: Number(qtd), atendido: false }
    ]
  };

  campanhas.unshift(novaCampanha);
  mostrarTela('tela-ong-dashboard');
}

// ============================================
// 7. CHAT DE MENSAGENS
// ============================================
function desenharChat() {
  var lista = document.getElementById('lista-conversas');
  var htmlLista = '';
  var conversaAtual = conversas[0];

  for (var i = 0; i < conversas.length; i++) {
    var conv = conversas[i];
    if (conv.id === conversaAtualId) {
      conversaAtual = conv;
    }

    var classeAtiva = conv.id === conversaAtualId ? 'ativa' : '';
    var ultimaMsg = conv.mensagens[conv.mensagens.length - 1].texto;

    htmlLista += '<div class="item-conversa ' + classeAtiva + '" onclick="abrirConversa(' + conv.id + ')">';
    htmlLista += '  <div style="font-weight:800; font-size:15px;">👤 ' + conv.ong + '</div>';
    htmlLista += '  <div style="color:#6B5E58; font-size:13px;">' + ultimaMsg + '</div>';
    htmlLista += '</div>';
  }
  lista.innerHTML = htmlLista;

  // Mostra as mensagens da conversa selecionada
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

// Inicia desenhando as campanhas na página inicial
desenharCampanhasHome();
