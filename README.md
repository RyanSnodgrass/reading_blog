[![Netlify Status](https://api.netlify.com/api/v1/badges/9c848276-8888-44e7-8e46-216348cb251b/deploy-status)](https://app.netlify.com/sites/ubiquitous-marzipan-0c034e/deploys)

https://tailwindcss.com/docs/installation
https://www.donnfelker.com/tailwind-css-with-middleman/

- npm -v
  - 10.7.0
- node -v
  - v18.20.4

```
npm install -D tailwindcss
npx tailwindcss init
```

```
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./source/**/*.{html,erb}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

site.css.scss -> site.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```
# config.rb
activate :external_pipeline,
  name: :tailwind,
  command: "npx tailwindcss -i ./source/stylesheets/site.css -o ./dist/stylesheets/site.css #{"--watch" unless build?}",
  latency: 2,
  source: "./dist/"
```

