// ABRAÇO Rede Solidária — Protótipo Funcional Interativo
const SVGS = {
  shirt: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#8C5535" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>`,
  book: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#8C5535" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
  box: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#8C5535" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
};

const state = {
  route: 'home', // home | buscar | campanha | doar | confirmado | login | ong-dashboard | ong-nova | mensagens
  user: { loggedIn: true, role: 'doador', name: 'Juliana Silva' },
  authRole: 'doador', // doador | ong
  searchQuery: '',
  selectedCategory: 'Todas',
  viewMode: 'lista', // lista | mapa
  filters: {
    bairros: ['Centro'],
    idades: ['4 a 7 anos'],
    tipos: ['Casacos'],
    urgencias: ['Alta'],
  },
  selectedCampaignId: 1,
  campaigns: [
    {
      id: 1,
      title: 'Campanha do Agasalho 2026',
      org: 'Abrigo Esperança',
      bairro: 'Centro',
      address: 'Rua Exemplo, 100 - Centro',
      hours: 'Seg a Sex, 9h às 17h',
      category: 'Roupas',
      urgency: 'Alta',
      pct: 70,
      icon: 'shirt',
      needSummary: 'Casacos infantis, Cobertores',
      items: [
        { id: 101, name: 'Casaco tamanho 7 anos masculino', qty: 2, done: false },
        { id: 102, name: 'Casaco tamanho 4 anos feminino', qty: 1, done: false },
        { id: 103, name: 'Meias infantis', qty: 10, done: true },
      ],
    },
    {
      id: 2,
      title: 'Volta às Aulas 2026',
      org: 'Casa da Criança',
      bairro: 'Jardim Camburi',
      address: 'Av. Central, 420 - Jardim Camburi',
      hours: 'Seg a Sex, 8h às 18h',
      category: 'Material Escolar',
      urgency: 'Média',
      pct: 45,
      icon: 'book',
      needSummary: 'Cadernos, Mochilas, Lápis',
      items: [
        { id: 201, name: 'Caderno 96 folhas', qty: 5, done: false },
        { id: 202, name: 'Mochila escolar infantil', qty: 3, done: false },
      ],
    },
    {
      id: 3,
      title: 'Cesta de Alimentos',
      org: 'Lar Semente Você',
      bairro: 'Laranjeiras',
      address: 'Rua das Flores, 55 - Laranjeiras',
      hours: 'Seg a Sáb, 9h às 16h',
      category: 'Alimentos',
      urgency: 'Alta',
      pct: 25,
      icon: 'box',
      needSummary: 'Cestas básicas, Leite em pó',
      items: [
        { id: 301, name: 'Cesta básica completa', qty: 8, done: false },
        { id: 302, name: 'Leite em pó integral', qty: 12, done: false },
      ],
    },
  ],
  donationForm: {
    name: 'Juliana Silva',
    email: 'juliana.silva@email.com',
    phone: '(27) 99999-0000',
    emailError: '',
    items: [{ item: 'Casaco tamanho 7 anos masculino', qty: 2 }],
    day: '15',
    month: '03',
    year: '2026',
    point: 'Sede do Abrigo Esperança - Rua Exemplo, 100',
  },
  lastDonation: {
    summary: '2 casacos infantis (tam. 7)',
    point: 'Sede do Abrigo Esperança',
    date: '15/03/2026',
  },
  activeConvId: 1,
  conversations: [
    {
      id: 1,
      org: 'Abrigo Esperança',
      messages: [
        { from: 'out', text: 'Olá, tenho 2 casacos para doar', time: '10:02 ✓✓' },
        { from: 'in', text: 'Ótimo! Pode trazer amanhã das 9h às 17h', time: '10:05' },
      ],
    },
    {
      id: 2,
      org: 'Casa da Criança',
      messages: [{ from: 'in', text: 'Obrigada pela doação!', time: 'Ontem' }],
    },
    {
      id: 3,
      org: 'Lar Semente Você',
      messages: [{ from: 'out', text: 'Vocês têm tamanho 4?', time: 'Seg' }],
    },
  ],
};

function navigate(route, extra = {}) {
  Object.assign(state, extra);
  state.route = route;
  window.scrollTo(0, 0);
  render();
}

