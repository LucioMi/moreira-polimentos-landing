# Moreira Polimentos - Landing Page

🏆 **Landing page premium para empresa especializada em polimento de pedras naturais**

## 📋 Sobre o Projeto

Landing page desenvolvida para a Moreira Polimentos, empresa especializada em polimento e revitalização de mármore, granito, porcelanatos e pedras naturais. O projeto foca em um design luxuoso e minimalista com excelente experiência do usuário.

## ✨ Características

### 🎨 Design Premium
- **Paleta de cores**: Preto/dourado (#0B0B0B, #111111, #D4AF37)
- **Tipografia**: Combinação serif (Playfair Display) + sans-serif (Inter)
- **Layout**: Minimalista e sofisticado
- **Contraste**: Alternância sutil entre seções com divisores dourados

### 📱 Responsividade Mobile-First
- **Breakpoints**: 360px, 768px, 1024px
- **Tipografia escalável**: 16px → 17px → 18px
- **Espaçamentos consistentes**: py-24 → py-32 → py-40
- **Grids responsivos**: gap-6 → gap-8 → gap-10

### 🍔 Menu Hambúrguer Avançado
- **Full-screen overlay** em dispositivos <1024px
- **Focus trap** e **scroll lock** implementados
- **Acessibilidade completa** (ARIA, touch targets 44px)
- **Animações suaves** (150ms fade+slide)

### 📞 Integração WhatsApp
- **Botões verdes padronizados** (#25D366)
- **CTAs em todas as dobras** + botão flutuante
- **Header responsivo**: outline desktop, ícone-only mobile
- **Link direto**: Mensagem pré-configurada

## 🏗️ Estrutura do Projeto

```
nandim/
├── index.html          # Estrutura principal
├── styles.css          # Estilos CSS premium
├── script.js           # JavaScript interativo
├── public/images/      # Imagens do site (portfólio, fundo, logo)
│   ├── portfolio-1-before.svg
│   ├── portfolio-1-after.svg
│   ├── portfolio-2-before.svg
│   ├── portfolio-2-after.svg
│   ├── portfolio-3-before.svg
│   ├── portfolio-3-after.svg
│   ├── fundo-s1.webp
│   └── logo.webp
└── README.md           # Documentação
```

## 🚀 Funcionalidades

### 📄 Seções da Landing Page
1. **Hero** - Apresentação principal com CTAs
2. **Serviços** - Grid de serviços especializados
3. **Portfólio** - Galeria antes/depois com lightbox
4. **Processo** - Metodologia de trabalho
5. **Diferenciais** - Vantagens competitivas
6. **Depoimentos** - Feedback de clientes
7. **FAQ** - Perguntas frequentes (accordion)
8. **Contato** - Informações e localização

### ⚡ JavaScript Interativo
- **Navbar scroll effect** com background dinâmico
- **Menu mobile** com focus trap e scroll lock
- **Lightbox portfólio** para visualização antes/depois
- **FAQ accordion** com animações suaves
- **Smooth scrolling** para navegação interna
- **Intersection Observer** para animações de entrada
- **Lazy loading** para otimização de performance

### ♿ Acessibilidade
- **Contraste AA** em todos os elementos
- **ARIA labels** e **roles** corretos
- **Focus visível** e **keyboard navigation**
- **Alt texts** descritivos para imagens
- **Touch targets** mínimos de 44px

### 🔍 SEO Otimizado
- **Meta tags** completas (title, description, keywords)
- **Open Graph** para redes sociais
- **JSON-LD schema** para rich snippets
- **Estrutura semântica** HTML5
- **Performance otimizada** (lazy loading, font-display)

## 🛠️ Como Executar

### Desenvolvimento Local
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd nandim

# Inicie um servidor local
python3 -m http.server 8000
# ou
npx serve .
# ou
live-server

# Acesse no navegador
http://localhost:8000
```

### Deploy
O projeto é estático e pode ser hospedado em:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Firebase Hosting**
- Qualquer servidor web

## 📊 Performance

- ✅ **Mobile-first** responsivo
- ✅ **Lazy loading** implementado
- ✅ **Font-display: swap** para carregamento otimizado
- ✅ **Imagens SVG** vetorizadas (leves e escaláveis)
- ✅ **CSS minificado** e otimizado
- ✅ **JavaScript modular** e eficiente

## 🎯 Critérios de Qualidade

### ✅ Mobile (390px - iPhone 14 Pro)
- Menu cobre toda a tela sem overflow
- Body scroll bloqueado quando menu aberto
- Foco gerenciado corretamente
- Tipografia legível e espaçamentos adequados

### ✅ Desktop (≥1024px)
- Layout elegante com espaçamentos generosos
- Hover effects suaves e profissionais
- Navegação intuitiva e acessível
- Botões WhatsApp discretos no header

### ✅ Acessibilidade
- Contraste AA em todos os elementos
- Navegação por teclado funcional
- Screen readers compatíveis
- Touch targets adequados

## 📞 Contato

**Moreira Polimentos**
- 📱 WhatsApp: (31) 99873-6387
- 📧 Email: contato@moreirapolimentos.com.br
- 📍 Localização: Belo Horizonte, MG

---

**Desenvolvido com foco em qualidade, performance e experiência do usuário** 🚀