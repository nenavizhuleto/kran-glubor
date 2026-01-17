# Kran Glubor - Static Site Generator

This project uses [Eleventy (11ty)](https://www.11ty.dev/) to generate static HTML files from templates, reducing redundancy across pages.

## Project Structure

```
├── src/              # Source HTML files (with front matter)
├── _includes/        # Template files (base.njk)
├── _data/            # Data files (navigation.js)
├── _site/            # Generated static files (gitignored)
└── package.json      # Dependencies and scripts
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the site:
```bash
npm run build
```

3. Serve locally (with auto-reload):
```bash
npm run serve
```

## Converting Existing Pages

### Automated Conversion

Use the helper script to automatically convert HTML files:

```bash
node convert-page.js <input-file>
```

Example:
```bash
node convert-page.js remont-kranov.html
```

This will create `src/remont-kranov.html` with the content extracted and front matter added.

### Manual Conversion

1. Copy the HTML file from the root to `src/`
2. Extract the page-specific content (everything inside `<article class="content">`)
3. Add front matter at the top with page metadata:
```yaml
---
layout: base.njk
permalink: filename.html
title: Page Title
keywords: keyword1, keyword2
description: Page description
ogTitle: Open Graph Title
---
```

**Important:** The `permalink` field controls the output file path. Set it to `filename.html` to output a flat file instead of creating a folder.
4. Replace the full HTML structure with just the content

## Migration Status

Currently converted:
- ✅ index.html
- ✅ o_kompanii.html
- ✅ uslugi.html

Remaining pages need to be converted following the same pattern.

## Deployment

After building (`npm run build`), the `_site/` directory contains all static files ready for deployment.

### Option 1: Deploy from _site directory
Copy the contents of `_site/` to your web server.

### Option 2: Output directly to root
If you want to output directly to the root directory (for direct deployment), modify `.eleventy.js`:

```javascript
return {
  dir: {
    input: "src",
    output: ".",  // Change from "_site" to "."
    // ... rest of config
  }
};
```

**Note:** Be careful with this approach as it will overwrite existing files. Consider backing up first or using a separate branch.
