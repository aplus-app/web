import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const index = {
  input: 'src/js/index.ts',
  output: [
    {
      file: 'public/index.js',
      format: 'iife',
      strict: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    terser({ format: { comments: false } }),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: { compilerOptions: { target: 'es6' } },
    }),
  ],
};

export default [index];
