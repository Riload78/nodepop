const index = async (req, res, next) => {
  try {
    res.locals.subtitle = res.__('Customer Account')
    res.locals.error = ''
    res.locals.email = ''

    res.render('customer-account', { title: 'NODEPOP' })
  } catch (error) {
    next(error)
  }
}

module.exports = { index }
