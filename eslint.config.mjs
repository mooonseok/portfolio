import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const baseDirectory = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({ baseDirectory });

const config = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'next-env.d.ts',
      '.claude/skills/**',
      '.github/skills/**',
      '.agents/skills/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default config;
