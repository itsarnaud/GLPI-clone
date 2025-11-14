export const formatErrors = (errors, fields) => {
  const getMsg = (error) => {
    if (!error) return '';
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    try { return JSON.stringify(error); } catch { return String(error); }
  }

  // Reset provided field errors first
  if (fields && typeof fields === 'object') {
    Object.keys(fields).forEach(k => fields[k] = null);
  }

  if (Array.isArray(errors)) {
    const leftovers = [];
    for (const error of errors) {
      const msg = getMsg(error);
      const field = Array.isArray(error?.path) ? error.path[0] : null;
      if (fields && field && Object.prototype.hasOwnProperty.call(fields, field)) {
        fields[field] = msg;
      } else if (msg) {
        leftovers.push(msg);
      }
    }
    return leftovers.length ? leftovers.join(' ') : null;
  } else {
    const msg = getMsg(errors);
    return msg;
  }
}

