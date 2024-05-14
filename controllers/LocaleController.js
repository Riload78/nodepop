const changeLocale = (req, res) => {
  const locale = req.params.locale
  res.cookie('nodepop-locale', locale, {
    maxAge: 900000
  })
  res.redirect('/')
}

module.exports = { changeLocale }
