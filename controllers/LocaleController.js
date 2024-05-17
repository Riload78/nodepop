const changeLocale = (req, res, next) => {
  const locale = req.params.locale
  const session = req.session.userId

  res.cookie('nodepop-locale', locale, {
    maxAge: 900000
  })
  if (session) {
    res.redirect('back')
  } else {
    res.redirect('/login')
  }
}

module.exports = { changeLocale }
