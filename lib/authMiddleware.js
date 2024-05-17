module.exports = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login')
  }
  res.locals.subtitle = res.__('Customer Account')
  res.render('customer-account', { title: 'NODEPOP' })
}
