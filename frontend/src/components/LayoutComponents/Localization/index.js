import React from 'react'
import { ConfigProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import english from 'locales/en-US'
import french from 'locales/fr-FR'
import russian from 'locales/ru-RU'
import chinese from 'locales/zh-CN'
import brazilian from 'locales/pt-BR'

// addLocaleData(english.localeData)
// addLocaleData(french.localeData)
// addLocaleData(russian.localeData)
// addLocaleData(chinese.localeData)

const locales = {
  'en-US': english,
  'pt-BR': brazilian,
  'fr-FR': french,
  'ru-RU': russian,
  'zh-CN': chinese,
}

@connect(({ settings }) => ({ settings }))
class Localization extends React.Component {

  render() {
    const {
      children,
      settings: { locale },
    } = this.props
    const currentLocale = locales[locale]

    return (
      <ConfigProvider locale={currentLocale.antdData}>
        <IntlProvider locale={currentLocale.locale} messages={currentLocale.messages}>
          {children}
        </IntlProvider>
      </ConfigProvider>
    )
  }
}

export default Localization