function renderNavbar(active) {
  return `
    <header class="navbar">
      <div class="brand" onclick="navigate('home')">
        <span class="brand-badge">ABRAÇO</span>
        <span class="brand-name">Rede Solidária</span>
      </div>
      <nav class="nav-links">
        <a class="nav-link ${active === 'home' ? 'active' : ''}" onclick="navigate('home')">Início</a>
        <a class="nav-link ${active === 'buscar' ? 'active' : ''}" onclick="navigate('buscar')">Campanhas</a>
        <a class="nav-link" onclick="navigate('buscar')">Instituições</a>
        <a class="nav-link" onclick="navigate('mensagens')">Mensagens</a>
        <a class="nav-link" onclick="navigate('ong-dashboard')">Portal ONG</a>
      </nav>
      <div class="nav-actions">
        ${
          state.user.loggedIn
            ? `<button class="btn btn-primary" onclick="navigate('${state.user.role === 'ong' ? 'ong-dashboard' : 'mensagens'}')">👤 Minha Conta</button>
               <button class="btn btn-danger" onclick="logout()">Sair</button>`
            : `<button class="btn btn-primary" onclick="navigate('login')">Entrar / Cadastrar</button>`
        }
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-top">
        <div>
          <h3 class="font-display" style="font-size:22px;margin-bottom:10px;">ABRAÇO Solidário</h3>
          <p style="color:var(--soft-sand);max-width:440px;font-size:15px;">
            Conectando doadores a instituições verificadas para evitar desperdícios e priorizar o que é urgente.
          </p>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="color:var(--coral);font-size:13px;font-weight:800;">MENU</span>
          <a onclick="navigate('home')">Início</a>
          <a onclick="navigate('buscar')">Campanhas Urgentes</a>
          <a onclick="navigate('buscar')">Instituições</a>
          <a onclick="navigate('ong-dashboard')">Portal da ONG</a>
        </div>
      </div>
      <div class="footer-bottom">© 2026 ABRAÇO Rede Solidária • Todos os direitos reservados.</div>
    </footer>
  `;
}

