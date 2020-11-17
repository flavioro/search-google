function isArray (data) {
  return Object.prototype.toString.call(data) === '[object Array]'
}

function assert (condition, msg) {
  if (!condition) throw new Error(msg)
}

function getValues (data) {
  return Object.keys(data).map(key => data[key])
}

function getKeys (data) {
  return Object.keys(data)
}

function getEntries (data) {
  return Object.keys(data).map(key => [key, data[key]])
}

function normalizeFileName (fileName, extension) {
  const suffix = '.' + extension
  const extensionPattern = new RegExp(`(\\${extension})?$`)

  return fileName.replace(/\s+/, '_').replace(extensionPattern, suffix)
}

function normalizeXMLName (name) {
  '555xmlHello .  world!'.trim().replace(/^([0-9,;]|(xml))+/, '')

  return name.replace(/[^_a-zA-Z 0-9:\-\.]/g, '').replace(/^([ 0-9-:\-\.]|(xml))+/i, '').replace(/ +/g, '-')
}

function indent (spaces) {
  return Array(spaces + 1).join(' ')
}

function stripHTML (text) {
  return text.replace(/([<>&])/g, (_, $1) => {
    switch ($1) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      default: return ''
    }
  })
}

function saveFileAppend(nameFile, textSave) {
  fs.appendFile(nameFile, textSave, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

module.exports = {
  isArray,
  assert,
  getValues,
  getKeys,
  getEntries,
  normalizeFileName,
  normalizeXMLName,
  indent,
  stripHTML,
  saveFileAppend,
}