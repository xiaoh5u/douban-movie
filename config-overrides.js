const {override,
      addWebpackAlias,
      useEslintRc,
      fixBabelImports
} = require('customize-cra')
      const path = require('path')
      
      module.exports = override(
          addWebpackAlias({
              '@': path.resolve(__dirname, 'src/'),
          }),

          useEslintRc(),

        // 配置antd-mobile的按需引入
        fixBabelImports('import', {
            libraryName: 'antd-mobile',
            style: 'css',
        })
      )