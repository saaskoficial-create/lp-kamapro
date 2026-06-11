# Deploy da LP KamaPro

Build pronto:

- Pasta: `dist/`
- Zip: `kamapro-lp-dist.zip`
- URL alvo: `https://kamapro.io/lp/`

## Como publicar

Publique o conteúdo de `dist/` dentro da rota `/lp/`.

Os assets já foram gerados com base `/lp/`, então o HTML referencia:

- `/lp/assets/...`
- `/lp/videos/...`
- `/lp/images/...`
- `/lp/cards/...`
- `/lp/frames/...`

## SPA fallback

Se o hosting exigir regra de fallback, apontar:

```text
/lp/* -> /lp/index.html
```

## Cache recomendado

```text
/lp/assets/*  Cache-Control: public, max-age=31536000, immutable
/lp/videos/*  Cache-Control: public, max-age=31536000, immutable
/lp/cards/*   Cache-Control: public, max-age=31536000, immutable
/lp/frames/*  Cache-Control: public, max-age=31536000, immutable
/lp/index.html Cache-Control: public, max-age=0, must-revalidate
```

## Meta Pixel / CSP

A LP usa Meta Pixel ID `977020721999733`. Se o domínio mantiver CSP, liberar:

```text
script-src https://connect.facebook.net
img-src https://www.facebook.com
connect-src https://www.facebook.com
```

## Links externos

CTAs principais apontam para:

- `https://kamapro.io/login`
- `https://kamapro.io/pricing`

Sublinks oficiais apontam para:

- `https://kamapro.io/privacy`
- `https://kamapro.io/terms`
- `https://kamapro.io/help`
