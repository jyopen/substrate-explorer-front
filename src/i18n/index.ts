import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const locale = localStorage.getItem('language') || window.navigator.language || 'zh';

export const isEn = () => {
    return locale.includes('en');
};

export const i18n = new VueI18n({
    locale: isEn() ? 'en' : 'zh',
    fallbackLocale: 'zh',
    silentTranslationWarn: true,
    messages: !isEn() ? {
        zh: require('./lang/zh.json'),
    } : {
        en: require('./lang/en.json'),
    }
});
