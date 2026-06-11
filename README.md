# KamaPro LP

Landing page de conversão KamaPro para casais.

## URL alvo

```text
https://kamapro.io/lp/
```

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Rodar local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

A build sai em `dist/`.

## Importante sobre a rota `/lp`

O Vite está configurado com:

```ts
base: "/lp/"
```

Então a pasta gerada em `dist/` deve ser publicada no caminho `/lp/` do domínio principal. Os assets finais são referenciados como `/lp/assets/...`, `/lp/videos/...`, `/lp/images/...`.

## Deploy

Veja também:

```text
DEPLOY-LP-KAMAPRO.md
```

## CTAs

Os botões principais apontam para:

- `https://kamapro.io/login`
- `https://kamapro.io/pricing`

## Pixel

Meta Pixel instalado no `index.html`:

```text
977020721999733
```
