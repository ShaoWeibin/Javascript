import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'main.js',
  output: {
    format: 'iife',
    name: 'foo',
    file: 'bunble.js'
  },
  plugins: [uglify()]
};