'use strict';
/**
 * scripts/build.cjs — compiles the JSX sources in src/ into plain IIFE
 * bundles in v2/ (the directory index.html loads from).
 *
 *   node scripts/build.cjs
 *
 * Requires esbuild:  npm install
 */
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'v2');

const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.jsx'));

(async () => {
  let n = 0;
  for (const f of files) {
    const src = fs.readFileSync(path.join(SRC, f), 'utf8');
    const r = await esbuild.transform(src, {
      loader: 'jsx',
      jsx: 'transform',
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      target: 'es2019',
      format: 'iife',
      legalComments: 'none',
      minify: true,
      sourcemap: false,
    });
    fs.writeFileSync(path.join(OUT, f.replace(/\.jsx$/, '.js')), r.code, 'utf8');
    n++;
  }
  console.log('built', n, 'files ->', path.relative(ROOT, OUT));
})().catch((e) => { console.error(e.message); process.exit(1); });
