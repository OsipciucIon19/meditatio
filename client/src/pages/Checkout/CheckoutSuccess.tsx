import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CheckoutSuccess = () => {
  const { t } = useTranslation()
  
  return (
    <>
      <h1>{t('successful-payment')}! ✅</h1>
      <p>{t('see-lessons')}</p>
      <Link to="/calendar" className="btn btn-secondary">
        {t('access-calendar')}
      </Link>
    </>
  )
}

export default CheckoutSuccess