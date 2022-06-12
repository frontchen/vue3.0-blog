// 内置国际化语言包
import { createI18n } from 'vue-i18n'
import ch from '../locales/ch.json'
import en from '../locales/en.json'

const i18n = createI18n({
  locale: 'ch', //默认使用中文
  messages: {
    ch,
    en
  }
})

export default i18n
