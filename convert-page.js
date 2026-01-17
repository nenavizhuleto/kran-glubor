#!/usr/bin/env node

/**
 * Helper script to convert existing HTML files to Eleventy template format
 * Usage: node convert-page.js <input-file> [output-file]
 * 
 * Example: node convert-page.js remont-kranov.html
 */

const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node convert-page.js <input-file> [output-file]');
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3] || path.join('src', path.basename(inputFile));

if (!fs.existsSync(inputFile)) {
  console.error(`Error: File ${inputFile} not found`);
  process.exit(1);
}

const html = fs.readFileSync(inputFile, 'utf8');

// Extract title
const titleMatch = html.match(/<title>(.*?)<\/title>/);
const title = titleMatch ? titleMatch[1] : 'Untitled';

// Extract keywords
const keywordsMatch = html.match(/<meta name="keywords" content="(.*?)" \/>/);
const keywords = keywordsMatch ? keywordsMatch[1] : '';

// Extract description
const descriptionMatch = html.match(/<meta name="description" content="(.*?)" \/>/);
const description = descriptionMatch ? descriptionMatch[1] : '';

// Extract og:title
const ogTitleMatch = html.match(/<meta property="og:title" content="(.*?)" \/>/);
const ogTitle = ogTitleMatch ? ogTitleMatch[1] : title;

// Extract content between <article class="content"> and </article>
const contentMatch = html.match(/<article class="content">([\s\S]*?)<\/article>/);
if (!contentMatch) {
  console.error('Error: Could not find <article class="content"> in the HTML');
  process.exit(1);
}

let content = contentMatch[1].trim();

// Remove the h1 if it exists (we'll add it from title if needed, or keep it if it's custom)
// Actually, let's keep the h1 as it might be custom

// Get filename for permalink
const filename = path.basename(inputFile);
const permalink = filename;

// Create front matter
const frontMatter = `---
layout: base.njk
permalink: ${permalink}
title: ${title}
${keywords ? `keywords: ${keywords}` : ''}
${description ? `description: ${description}` : ''}
ogTitle: ${ogTitle}
---

`;

const output = frontMatter + content;

// Ensure src directory exists
const srcDir = path.dirname(outputFile);
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

fs.writeFileSync(outputFile, output, 'utf8');
console.log(`✅ Converted ${inputFile} to ${outputFile}`);
console.log(`   Please review and adjust the front matter if needed.`);
