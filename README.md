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


## Images
how do i want this app to behave? I know i want responsive images served in a helper function I'll define
in the config.rb file.

The helper function will take a path to the image file in source/images/site/article_name as a string. It'll ouput
the picture tag like so:
```html
<picture>
  <!-- webp -->
  <source srcset="/img/lion-sm.webp" media="(max-width: 640px)" type="image/webp" />
  <source srcset="/img/lion-md.webp" media="(max-width: 768px)" type="image/webp" />
  <source srcset="/img/lion-lg.webp" media="(max-width: 1024px)" type="image/webp" />
  <!-- original -->
  <img src="/img/lion.jpeg" class="img-responsive" alt="A lion in the jungle." />
</picture>
```
I'll have to replace all instances of `image_tag` with this helper function.

Now inregards to where to store these output imags. I have the responsive-images.ts script running and working
enough as a starting point. It runs under `npm run sharpen`. I can run it as an external pipeline and that'll run whenever I boot up the middleman server. It seems inefficient to redo this creation everytime i boot up the app.
especially as it grows. I'll have to write some more code to check if the file exists in development mode.
I still want fresh creations during build in production. I think a simple flag might be sufficient?
maybe. i'd have to have the same external_pipeline in the build step but with the flag.

What folder do i put it in? some things to keep in mind.
- middleman server doesn't execute the build step.
- but it does execute every external_pipeline.
    - the external_pipeline watches the `source:` directory and merges that into the sitemap

I like the original images staying in the source/images/ directory. The helper function will look for the original images if the browser is too old for the new format. so the helper function will have to
