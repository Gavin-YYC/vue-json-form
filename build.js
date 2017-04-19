import vue from 'rollup-plugin-vue2';
import less from 'rollup-plugin-less';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

const env = process.env.NODE_ENV;

export default {
  entry: 'src/main.js',
  dest: 'build/app.js',
  format: 'umd',
  moduleName: 'app',
  plugins: [
    vue(),
    less({
      insert: false,
      output: './build/app.css'
    }),
    babel({ exclude: 'node_modules/**' }),
    resolve({ jsnext: true, main: true, browser: true }),
    commonjs(),
    (env === 'production' && uglify()),
    (env !== 'production' && livereload()),
    (env !== 'production' && serve({
      contentBase: './',
      port: 8081,
      open: true
    }))
  ]
};
