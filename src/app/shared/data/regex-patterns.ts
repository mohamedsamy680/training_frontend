export const uriPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
export const arPatternMore1Word = /[^\s](\s?[\u0621-\u064A])+$$/;
export const enArPattern = /^[^\s](\s?[a-zA-Z\u0621-\u064A])+$$/;
export const regexEnglishWordsOnly = /^[^\s](([a-zA-Z])+(\s?([a-zA-Z]){2,})*)$/;
export const enPatternMore1Word = /^(\b\s?[a-zA-Z]{2,}\b){1,}$/;
export const enNoSpecialNoSpace = /^[a-zA-Z0-9]{1,}$/;
export const length4 = /^\w{4,}$/;

export const enNoSpecial = /^(\s?[a-zA-Z0-9]){1,}$/;

export const mobPattern = /^(01)([0-2,5]{1})([0-9]{8})$/;
export const phonePattern = /^(0)(2|3|4([5-9|0|3])|5([0|5|7])|6([2-5|8])|1([3|5|6])|28|8([2|4|6|8])|9([2|3|5-7])|6([6|9])(3)|9([5|7])(2))([1-9])([0-9]{6,7})$/;
export const mobOrPhonePattern = /^((01)([0-2,5]{1})([0-9]{8}))|((0)(2|3|4([5-9|0|3])|5([0|5|7])|6([2-5|8])|1([3|5|6])|28|8([2|4|6|8])|9([2|3|5-7])|6([6|9])(3)|9([5|7])(2))([1-9])([0-9]{6,7}))$/;
// time Fromate 00:00:00
export const timePattern = /^([0-1]?\d|2[0-3])(?::([0-5]?\d))?(?::([0-5]?\d))?$/;
export const modawaEmail = /^([a-zA-Z0-9_\\-\\.]+)@modawaeg.com$/;
export const a2bEmail = /^([a-zA-Z0-9_\\-\\.]+)@a2b.com$/;
// No zero start and only 2 decimal optional
export const salaryPattern = '^[1-9][0-9]+(\.[0-9]{2})?$';

// Minimum eight characters, at least one letter,one special character and one number
export const passwordPattern = /^(?=.*[a-zÁ-í])(?=.*[A-Z])(?=.*\d)[A-Za-zÁ-í\d]{8,}$/;

//supports valid ID and passport of 9 characters
export const nationalIdPattern = /^(?:((2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)[0-9][0-9][0-9][0-9][0-9])|([a-zA-Z0-9]{3,9}))$/;



// must contain at least 8 characters, at least one Lowercase letters, at least one Uppercase letters, at least one Numbers and at least one Special characters.
export const passwordPattern2 = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';

// must contain at least 8 characters, Lowercase letters, Uppercase letters, Numbers and Special characters (@ _ # ~ &).
export const passwordPattern3 = /^[A-Za-z0-9_@#&~]{8,16}$/;


// accept only intger and decimal value
export const intDecimalNumbers = '^[0-9]+(\.[0-9]+)?$';
//supports valid ID and passport of 9 characters
export const nationalIdPattern14 = /^(?:((2|3)[0-9][1-9][0-1][1-9][0-3][0-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)[0-9][0-9][0-9][0-9][0-9])|([a-zA-Z0-9]{14,14}))$/;


export const timeStringFormat = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;

export const noSpecial = /^[^*|\":<>[\]{}`\\()';@&$]+$/;

export const englishNumbersRegexLeast2Digits = /^(((\s?[A-Za-z0-9]){2,})(\s?[A-Za-z0-9]*){1,})$/;

export const englishNumbersRegex = /^(([A-Za-z0-9]+)(\b\s?[A-Za-z0-9]*){1,})$/;
export const egyptianNationalID = /^((2|3)[0-9][1-9](([0][1-9])|([1][0-2]))(([0-3][1-9])|([1-3][0-9]))(01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d)$/;

// No freezing
export const arabicNumbersRegex = /^([\s]?[\u0621-\u064A\d_()*-]){1,}$/;
