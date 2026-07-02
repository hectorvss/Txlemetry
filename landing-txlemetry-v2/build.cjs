'use strict';

const fs = require('fs');
const path = require('path');

function loadEsbuild() {
    try {
        return require('esbuild');
    } catch {}

    const pnpmDir = path.join(__dirname, '..', 'node_modules', '.pnpm');
    const match = fs.existsSync(pnpmDir) && fs.readdirSync(pnpmDir).find((name) => name.startsWith('esbuild@'));

    if (match) {
        return require(path.join(pnpmDir, match, 'node_modules', 'esbuild'));
    }

    throw new Error('Unable to locate esbuild. Run pnpm install before building the landing.');
}

const esbuild = loadEsbuild();
const SRC = __dirname;
const files = fs.readdirSync(SRC).filter((file) => file.endsWith('.jsx'));

(async () => {
    let built = 0;

    for (const file of files) {
        const src = fs.readFileSync(path.join(SRC, file), 'utf8');
        const result = await esbuild.transform(src, {
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

        fs.writeFileSync(path.join(SRC, file.replace(/\.jsx$/, '.js')), result.code, 'utf8');
        built++;
    }

    console.log('built', built, 'files');
})().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
