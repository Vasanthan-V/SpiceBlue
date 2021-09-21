/* eslint-disable guard-for-in */
/* eslint-disable indent */
/**
 * Return json parsed response
 * @param response
 * @returns {*} json
 */
export function isNumeric(e) {
  const keyCode = e.which ? e.which : e.keyCode;
  return ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode === 8) ? true
    : e.preventDefault();
}

export function parseJSON(response) {
  return response.json() || response;
}
export function parser(response) {
  return JSON.parse(response);
}
export function stringifier(response) {
  return JSON.stringify(response);
}
export function isEmpty(obj) {
  return (Object.keys(obj).length) ? 0 : 1;
}
/**
 * Check the response status and return
 * response or throw error
 * @param response
 * @returns {*} response or throw error
 */
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  // if api sends back failure status code,
  // throws response and treated as error in the catch block
  throw response;
}

export function jsonToUrlEncoded(json) {
  return Object.entries(json).map((e) => e.join('=')).join('&');
}

export function isEmailValid(email) {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function regexValid(reg, txt) {
  return !reg.test(txt);
}
export function keyValidator(e) {
  const key = (e.keyCode) ? e.keyCode : e.which;
  return ((key >= 48 && key < 57) || key === 8) ? true : e.preventDefault();
}

export function validateField(value, {
  isRequired,
  isEmail,
}) {
  let error = '';

  if (isRequired) {
    error = !value.length ? 'Please enter the information' : '';
  }

  if (isEmail) {
    error = !isEmailValid(value) ? 'Please enter a valid email' : '';
  }

  return error;
}
/**
 * swapping object index in object Array
 */
export function objectSwapper(arr, objTitle, txt) {
  arr.map((x, y) => {
    if (x[objTitle].toLowerCase().match(txt) !== null) {
      const temp = arr[0];
      arr[0] = x;
      arr[y] = temp;
    }
    return x;
  });
  return arr;
}
/**
 * Return dynamic Form request object
 */
export function requestObject(arr) {
  const obj = {};
  const validationObj = {};
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    ('name' in arr[i] && arr[i].name) && (obj[arr[i].name] = arr[i].value);
    (arr[i].getAttribute('pattern')) && (validationObj[arr[i].name] = regexValid(RegExp(arr[i].getAttribute('pattern', 'g')), arr[i].value));
  }
  return [obj, validationObj];
}
export function requestFormikObj(arr) {
  const validationObj = {};
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    (arr[i].getAttribute('pattern')) && (validationObj[arr[i].name] = regexValid(RegExp(arr[i].getAttribute('pattern', 'g')), arr[i].value));
  }
  return validationObj;
}
export function fetchElementValues(arr, obj) {
  const len = arr.length;
  const objKeys = Object.keys(obj);
  for (let i = 0; i < len; i += 1) {
    objKeys.map((keyName) => {
      (arr[i].name === keyName && keyName !== 'image') && (arr[i].value = obj[keyName]);
      return keyName;
    });
  }
}

export function objToQueryString(params) {
  return Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
}

/**
 * Scroll Top animation
 */
export function scrollToTop(scrollDuration) {
  const scrollStep = -window.scrollY / (scrollDuration / 15);
  const scrollInterval = setInterval(() => {
    (window.scrollY !== 0) ? window.scrollBy(0, scrollStep) : clearInterval(scrollInterval);
  }, 15);
}

export function convertNumberToArray(len) {
  return Array.from(Array(len), (x, i) => i + 1);
}

export function imageFinder(txt) {
  return /jpeg|jpg|png/.test(txt);
}
/**
 * Date format
 */
export function formatDate(date) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${day} ${monthNames[monthIndex]}  ${year}`;
}

export function generateMonths(n) {
  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return [...Array(n)].map((_, index) => ({
    name: monthArr[index],
    val: new Date().getMonth() - 1 + index,
  }));
}
export function dateFetcher(dte) {
  return (dte && new Date(dte)) || new Date();
}

export function dateComparer(dte) {
  return (dateFetcher().getMonth() === dateFetcher(dte).getMonth())
    && (dateFetcher().getDate() === dateFetcher(dte).getDate());
}

export function generateNumbers(n) {
  return [...Array(n)].map((_, index) => index + 1).toString().split(',');
}
export function generateYears(yr, n) {
  return [...Array(n)].map((_, index) => new Date(yr).getFullYear() + index).toString().split(',');
}

export function dateBeautifier(dateObj, timebool) {
  let dateSpliter = '';
  if (dateObj !== null && dateObj !== '') {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    dateSpliter = dateFetcher(dateObj);
    if (timebool) {
      dateSpliter = `${dateSpliter.getDate()} ${month[(dateSpliter.getMonth())]} ${dateSpliter.getFullYear()} ${(dateSpliter.getHours())}:${(dateSpliter.getMinutes())}: ${dateSpliter.getSeconds()}:${dateSpliter.getMilliseconds()} ${((dateSpliter.getHours() >= 12) ? 'PM' : 'AM')}`;
    } else {
      dateSpliter = `${dateSpliter.getDate()} ${month[(dateSpliter.getMonth())]} ${dateSpliter.getFullYear()}`;
    }
  }
  return dateSpliter;
}

export function compareId(a, b) {
  if (a.person_id < b.person_id) return 1;
  if (b.person_id < a.person_id) return -1;
  return 0;
}
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function scrollBottomDetect(e) {
  return {
    bottomDetect: (document.body.scrollHeight === window.pageYOffset + window.innerHeight),
    scrollTopDetect: e.scrollTop,
  };
}

export function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
  // If JSONData is not an object then JSON.parse will parse the JSON string in an Object
  const arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;

  let CSV = '';
  if (ShowLabel) {
    let row = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const index in arrData[0]) {
      // Now convert each value to string and comma-seprated
      row += `${(index.replace(/_/g, ' ')).toUpperCase()},`;
    }

    row = row.slice(0, -1);

    // append Label row with line break
    CSV += `${row}\r\n`;
  }

  // 1st loop is to extract each row
  for (let i = 0; i < arrData.length; i += 1) {
    let row = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const index in arrData[i]) {
      row += `"${arrData[i][index]}",`;
    }

    // add a line break after each row
    CSV += `${row}\r\n`;
  }

  if (CSV === '') {
    console.log('Invalid data');
    return;
  }

  let fileName = 'MyReport_';
  // this will remove the blank-spaces from the title and replace it with an underscore
  fileName += ReportTitle.replace(/ /g, '_');

  // Initialize file format you want csv or xls
  const uri = `data:text/csv;charset=utf-8,${escape(CSV)}`;

  const link = document.createElement('a');
  link.href = uri;

  // set the visibility hidden so it will not effect on your web-layout
  link.style = 'visibility:hidden';
  link.download = `${fileName}.csv`;

  // this part will append the anchor tag and remove it after automatic click
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function randomGen(length) {
  return Math.round(((36 ** (length + 1)) - Math.random() * (36 ** length))).toString(36).slice(1);
}

export function downloadReport(url, type) {
  const hiddenElement = document.createElement('a');
  hiddenElement.href = url;
  hiddenElement.target = '_blank';
  hiddenElement.download = `report.${type}`;
  hiddenElement.click();
}