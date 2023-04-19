import isEmail from 'validator/es/lib/isEmail'
import isIP from 'validator/es/lib/isIP'
import isMobilePhone from 'validator/es/lib/isMobilePhone'
import isURL from 'validator/es/lib/isURL'
import isNumeric from 'validator/es/lib/isNumeric'

function isCNMobilePhone(val: string) {
  return isMobilePhone(val, 'zh-CN', { strictMode: false })
}

export { isEmail, isIP, isMobilePhone, isURL, isCNMobilePhone, isNumeric }
