import { format } from 'timeago.js';
const helpers = {};

helpers.timeago = (timestamp) => {
  return format(timestamp);
}

helpers.formatearSp = (timestamp) => {
  if (timestamp) {
    let mnth = ("0" + (timestamp.getMonth() + 1)).slice(-2);
    let day = ("0" + timestamp.getDate()).slice(-2);
    return [day, mnth, timestamp.getFullYear()].join("/");
  }
}

helpers.datetimelocal = (timestamp) => {
  if (timestamp) {
    let t = timestamp.toString().split(/[- :]/);
    let mnth = ("0" + (timestamp.getMonth() + 1)).slice(-2);
    let day = ("0" + timestamp.getDate()).slice(-2);
    return [timestamp.getFullYear(), mnth,day, ].join("-") + "T"+ t[4] + ":" + t[5];
  }
}


helpers.formatearHoras = (timestamp) => {
  if (timestamp) {
    var t = timestamp.toString().split(/[- :]/);
    return t[4] + ":" + t[5];
  }

}
//Este es el formateo necesario para encajar una fecha en un input de type="date"
helpers.formatearEn = (timestamp) => {
  if (timestamp) {
    let mnth = ("0" + (timestamp.getMonth() + 1)).slice(-2);
    letday = ("0" + timestamp.getDate()).slice(-2);
    return [timestamp.getFullYear(), mnth, day].join("-");
  }
}

helpers.when = (operand_1, operator, operand_2, options) => {
  var operators = {
    'eq': function (l, r) { return l == r; },
    'noteq': function (l, r) { return l != r; },
    'gt': function (l, r) { return Number(l) > Number(r); },
    'or': function (l, r) { return l || r; },
    'and': function (l, r) { return l && r; },
    '%': function (l, r) { return (l % r) === 0; }
  }
    , result = operators[operator](operand_1, operand_2);

  if (result) return options.fn(this);
  else return options.inverse(this);
}

export default helpers;