function renderHome() {
  const filtered = state.campaigns.filter((c) => {
    const matchCat =
      state.selectedCategory === 'Todas' ||
      (state.selectedCategory === 'Urgente' ? c.urgency === 'Alta' : c.category === state.selectedCategory);
    const matchQ =
      !state.searchQuery ||
      c.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      c.needSummary.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      c.org.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  return `
    ${renderNavbar('home')}
    <section class="hero">
      <span class="badge badge-pink-soft">● Campanhas ativas em tempo real</span>
      <h1>AJUDE QUEM PRECISA,<br/>SEM DESPERDÍCIO.</h1>
      <p>Encontre campanhas urgentes de instituições verificadas perto de você, veja exatamente os itens que faltam e registre sua entrega.</p>
      <div class="search-bar">
        <span>🔍</span>
        <input id="heroSearch" type="text" placeholder="O que você quer doar hoje? (ex: casaco, arroz, caderno...)" value="${state.searchQuery}" oninput="updateSearch(this.value)" />
        <button class="btn btn-primary" onclick="navigate('buscar')">Buscar</button>
      </div>
      <div class="chip-row">
        ${['Todas', 'Alimentos', 'Roupas', 'Material Escolar', 'Urgente']
          .map(
            (cat) => `
          <button class="chip ${cat === 'Urgente' ? 'chip-urgent' : ''} ${state.selectedCategory === cat ? 'active' : ''}" onclick="selectCat('${cat}')">
            ${cat === 'Urgente' ? '🔥 Urgente' : cat}
          </button>`
          )
          .join('')}
      </div>
    </section>

    <section class="container">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
        <h2 class="font-display" style="font-size:28px;">Campanhas Urgentes</h2>
        <a style="color:var(--primary);font-weight:700;" onclick="navigate('buscar')">Ver todas as campanhas →</a>
      </div>
      <div class="grid-3">
        ${filtered
          .map(
            (c) => `
          <div class="card">
            <div class="campaign-thumb">
              <span class="badge ${c.urgency === 'Alta' ? 'badge-pink' : 'badge-coral'}">${c.category}</span>
              <div>${SVGS[c.icon] || SVGS.box}</div>
            </div>
            <h3 class="font-display" style="font-size:19px;margin-bottom:6px;">${c.title}</h3>
            <div style="color:var(--cyan);font-weight:700;font-size:14px;">${c.org} • ✓ Verificada</div>
            <div class="progress-track"><div class="progress-fill" style="width:${c.pct}%"></div></div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong style="font-size:14px;">${c.pct}% arrecadado</strong>
              <button class="btn btn-primary btn-sm" onclick="openCampaign(${c.id})">Doar agora</button>
            </div>
          </div>`
          )
          .join('')}
      </div>
    </section>

    <section style="background:#fff;padding:48px 0;">
      <div class="container" style="padding-top:0;padding-bottom:0;">
        <h2 class="font-display" style="font-size:26px;margin-bottom:24px;">Como Ajudar em 3 Passos</h2>
        <div class="grid-3">
          <div class="card" style="background:var(--bg);box-shadow:none;">
            <span class="badge badge-cyan" style="margin-bottom:12px;">Passo 1</span>
            <h4 style="font-size:18px;font-weight:800;margin-bottom:6px;">Encontre uma campanha</h4>
            <p style="color:var(--muted);font-size:14px;">Filtre por bairro, categoria ou nível de urgência das instituições.</p>
          </div>
          <div class="card" style="background:var(--bg);box-shadow:none;">
            <span class="badge badge-pink" style="margin-bottom:12px;">Passo 2</span>
            <h4 style="font-size:18px;font-weight:800;margin-bottom:6px;">Registre sua doação</h4>
            <p style="color:var(--muted);font-size:14px;">Escolha o item exato que ainda falta e informe a data de entrega.</p>
          </div>
          <div class="card" style="background:var(--bg);box-shadow:none;">
            <span class="badge badge-coral" style="margin-bottom:12px;">Passo 3</span>
            <h4 style="font-size:18px;font-weight:800;margin-bottom:6px;">Entregue no local</h4>
            <p style="color:var(--muted);font-size:14px;">Leve até o ponto de coleta da ONG verificada sem desperdícios.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="about-split">
      <div class="about-left">
        <h2 class="font-display" style="font-size:30px;">Sobre a Rede Abraço</h2>
        <p>A Rede Abraço conecta doadores da comunidade a instituições verificadas com transparência e zero desperdício. Acompanhe o progresso real das campanhas, veja exatamente os itens que ainda faltam e agende sua entrega diretamente no ponto de coleta.</p>
        <button class="btn btn-coral" onclick="navigate('buscar')">Conhecer Instituições →</button>
      </div>
      <div class="about-right">
        <div class="stat-card"><span class="stat-num" style="color:var(--primary);">+500</span><strong>Doações entregues este ano</strong></div>
        <div class="stat-card"><span class="stat-num" style="color:var(--cyan);">18</span><strong>Instituições verificadas na região</strong></div>
        <div class="stat-card"><span class="stat-num" style="color:var(--pink);">0%</span><strong>Desperdício com controle de itens atendidos</strong></div>
      </div>
    </section>

    <section class="container">
      <h2 class="font-display" style="font-size:26px;margin-bottom:24px;">Informações Importantes</h2>
      <div class="grid-4">
        <div class="card"><h4 style="color:var(--primary);font-weight:800;margin-bottom:8px;">Como funciona a entrega?</h4><p style="color:var(--muted);font-size:14px;">Você registra sua intenção no site e entrega na data escolhida no ponto de coleta.</p></div>
        <div class="card"><h4 style="color:var(--primary);font-weight:800;margin-bottom:8px;">O que é o selo Verificada?</h4><p style="color:var(--muted);font-size:14px;">Garante que a instituição teve CNPJ e endereço validados pela equipe da rede.</p></div>
        <div class="card"><h4 style="color:var(--primary);font-weight:800;margin-bottom:8px;">Por que itens ficam riscados?</h4><p style="color:var(--muted);font-size:14px;">Quando a ONG marca como atendido, evitamos doações repetidas em excesso.</p></div>
        <div class="card"><h4 style="color:var(--primary);font-weight:800;margin-bottom:8px;">Posso cancelar depois?</h4><p style="color:var(--muted);font-size:14px;">Sim! Você pode cancelar ou editar sua intenção a qualquer momento.</p></div>
      </div>
    </section>
    ${renderFooter()}
  `;
}

function renderBuscar() {
  const list = state.campaigns.filter((c) => {
    const q = state.searchQuery.toLowerCase();
    return !q || c.org.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.needSummary.toLowerCase().includes(q);
  });

  return `
    ${renderNavbar('buscar')}
    <div class="container">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:28px;flex-wrap:wrap;">
        <div class="search-bar" style="max-width:780px;">
          <span>🔍</span>
          <input type="text" placeholder="Procurar instituição ou necessidade..." value="${state.searchQuery}" oninput="updateSearch(this.value)" />
          <button class="btn btn-primary btn-sm" onclick="render()">Buscar</button>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn ${state.viewMode === 'lista' ? 'btn-primary' : 'btn-ghost'}" onclick="navigate('buscar',{viewMode:'lista'})">☰ Lista</button>
          <button class="btn ${state.viewMode === 'mapa' ? 'btn-primary' : 'btn-ghost'}" onclick="navigate('buscar',{viewMode:'mapa'})">🗺 Mapa</button>
        </div>
      </div>

      <div class="search-layout">
        <aside class="card">
          <h3 class="font-display" style="font-size:20px;">Filtros</h3>
          <div class="filter-group">
            <h4>Localização (Bairro)</h4>
            <label class="filter-opt"><input type="checkbox" checked /> Centro</label>
            <label class="filter-opt"><input type="checkbox" /> Jardim Camburi</label>
            <label class="filter-opt"><input type="checkbox" /> Laranjeiras</label>
          </div>
          <div class="filter-group">
            <h4>Faixa Etária</h4>
            <label class="filter-opt"><input type="checkbox" /> 0 a 3 anos</label>
            <label class="filter-opt"><input type="checkbox" checked /> 4 a 7 anos</label>
            <label class="filter-opt"><input type="checkbox" /> 8 a 12 anos</label>
          </div>
          <div class="filter-group">
            <h4>Tipo de Item</h4>
            <label class="filter-opt"><input type="checkbox" checked /> Casacos</label>
            <label class="filter-opt"><input type="checkbox" /> Calçados</label>
            <label class="filter-opt"><input type="checkbox" /> Uniformes</label>
          </div>
          <div class="filter-group">
            <h4>Urgência</h4>
            <label class="filter-opt"><input type="checkbox" checked /> Alta</label>
            <label class="filter-opt"><input type="checkbox" /> Média</label>
            <label class="filter-opt"><input type="checkbox" /> Baixa</label>
          </div>
        </aside>

        <div>
          ${
            state.viewMode === 'lista'
              ? list
                  .map(
                    (c) => `
              <div class="card inst-card">
                <div class="inst-left">
                  <div class="inst-thumb">${SVGS[c.icon] || SVGS.box}</div>
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
                      <strong class="font-display" style="font-size:18px;">${c.org}</strong>
                      <span class="badge badge-green">✓ Verificada</span>
                      <span class="badge badge-red">Urgência ${c.urgency}</span>
                    </div>
                    <div style="color:var(--muted);font-size:14px;">${c.address}</div>
                    <div style="font-weight:700;font-size:14px;margin-top:4px;">Precisa de: ${c.needSummary}</div>
                  </div>
                </div>
                <button class="btn btn-primary" onclick="openCampaign(${c.id})">Ver Necessidades</button>
              </div>`
                  )
                  .join('')
              : `<div class="map-box">
                   <div class="map-pin" style="top:25%;left:22%;" onclick="openCampaign(1)">📍 Abrigo Esperança (Alta)</div>
                   <div class="map-pin" style="top:52%;left:55%;" onclick="openCampaign(2)">📍 Casa da Criança</div>
                   <div class="map-pin" style="top:68%;left:32%;" onclick="openCampaign(3)">📍 Lar Semente Você (Alta)</div>
                   <span style="color:var(--muted);font-weight:700;">Mapa interativo de pontos de coleta — clique em um marcador</span>
                 </div>`
          }
        </div>
      </div>
    </div>
    ${renderFooter()}
  `;
}

function renderCampanha() {
  const c = state.campaigns.find((x) => x.id === state.selectedCampaignId) || state.campaigns[0];
  return `
    ${renderNavbar('buscar')}
    <div class="container">
      <div style="background:var(--primary);color:#fff;border-radius:24px;padding:36px 40px;margin-bottom:20px;">
        <span class="badge badge-red" style="margin-bottom:12px;">${c.category} • Urgência ${c.urgency}</span>
        <h1 class="font-display" style="font-size:34px;margin-bottom:6px;">${c.title}</h1>
        <div style="color:var(--soft-sand);font-weight:600;">${c.org} • ${c.pct}% da meta arrecadada</div>
      </div>
      <div class="progress-track" style="height:14px;margin-bottom:28px;"><div class="progress-fill" style="width:${c.pct}%"></div></div>

      <div style="display:grid;grid-template-columns:1fr 380px;gap:28px;align-items:start;">
        <div class="card">
          <h2 class="font-display" style="font-size:22px;margin-bottom:16px;">Itens necessários</h2>
          ${c.items
            .map(
              (it) => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-radius:12px;margin-bottom:12px;background:${
              it.done ? 'var(--cyan-soft)' : 'var(--bg)'
            };">
              <span style="font-weight:${it.done ? '600' : '700'};color:${it.done ? 'var(--muted)' : 'var(--text)'};text-decoration:${
                it.done ? 'line-through' : 'none'
              };">
                ${it.done ? '☑' : '☐'} ${it.name} ${it.done ? '— já atendido (não precisa mais doar)' : `(faltam ${it.qty})`}
              </span>
              ${it.done ? '<span class="badge badge-cyan">Já atendido</span>' : ''}
            </div>`
            )
            .join('')}
          <button class="btn btn-primary btn-lg" style="margin-top:8px;" onclick="navigate('doar')">Registrar Doação</button>
        </div>

        <div class="card">
          <h3 class="font-display" style="font-size:20px;margin-bottom:12px;">Sobre a Instituição</h3>
          <span class="badge badge-green" style="margin-bottom:12px;">✓ Verificada</span>
          <div style="font-weight:800;font-size:18px;margin-bottom:8px;">${c.org}</div>
          <div style="color:var(--muted);font-size:14px;">📍 ${c.address}<br/>🕒 ${c.hours}</div>
        </div>
      </div>
    </div>
    ${renderFooter()}
  `;
}

function renderDoar() {
  const c = state.campaigns.find((x) => x.id === state.selectedCampaignId) || state.campaigns[0];
  const f = state.donationForm;
  const openItems = c.items.filter((i) => !i.done);

  return `
    ${renderNavbar('buscar')}
    <div class="center-card">
      <h1 class="font-display" style="font-size:28px;margin-bottom:6px;">Registrar Doação</h1>
      <div style="color:var(--primary);font-weight:700;margin-bottom:24px;">${c.title} • ${c.org}</div>

      <div class="form-group">
        <label class="form-label">Nome completo</label>
        <input class="form-control" id="donName" value="${f.name}" />
      </div>
      <div class="form-group">
        <label class="form-label">E-mail</label>
        <input class="form-control ${f.emailError ? 'error' : ''}" id="donEmail" value="${f.email}" placeholder="exemplo@dominio.com" />
        ${f.emailError ? `<div class="error-banner">${f.emailError}</div>` : ''}
      </div>
      <div class="form-group">
        <label class="form-label">Telefone / WhatsApp</label>
        <input class="form-control" id="donPhone" value="${f.phone}" />
      </div>

      ${f.items
        .map(
          (row, idx) => `
        <div style="display:grid;grid-template-columns:1fr 120px;gap:12px;margin-bottom:12px;">
          <div>
            <label class="form-label">${idx === 0 ? 'Item que vai doar' : 'Outro item'}</label>
            <select class="form-control" id="donItem_${idx}">
              ${openItems.map((oi) => `<option ${oi.name === row.item ? 'selected' : ''}>${oi.name}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="form-label">Quantidade</label>
            <input type="number" min="1" class="form-control" id="donQty_${idx}" value="${row.qty}" />
          </div>
        </div>`
        )
        .join('')}
      <a style="display:inline-block;color:var(--primary);font-weight:700;font-size:14px;margin-bottom:18px;" onclick="addDonationItem()">+ Adicionar outro item à entrega</a>

      <div class="form-group">
        <label class="form-label">Data prevista de entrega</label>
        <div style="display:flex;gap:10px;">
          <input class="form-control" style="width:76px;text-align:center;" id="donDay" value="${f.day}" placeholder="DD" />
          <input class="form-control" style="width:76px;text-align:center;" id="donMonth" value="${f.month}" placeholder="MM" />
          <input class="form-control" style="width:110px;text-align:center;" id="donYear" value="${f.year}" placeholder="YYYY" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Ponto de Coleta</label>
        <select class="form-control" id="donPoint">
          <option>Sede do ${c.org} - ${c.address}</option>
        </select>
      </div>

      <div style="display:flex;gap:12px;margin-top:20px;">
        <button class="btn btn-primary btn-lg" onclick="submitDonation()">Confirmar Doação</button>
        <button class="btn btn-ghost btn-lg" onclick="navigate('campanha')">Cancelar</button>
      </div>
      <p style="color:var(--muted);font-size:13px;margin-top:16px;">✉ Você receberá um e-mail de confirmação com os detalhes da entrega.</p>
    </div>
  `;
}

function renderConfirmado() {
  const d = state.lastDonation;
  return `
    ${renderNavbar('home')}
    <div class="center-card" style="text-align:center;">
      <div style="width:84px;height:84px;border-radius:999px;background:var(--cyan-soft);color:var(--cyan);font-size:38px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;margin-bottom:18px;">✓</div>
      <h1 class="font-display" style="font-size:28px;margin-bottom:20px;">Doação Registrada com Sucesso!</h1>
      <div style="background:var(--bg);border-radius:16px;padding:22px 28px;text-align:left;margin-bottom:24px;">
        <div style="font-weight:800;font-size:16px;margin-bottom:6px;">Você registrou: ${d.summary}</div>
        <div style="color:var(--muted);font-size:15px;">Ponto de coleta: ${d.point}</div>
        <div style="color:var(--muted);font-size:15px;">Data prevista: ${d.date}</div>
      </div>
      <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;">
        <button class="btn btn-primary btn-lg" onclick="alert('Evento adicionado ao calendário!')">📅 Adicionar ao Calendário</button>
        <button class="btn btn-secondary btn-lg" onclick="navigate('buscar')">Ver Outras Campanhas</button>
      </div>
    </div>
  `;
}

function renderLogin() {
  return `
    ${renderNavbar('login')}
    <div class="center-card" style="max-width:500px;text-align:center;">
      <h1 class="font-display" style="font-size:26px;margin-bottom:18px;">Acesse sua conta</h1>
      <div class="segmented" style="margin-bottom:24px;">
        <button class="${state.authRole === 'doador' ? 'active' : ''}" onclick="navigate('login',{authRole:'doador'})">Sou Doador</button>
        <button class="${state.authRole === 'ong' ? 'active' : ''}" onclick="navigate('login',{authRole:'ong'})">Sou ONG / Instituição</button>
      </div>
      <div style="text-align:left;">
        ${
          state.authRole === 'ong'
            ? `<div class="form-group"><label class="form-label">CNPJ</label><input class="form-control" placeholder="00.000.000/0001-00" /></div>`
            : ''
        }
        <div class="form-group"><label class="form-label">E-mail</label><input class="form-control" placeholder="exemplo@dominio.com" /></div>
        <div class="form-group"><label class="form-label">Senha</label><input type="password" class="form-control" value="••••••••" /></div>
      </div>
      <div style="margin-bottom:18px;"><a style="color:var(--primary);font-weight:700;font-size:14px;">Esqueci minha senha</a></div>
      <div style="display:flex;flex-direction:column;gap:10px;align-items:center;">
        <button class="btn btn-primary btn-lg" style="width:220px;" onclick="loginAs('${state.authRole}')">Entrar</button>
        <button class="btn btn-secondary" style="width:220px;" onclick="loginAs('${state.authRole}')">Criar nova conta</button>
      </div>
    </div>
  `;
}

function renderOngSidebar(active) {
  return `
    <aside class="sidebar">
      <div>
        <div class="font-display" style="font-size:20px;">ABRAÇO ONG</div>
        <div style="color:var(--coral);font-size:13px;font-weight:700;margin-top:2px;">Abrigo Esperança</div>
        <div class="sidebar-nav">
          <div class="sidebar-item ${active === 'ong-dashboard' ? 'active' : ''}" onclick="navigate('ong-dashboard')">Dashboard</div>
          <div class="sidebar-item ${active === 'ong-nova' ? 'active' : ''}" onclick="navigate('ong-nova')">Campanhas</div>
          <div class="sidebar-item" onclick="navigate('ong-dashboard')">Doações Recebidas</div>
          <div class="sidebar-item ${active === 'mensagens' ? 'active' : ''}" onclick="navigate('mensagens')">Mensagens</div>
          <div class="sidebar-item">Relatórios</div>
          <div class="sidebar-item">Minha Conta</div>
        </div>
      </div>
      <div>
        <div style="color:var(--soft-sand);font-size:14px;font-weight:600;cursor:pointer;" onclick="alert('Central de Ajuda da Rede Abraço')">❓ Ajuda e Suporte</div>
        <button class="btn-sidebar-logout" onclick="logout()">⎋ Sair da conta</button>
      </div>
    </aside>
  `;
}

function renderOngDashboard() {
  const allItems = state.campaigns.flatMap((c) => c.items.map((i) => ({ ...i, campId: c.id })));
  const pendingCount = allItems.filter((i) => !i.done).length;

  return `
    ${renderNavbar('ong-dashboard')}
    <div class="ong-layout">
      ${renderOngSidebar('ong-dashboard')}
      <main class="ong-main">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;">
          <div>
            <h1 class="font-display" style="font-size:28px;">Dashboard</h1>
            <p style="color:var(--muted);font-size:14px;">Gerencie doações recebidas e evite excesso de itens</p>
          </div>
          <button class="btn btn-primary" onclick="navigate('ong-nova')">+ Nova Campanha</button>
        </div>

        <div class="grid-3" style="margin-bottom:28px;">
          <div class="card"><div class="font-display" style="font-size:34px;">45</div><div style="color:var(--muted);font-weight:700;font-size:14px;">Doações este mês</div></div>
          <div class="card"><div class="font-display" style="font-size:34px;">${pendingCount}</div><div style="color:var(--muted);font-weight:700;font-size:14px;">Itens pendentes</div></div>
          <div class="card"><div class="font-display" style="font-size:34px;">${state.campaigns.length}</div><div style="color:var(--muted);font-weight:700;font-size:14px;">Campanhas ativas</div></div>
        </div>

        <div class="card">
          <h3 style="font-size:18px;font-weight:800;margin-bottom:16px;">Controle de Itens das Campanhas</h3>
          <div class="table-row header"><span>Item</span><span>Qtd.</span><span>Status</span><span>Ação</span></div>
          ${allItems
            .map(
              (it) => `
            <div class="table-row">
              <strong>${it.name}</strong>
              <span>${it.qty}</span>
              <span>${it.done ? '<span class="badge badge-green">Recebido ✓</span>' : '<span class="badge badge-yellow">Pendente!</span>'}</span>
              <span>${
                it.done
                  ? '<span style="color:var(--muted);font-size:13px;font-weight:600;">Concluído</span>'
                  : `<button class="btn btn-primary btn-sm" onclick="markItemDone(${it.campId}, ${it.id})">Marcar como Atendido</button>`
              }</span>
            </div>`
            )
            .join('')}
        </div>
      </main>
    </div>
  `;
}

function renderOngNova() {
  return `
    ${renderNavbar('ong-nova')}
    <div class="ong-layout">
      ${renderOngSidebar('ong-nova')}
      <main class="ong-main">
        <a style="color:var(--primary);font-weight:700;font-size:14px;" onclick="navigate('ong-dashboard')">← Voltar para Campanhas</a>
        <h1 class="font-display" style="font-size:28px;margin:10px 0 24px;">Criar Nova Campanha</h1>
        <div class="card">
          <div style="display:grid;grid-template-columns:1fr 300px;gap:20px;">
            <div class="form-group"><label class="form-label">Título da Campanha</label><input id="ncTitle" class="form-control" placeholder="Ex: Campanha do Agasalho 2026" /></div>
            <div class="form-group"><label class="form-label">Categoria</label><select id="ncCat" class="form-control"><option>Roupas</option><option>Alimentos</option><option>Material Escolar</option></select></div>
          </div>
          <div class="form-group">
            <label class="form-label">Nível de Urgência</label>
            <div style="display:flex;gap:10px;">
              <span class="chip">○ Baixa</span>
              <span class="chip">○ Média</span>
              <span class="chip" style="border-color:var(--pink);background:var(--pink-soft);color:var(--pink);">● Alta</span>
            </div>
          </div>
          <div class="form-group"><label class="form-label">Descrição</label><textarea class="form-control" rows="3" placeholder="Precisamos de casacos infantis e cobertores para o inverno..."></textarea></div>
          <div style="display:grid;grid-template-columns:1fr 120px;gap:12px;" class="form-group">
            <div><label class="form-label">Item Necessário</label><input id="ncItem" class="form-control" placeholder="Casaco tamanho 7 anos masculino" /></div>
            <div><label class="form-label">Qtd.</label><input id="ncQty" type="number" class="form-control" value="5" /></div>
          </div>
          <div style="display:flex;gap:12px;margin-top:20px;">
            <button class="btn btn-primary btn-lg" onclick="publishCampaign()">Publicar Campanha</button>
            <button class="btn btn-ghost btn-lg" onclick="navigate('ong-dashboard')">Salvar como Rascunho</button>
          </div>
        </div>
      </main>
    </div>
  `;
}

function renderMensagens() {
  const conv = state.conversations.find((c) => c.id === state.activeConvId) || state.conversations[0];
  return `
    ${renderNavbar('mensagens')}
    <div class="ong-layout">
      ${renderOngSidebar('mensagens')}
      <main class="ong-main">
        <div class="chat-grid">
          <div class="card">
            <h2 class="font-display" style="font-size:22px;margin-bottom:16px;">Conversas</h2>
            ${state.conversations
              .map(
                (cv) => `
              <div class="chat-conv ${cv.id === conv.id ? 'active' : ''}" onclick="navigate('mensagens',{activeConvId:${cv.id}})">
                <div style="font-weight:800;font-size:15px;">👤 ${cv.org}</div>
                <div style="color:var(--muted);font-size:13px;">${cv.messages[cv.messages.length - 1].text}</div>
              </div>`
              )
              .join('')}
          </div>

          <div class="card chat-panel">
            <div>
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
                <h2 class="font-display" style="font-size:20px;">${conv.org}</h2>
                <span class="badge badge-green">✓ Verificada</span>
              </div>
              <div style="display:flex;flex-direction:column;">
                ${conv.messages
                  .map((m) => `<div class="bubble ${m.from}">${m.text} <span style="opacity:0.75;font-size:12px;margin-left:10px;">${m.time}</span></div>`)
                  .join('')}
              </div>
            </div>
            <div style="display:flex;gap:10px;align-items:center;">
              <input id="chatInput" class="form-control" style="border-radius:999px;" placeholder="Digite sua mensagem..." onkeydown="if(event.key==='Enter')sendMsg()" />
              <button class="btn btn-ghost" onclick="alert('Anexar arquivo')">📎</button>
              <button class="btn btn-primary" onclick="sendMsg()">Enviar</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

// Actions
window.updateSearch = (v) => { state.searchQuery = v; };
window.selectCat = (cat) => { state.selectedCategory = cat; render(); };
window.openCampaign = (id) => navigate('campanha', { selectedCampaignId: id });
window.loginAs = (role) => { state.user = { loggedIn: true, role, name: role === 'ong' ? 'Abrigo Esperança' : 'Juliana Silva' }; navigate(role === 'ong' ? 'ong-dashboard' : 'home'); };
window.logout = () => { state.user.loggedIn = false; navigate('login'); };

window.addDonationItem = () => {
  state.donationForm.items.push({ item: 'Casaco tamanho 4 anos feminino', qty: 1 });
  render();
};

window.submitDonation = () => {
  const email = document.getElementById('donEmail').value.trim();
  const name = document.getElementById('donName').value.trim();
  state.donationForm.name = name;
  state.donationForm.email = email;
  if (!email.includes('@') || !email.includes('.')) {
    state.donationForm.emailError = '⚠ Informe um e-mail válido, por exemplo: nome@email.com';
    render();
    return;
  }
  state.donationForm.emailError = '';
  const item0 = document.getElementById('donItem_0').value;
  const qty0 = document.getElementById('donQty_0').value;
  const day = document.getElementById('donDay').value || '15';
  const month = document.getElementById('donMonth').value || '03';
  const year = document.getElementById('donYear').value || '2026';
  state.lastDonation = {
    summary: `${qty0}x ${item0}`,
    point: document.getElementById('donPoint').value,
    date: `${day}/${month}/${year}`,
  };
  navigate('confirmado');
};

window.markItemDone = (campId, itemId) => {
  const camp = state.campaigns.find((c) => c.id === campId);
  const it = camp?.items.find((i) => i.id === itemId);
  if (it) {
    it.done = true;
    camp.pct = Math.min(100, camp.pct + 15);
  }
  render();
};

window.publishCampaign = () => {
  const title = document.getElementById('ncTitle').value.trim() || 'Nova Campanha Solidária';
  const cat = document.getElementById('ncCat').value;
  const itemName = document.getElementById('ncItem').value.trim() || 'Item essencial';
  const qty = Number(document.getElementById('ncQty').value) || 5;
  state.campaigns.unshift({
    id: Date.now(),
    title,
    org: 'Abrigo Esperança',
    bairro: 'Centro',
    address: 'Rua Exemplo, 100 - Centro',
    hours: 'Seg a Sex, 9h às 17h',
    category: cat,
    urgency: 'Alta',
    pct: 0,
    icon: cat === 'Roupas' ? 'shirt' : cat === 'Alimentos' ? 'box' : 'book',
    needSummary: itemName,
    items: [{ id: Date.now() + 1, name: itemName, qty, done: false }],
  });
  navigate('ong-dashboard');
};

window.sendMsg = () => {
  const inp = document.getElementById('chatInput');
  const txt = inp.value.trim();
  if (!txt) return;
  const conv = state.conversations.find((c) => c.id === state.activeConvId);
  conv.messages.push({ from: 'out', text: txt, time: 'Agora ✓✓' });
  render();
};

function render() {
  const app = document.getElementById('app');
  const routes = {
    home: renderHome,
    buscar: renderBuscar,
    campanha: renderCampanha,
    doar: renderDoar,
    confirmado: renderConfirmado,
    login: renderLogin,
    'ong-dashboard': renderOngDashboard,
    'ong-nova': renderOngNova,
    mensagens: renderMensagens,
  };
  app.innerHTML = (routes[state.route] || renderHome)();
}

render();
