const index = (req, res) => {
  res.locals.subtitle = res.__('Customer Account')
  res.locals.error = ''
  res.locals.email = ''

  res.render('customer-account', { title: 'NODEPOP' })
}

module.exports = { index }
