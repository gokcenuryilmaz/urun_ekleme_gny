const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'UrunEkleme',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    manifestOptions: {
      background_color: '#ffffff'
    },
    workboxOptions: {
      skipWaiting: true
    }
  }
});
