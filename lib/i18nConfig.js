const i18n = require('i18n')
const path = require('node:path')

i18n.configure({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  directory: path.join(__dirname, 'locales'),
  autoReload: true,
  syncFiles: true,
  cookie: 'nodepop-locale'
})

i18n.setLocale('en')

module.exports = i18n
