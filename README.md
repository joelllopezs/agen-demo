# Agenda Flow — Plataforma de agendamento online (demonstração)

> **Sua rotina organizada. Seus horários sob controle.**

Projeto de portfólio que simula uma plataforma SaaS de agendamento para barbearias, clínicas de estética, salões, consultórios e profissionais autônomos.

**Este projeto é exclusivamente demonstrativo.** Não há backend, banco de dados, APIs externas, variáveis de ambiente ou dados reais. Nenhum agendamento é registrado ou enviado.

## Funcionalidades

- Página inicial com hero interativo, benefícios, "como funciona", depoimentos fictícios e CTA
- Fluxo de agendamento em 6 etapas: serviço → profissional → data → horário → dados → confirmação
- Calendário funcional com navegação entre meses, datas passadas bloqueadas e dias indisponíveis simulados
- Horários simulados (alguns ocupados), com destaque do selecionado
- Validação de formulário (nome e sobrenome, telefone com DDD e máscara, e-mail opcional validado)
- Indicador de progresso animado, botão voltar e resumo lateral atualizado em tempo real
- Tela de sucesso com código fictício e aviso explícito de demonstração
- Rascunho preservado em `sessionStorage` apenas durante a sessão (limpo ao concluir ou reiniciar)
- Layout responsivo com experiência mobile dedicada, foco visível e respeito a `prefers-reduced-motion`

## Tecnologias

React 18 · TypeScript · Vite · CSS3 · Lucide React

## Como executar

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:5173
npm run build    # build de produção (verifica tipos e gera /dist)
npm run preview  # serve o build localmente
```

## Deploy na Vercel

1. Envie o projeto para um repositório no GitHub.
2. Na Vercel, clique em **Add New → Project** e importe o repositório.
3. O Vite é detectado automaticamente (`npm run build`, saída em `dist`). Não é necessária nenhuma variável de ambiente.

Também é possível publicar pela CLI: `npx vercel`.

## Estrutura

```
src/
  components/
    Header.tsx · Hero.tsx · Sections.tsx (Benefícios, Como funciona, Depoimentos, CTA, Footer)
    Booking/
      BookingWizard.tsx · ServiceSelection.tsx · ProfessionalSelection.tsx
      DateSelection.tsx · TimeSelection.tsx · CustomerForm.tsx
      BookingSummary.tsx · BookingSuccess.tsx
  data.ts      # serviços, profissionais, horários e utilitários
  App.tsx · main.tsx · styles.css
```

## Aviso

Todos os nomes, avaliações, depoimentos e códigos são fictícios e existem apenas para fins de demonstração.
# agen-demo
