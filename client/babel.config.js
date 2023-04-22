console.log('test-babel')

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }, {
      modules: 'commonjs',
      loose: true,
    }],
    '@babel/preset-typescript',
    '@babel/react',
    '@babel/env'
  ],
  plugins: ['@babel/plugin-transform-modules-commonjs']

}