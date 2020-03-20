import request from './request';
import {formatSize, formatFriendlyTime, formatType} from './format';


/**
 * 判断是否是手机
 * @returns {boolean}
 */
function isMobile() {
    const ua = navigator.userAgent;
    return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(ua);
}

export {
    request,
    formatFriendlyTime,
    formatType,
    formatSize,
    isMobile
};


