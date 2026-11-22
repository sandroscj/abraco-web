function el(id) { return document.getElementById(id); }
function rota(arq) { var emPaginas = window.location.pathname.indexOf('/paginas/') !== -1; if (arq === 'index.html') return emPaginas ? '../index.html' : 'index.html'; return emPaginas ? arq : 'paginas/' + arq; }
var dadosPadrao = {
  perfil: 'visitante', campanhaId: 1, conversaId: 1, busca: '',
  campanhas: [
    { id: 1, titulo: 'Campanha do Agasalho 2026', ong: 'Abrigo Esperança', endereco: 'Rua Exemplo, 100 - Centro', horario: 'Seg a Sex, 9h às 17h', categoria: 'Roupas', urgencia: 'Alta', progresso: 70, icone: '🧥', resumo: 'Casacos infantis, Cobertores', itens: [{ id: 101, nome: 'Casaco tamanho 7 anos masculino', qtd: 2, atendido: false }, { id: 102, nome: 'Casaco tamanho 4 anos feminino', qtd: 1, atendido: false }, { id: 103, nome: 'Meias infantis', qtd: 10, atendido: true }] },
    { id: 2, titulo: 'Volta às Aulas 2026', ong: 'Casa da Criança', endereco: 'Av. Central, 420 - Jardim Camburi', horario: 'Seg a Sex, 8h às 18h', categoria: 'Material Escolar', urgencia: 'Média', progresso: 45, icone: '📚', resumo: 'Cadernos, Mochilas, Lápis', itens: [{ id: 201, nome: 'Caderno 96 folhas', qtd: 5, atendido: false }, { id: 202, nome: 'Mochila escolar infantil', qtd: 3, atendido: false }] },
    { id: 3, titulo: 'Cesta de Alimentos', ong: 'Lar Semente Você', endereco: 'Rua das Flores, 55 - Laranjeiras', horario: 'Seg a Sáb, 9h às 16h', categoria: 'Alimentos', urgencia: 'Alta', progresso: 25, icone: '📦', resumo: 'Cestas básicas, Leite em pó', itens: [{ id: 301, nome: 'Cesta básica completa', qtd: 8, atendido: false }, { id: 302, nome: 'Leite em pó integral', qtd: 12, atendido: false }] },
    { id: 4, titulo: 'Apoio Emergencial - Vale Verde', ong: 'Instituto Mãos Unidas', endereco: 'Ginásio Municipal Central', horario: 'Todos os dias, 24h', categoria: 'Emergência', urgencia: 'Alta', progresso: 40, icone: '🚨', resumo: 'Água potável, Colchões, Higiene', itens: [{ id: 401, nome: 'Fardo de água potável', qtd: 20, atendido: false }, { id: 402, nome: 'Kit de higiene pessoal', qtd: 15, atendido: false }] }
  ],
  doacoes: [{ item: '2x Casaco tamanho 7 anos masculino', local: 'Abrigo Esperança', data: '2026-11-28', status: 'Agendada' }],
  conversas: [{ id: 1, ong: 'Abrigo Esperança', mensagens: [{ tipo: 'enviada', texto: 'Olá, tenho 2 casacos para doar', hora: '10:02 ✓✓' }, { tipo: 'recebida', texto: 'Ótimo! Pode trazer amanhã das 9h às 17h', hora: '10:05' }] }, { id: 2, ong: 'Casa da Criança', mensagens: [{ tipo: 'recebida', texto: 'Obrigada pela doação!', hora: 'Ontem' }] }],
  pendencias: [{ id: 1, nome: 'Instituto Mãos Unidas', tipo: 'Entidade', cnpj: '14.222.333/0001-55', status: 'Pendente' }, { id: 2, nome: 'Campanha Natal Sem Fome', tipo: 'Campanha', cnpj: '12.345.678/0001-90', status: 'Pendente' }]
};
var perfis = {
  doador: { senha: 'doa#2026', pagina: 'buscar.html', tag: 'Doador', cor: 'etiqueta-azul', links: [['Início', 'home.html'], ['Buscar Campanhas', 'buscar.html'], ['Minhas Doações', 'minhas-doacoes.html']] },
  entidade: { senha: 'ent!2026', pagina: 'ong-dashboard.html', tag: 'Entidade', cor: 'etiqueta-verde', links: [['Necessidades (CRUD)', 'ong-dashboard.html'], ['Nova Campanha', 'ong-nova.html'], ['Mensagens', 'mensagens.html']] },
  admin: { senha: 'adm@2026', pagina: 'admin-aprovacao.html', tag: 'Administrador', cor: 'etiqueta-rosa', links: [['Aprovações', 'admin-aprovacao.html'], ['Relatórios', 'admin-relatorios.html'], ['Campanhas', 'buscar.html']] }
};
var db = JSON.parse(localStorage.getItem('abraco_db')) || dadosPadrao, categoriaAtual = 'Todas';
function salvarDb() { localStorage.setItem('abraco_db', JSON.stringify(db)); }
function buscarCampanha(id) { for (var i = 0; i < db.campanhas.length; i++) if (db.campanhas[i].id === id) return db.campanhas[i]; return db.campanhas[0]; }
function atualizarMenu() {
  var p = perfis[db.perfil], links = p ? p.links : [['Início', 'home.html'], ['Campanhas', 'buscar.html'], ['Entrar', 'index.html']], html = '';
  for (var i = 0; i < links.length; i++) html += '<a class="menu-link" href="' + rota(links[i][1]) + '">' + links[i][0] + '</a>';
  if (el('menu-principal')) el('menu-principal').innerHTML = html;
  if (el('botoes-usuario')) el('botoes-usuario').innerHTML = p ? '<span class="etiqueta ' + p.cor + '">' + p.tag + '</span><button class="botao botao-sair" onclick="fazerLogout()">Sair</button>' : '<a class="botao botao-primario" href="' + rota('index.html') + '">Entrar / Login</a>';
}
function validarLogin(e) {
  e.preventDefault(); var u = el('login-usuario').value.trim(), s = el('login-senha').value.trim();
  if (perfis[u] && perfis[u].senha === s) { db.perfil = u; salvarDb(); window.location.href = rota(perfis[u].pagina); }
  else el('erro-login').style.display = 'block';
}
function fazerLogout() { db.perfil = 'visitante'; salvarDb(); window.location.href = rota('index.html'); }
function irParaBusca() { db.busca = el('campo-busca-home').value; salvarDb(); window.location.href = rota('buscar.html'); }
function abrirCampanha(id) { db.campanhaId = id; salvarDb(); window.location.href = rota('campanha.html'); }
function mudarCategoria(cat, btn) { categoriaAtual = cat; var bs = document.querySelectorAll('.filtros-rapidos .chip'); for (var i = 0; i < bs.length; i++) bs[i].classList.remove('ativo'); btn.classList.add('ativo'); desenharCampanhasHome(); }
function desenharCampanhasHome() {
  var q = el('campo-busca-home').value.toLowerCase(), html = '';
  for (var i = 0; i < db.campanhas.length; i++) { var c = db.campanhas[i], cor = c.categoria === 'Emergência' ? 'etiqueta-vermelha' : 'etiqueta-rosa'; if ((categoriaAtual === 'Todas' || c.categoria === categoriaAtual) && (c.titulo + c.ong + c.resumo).toLowerCase().indexOf(q) !== -1) html += '<article class="card"><div class="capa-campanha"><span class="etiqueta ' + cor + '">' + c.categoria + '</span><span style="font-size:36px;">' + c.icone + '</span></div><h3 class="titulo-destaque" style="font-size:18px;margin-bottom:6px;">' + c.titulo + '</h3><div style="color:#41BDD9;font-weight:700;font-size:14px;">' + c.ong + ' • ✓ Verificada</div><div class="barra-progresso"><div class="barra-progresso-preenchida" style="width:' + c.progresso + '%;"></div></div><div style="display:flex;justify-content:space-between;align-items:center;"><strong style="font-size:14px;">' + c.progresso + '% arrecadado</strong><button class="botao botao-primario botao-pequeno" onclick="abrirCampanha(' + c.id + ')">Doar agora</button></div></article>'; }
  el('lista-campanhas-home').innerHTML = html;
}
function desenharBusca() {
  var q = el('campo-busca-lista').value.toLowerCase(), cat = document.querySelector('input[name="filtro-cat"]:checked').value, urg = document.querySelector('input[name="filtro-urg"]:checked').value, html = '';
  for (var i = 0; i < db.campanhas.length; i++) { var c = db.campanhas[i]; if ((c.ong + c.titulo + c.resumo).toLowerCase().indexOf(q) !== -1 && (cat === 'Todas' || c.categoria === cat) && (urg === 'Todas' || c.urgencia === urg)) html += '<article class="card card-instituicao"><div><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;"><strong class="titulo-destaque" style="font-size:18px;">' + c.titulo + '</strong><span class="etiqueta etiqueta-verde">✓ Verificada</span><span class="etiqueta etiqueta-vermelha">Urgência ' + c.urgencia + '</span></div><div style="color:#6B5E58;font-size:14px;">' + c.ong + ' • ' + c.endereco + '</div><div style="font-weight:700;font-size:14px;margin-top:4px;">Precisa de: ' + c.resumo + '</div></div><button class="botao botao-primario" onclick="abrirCampanha(' + c.id + ')">Ver Necessidades</button></article>'; }
  el('resultado-busca-lista').innerHTML = html || '<div class="card"><p style="color:#6B5E58;">Nenhuma campanha encontrada.</p></div>';
}
function mudarModoBusca(m) { el('resultado-busca-lista').style.display = m === 'lista' ? 'block' : 'none'; el('resultado-busca-mapa').style.display = m === 'mapa' ? 'flex' : 'none'; el('btn-modo-lista').className = m === 'lista' ? 'botao botao-primario' : 'botao botao-claro'; el('btn-modo-mapa').className = m === 'mapa' ? 'botao botao-primario' : 'botao botao-claro'; }
function carregarDetalheCampanha() {
  var c = buscarCampanha(db.campanhaId), html = '';
  el('detalhe-categoria').textContent = c.categoria + ' • Urgência ' + c.urgencia; el('detalhe-titulo').textContent = c.titulo; el('detalhe-subtitulo').textContent = c.ong + ' • ' + c.progresso + '% da meta arrecadada'; el('detalhe-barra').style.width = c.progresso + '%'; el('detalhe-ong-nome').textContent = c.ong; el('detalhe-ong-info').innerHTML = '📍 ' + c.endereco + '<br />🕒 ' + c.horario;
  for (var i = 0; i < c.itens.length; i++) html += c.itens[i].atendido ? '<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-radius:12px;margin-bottom:10px;background-color:#E8F9FC;"><span style="color:#6B5E58;text-decoration:line-through;">☑ ' + c.itens[i].nome + '</span><span class="etiqueta etiqueta-azul">Já atendido</span></div>' : '<div style="padding:12px 14px;border-radius:12px;margin-bottom:10px;background-color:#FAF7F5;font-weight:700;">☐ ' + c.itens[i].nome + ' (faltam ' + c.itens[i].qtd + ')</div>';
  el('detalhe-itens').innerHTML = html;
}
function carregarFormularioDoacao() { var c = buscarCampanha(db.campanhaId), ops = ''; el('doar-subtitulo').textContent = c.titulo + ' • ' + c.ong; el('doar-ponto').value = c.ong + ' - ' + c.endereco; for (var i = 0; i < c.itens.length; i++) if (!c.itens[i].atendido) ops += '<option value="' + c.itens[i].nome + '">' + c.itens[i].nome + '</option>'; el('doar-item').innerHTML = ops; }
function enviarDoacao(e) {
  e.preventDefault(); var em = el('doar-email').value;
  if (em.indexOf('@') === -1 || em.indexOf('.') === -1) { el('doar-email').classList.add('erro'); el('erro-email').style.display = 'block'; return; }
  db.doacoes.unshift({ item: el('doar-quantidade').value + 'x ' + el('doar-item').value, local: el('doar-ponto').value, data: el('doar-data').value, status: 'Agendada' }); salvarDb(); window.location.href = rota('confirmado.html');
}
function carregarConfirmado() { var d = db.doacoes[0]; el('confirmado-resumo').textContent = 'Você registrou: ' + d.item; el('confirmado-ponto').textContent = 'Ponto de coleta: ' + d.local; el('confirmado-data').textContent = 'Data prevista: ' + d.data; }
function desenharMinhasDoacoes() { var html = ''; for (var i = 0; i < db.doacoes.length; i++) html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:14px;border-radius:12px;background-color:#FAF7F5;margin-bottom:10px;flex-wrap:wrap;gap:10px;"><div><strong>' + db.doacoes[i].item + '</strong><div style="color:#6B5E58;font-size:13px;">' + db.doacoes[i].local + ' • Data: ' + db.doacoes[i].data + '</div></div><span class="etiqueta etiqueta-azul">' + db.doacoes[i].status + '</span></div>'; el('lista-minhas-doacoes').innerHTML = html; }
function desenharDashboardOng() {
  var itens = db.campanhas[0].itens, html = '', pend = 0;
  for (var i = 0; i < itens.length; i++) { var it = itens[i]; if (!it.atendido) pend++; html += '<div class="linha-tabela"><strong>' + it.nome + '</strong><span>' + it.qtd + '</span><span>' + (it.atendido ? '<span class="etiqueta etiqueta-verde">Recebido ✓</span>' : '<span class="etiqueta etiqueta-amarela">Pendente</span>') + '</span><div class="acoes-linha"><button class="botao botao-editar botao-pequeno" onclick="iniciarEdicao(' + it.id + ')">Editar</button><button class="botao botao-excluir botao-pequeno" onclick="excluirNecessidade(' + it.id + ')">Excluir</button>' + (it.atendido ? '' : '<button class="botao botao-primario botao-pequeno" onclick="marcarComoAtendido(' + it.id + ')">Recebido</button>') + '</div></div>'; }
  el('tabela-itens-ong').innerHTML = html; el('kpi-pendentes').textContent = pend; el('kpi-campanhas').textContent = db.campanhas.length;
}
function salvarNecessidade() {
  var id = el('crud-id-edicao').value, nome = el('crud-nome').value.trim(), qtd = Number(el('crud-qtd').value), itens = db.campanhas[0].itens;
  if (!nome || qtd < 1) return;
  if (!id) itens.push({ id: Date.now(), nome: nome, qtd: qtd, atendido: false });
  else for (var i = 0; i < itens.length; i++) if (itens[i].id === Number(id)) { itens[i].nome = nome; itens[i].qtd = qtd; }
  salvarDb(); cancelarEdicao(); desenharDashboardOng();
}
function iniciarEdicao(id) { for (var i = 0; i < db.campanhas[0].itens.length; i++) if (db.campanhas[0].itens[i].id === id) { el('crud-id-edicao').value = id; el('crud-nome').value = db.campanhas[0].itens[i].nome; el('crud-qtd').value = db.campanhas[0].itens[i].qtd; el('titulo-form-crud').textContent = 'Editar Necessidade'; el('btn-salvar-crud').textContent = 'Salvar Alteração'; el('btn-cancelar-crud').style.display = 'inline-flex'; } }
function cancelarEdicao() { el('crud-id-edicao').value = ''; el('crud-nome').value = ''; el('crud-qtd').value = 1; el('titulo-form-crud').textContent = 'Cadastrar Nova Necessidade'; el('btn-salvar-crud').textContent = 'Adicionar'; el('btn-cancelar-crud').style.display = 'none'; }
function excluirNecessidade(id) { var nova = []; for (var i = 0; i < db.campanhas[0].itens.length; i++) if (db.campanhas[0].itens[i].id !== id) nova.push(db.campanhas[0].itens[i]); db.campanhas[0].itens = nova; salvarDb(); desenharDashboardOng(); }
function marcarComoAtendido(id) { for (var i = 0; i < db.campanhas[0].itens.length; i++) if (db.campanhas[0].itens[i].id === id) db.campanhas[0].itens[i].atendido = true; salvarDb(); desenharDashboardOng(); }
function publicarCampanha() { var tit = el('nova-titulo').value.trim() || 'Nova Campanha Solidária', item = el('nova-item').value.trim() || 'Item essencial'; db.campanhas.unshift({ id: Date.now(), titulo: tit, ong: 'Abrigo Esperança', endereco: 'Rua Exemplo, 100 - Centro', horario: 'Seg a Sex, 9h às 17h', categoria: el('nova-categoria').value, urgencia: 'Alta', progresso: 0, icone: '🎁', resumo: item, itens: [{ id: Date.now() + 1, nome: item, qtd: Number(el('nova-qtd').value) || 5, atendido: false }] }); salvarDb(); window.location.href = rota('ong-dashboard.html'); }
function desenharChat() {
  var hLista = '', atual = db.conversas[0], hBolhas = '';
  for (var i = 0; i < db.conversas.length; i++) { var cv = db.conversas[i]; if (cv.id === db.conversaId) atual = cv; hLista += '<div class="item-conversa ' + (cv.id === db.conversaId ? 'ativa' : '') + '" onclick="abrirConversa(' + cv.id + ')"><div style="font-weight:800;font-size:15px;">👤 ' + cv.ong + '</div><div style="color:#6B5E58;font-size:13px;">' + cv.mensagens[cv.mensagens.length - 1].texto + '</div></div>'; }
  for (var j = 0; j < atual.mensagens.length; j++) hBolhas += '<div class="bolha ' + (atual.mensagens[j].tipo === 'enviada' ? 'bolha-enviada' : 'bolha-recebida') + '">' + atual.mensagens[j].texto + ' <span style="opacity:0.75;font-size:12px;margin-left:8px;">' + atual.mensagens[j].hora + '</span></div>';
  el('lista-conversas').innerHTML = hLista; el('chat-nome-ong').textContent = atual.ong; el('chat-bolhas').innerHTML = hBolhas;
}
function abrirConversa(id) { db.conversaId = id; salvarDb(); desenharChat(); }
function enviarMensagem() { var txt = el('campo-mensagem').value.trim(); if (!txt) return; for (var i = 0; i < db.conversas.length; i++) if (db.conversas[i].id === db.conversaId) db.conversas[i].mensagens.push({ tipo: 'enviada', texto: txt, hora: 'Agora ✓✓' }); el('campo-mensagem').value = ''; salvarDb(); desenharChat(); }
function desenharAprovacaoAdmin() { var html = ''; for (var i = 0; i < db.pendencias.length; i++) { var p = db.pendencias[i], acao = p.status === 'Pendente' ? '<div class="acoes-linha"><button class="botao botao-primario botao-pequeno" onclick="alterarStatusAdmin(' + p.id + ',\'Aprovado\')">Aprovar</button><button class="botao botao-excluir botao-pequeno" onclick="alterarStatusAdmin(' + p.id + ',\'Rejeitado\')">Rejeitar</button></div>' : '<span class="etiqueta ' + (p.status === 'Aprovado' ? 'etiqueta-verde' : 'etiqueta-vermelha') + '">' + p.status + '</span>'; html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:14px;border-radius:12px;background-color:#FAF7F5;margin-bottom:10px;flex-wrap:wrap;gap:10px;"><div><strong>' + p.nome + '</strong><div style="color:#6B5E58;font-size:13px;">' + p.tipo + ' • CNPJ: ' + p.cnpj + '</div></div>' + acao + '</div>'; } el('lista-aprovacao-admin').innerHTML = html; }
function alterarStatusAdmin(id, st) { for (var i = 0; i < db.pendencias.length; i++) if (db.pendencias[i].id === id) db.pendencias[i].status = st; salvarDb(); desenharAprovacaoAdmin(); }
atualizarMenu();
if (el('lista-campanhas-home')) desenharCampanhasHome();
if (el('resultado-busca-lista')) { el('campo-busca-lista').value = db.busca || ''; desenharBusca(); }
if (el('detalhe-itens')) carregarDetalheCampanha();
if (el('doar-item')) carregarFormularioDoacao();
if (el('confirmado-resumo')) carregarConfirmado();
if (el('lista-minhas-doacoes')) desenharMinhasDoacoes();
if (el('tabela-itens-ong')) desenharDashboardOng();
if (el('lista-conversas')) desenharChat();
if (el('lista-aprovacao-admin')) desenharAprovacaoAdmin();
