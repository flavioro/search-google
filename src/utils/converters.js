// import { isArray, getEntries, normalizeXMLName, indent, stripHTML, assert } from './utils'
const getEntries = require('./utils').getEntries

// function _prepareData (data: object | string): object {
//   const MESSAGE_VALID_JSON_FAIL = 'Invalid export data. Please provide a valid JSON'
//   try {
//     return typeof data === 'string' ? JSON.parse(data) as object : data
//   } catch {
//     throw new Error(MESSAGE_VALID_JSON_FAIL)
//   }
// }

// TODO:: execute toSchema implicit converting
function _createJSONData (
  data,
  replacer = null,
  space,
) {
  const MESSAGE_VALID_JSON_FAIL = 'Invalid export data. Please provide valid JSON object'
  try {
    return JSON.stringify(data, replacer, space)
  } catch {
    throw new Error(MESSAGE_VALID_JSON_FAIL)
  }
}

function _createTableMap (data) {
  return data.map(getEntries).reduce(
    (tMap, rowKVs, rowIndex) =>
      rowKVs.reduce(
        (map, [key, value]) => {
          const columnValues = map[key] || Array.from({ length: data.length }).map(_ => '')
          columnValues[rowIndex] =
            (typeof value !== 'string' ? JSON.stringify(value) : value) || ''
          map[key] = columnValues

          return map
        },
        tMap,
      ),
    Object.create(null),
  )
}

// export interface ITableEntries extends Array<{ fieldName: string, fieldValues: string[] }> {}

function _createTableEntries (tableMap) {
  return getEntries(tableMap).map(([fieldName, fieldValues]) => ({
    fieldName,
    fieldValues,
  }))
}

function createCSVData (data, delimiter = ',') {
  if (!data.length) return ''

  const tableMap = _createTableMap(data)
  const tableEntries = _createTableEntries(tableMap)
  const head = tableEntries.map(({ fieldName }) => fieldName)
    .join(delimiter) + '\r\n'
  const columns = tableEntries.map(({ fieldValues }) => fieldValues)
    .map(column => column.map(value => `"${value.replace(/\"/g, '""')}"`))
  const rows = columns.reduce(
    (mergedColumn, column) => mergedColumn.map((value, rowIndex) => `${value}${delimiter}${column[rowIndex]}`),
  )

  return head + rows.join('\r\n')
}

// function _renderTableHTMLText (data: any[]) {
//   assert(data.length > 0)

//   const tableMap = _createTableMap(data)
//   const tableEntries = _createTableEntries(tableMap)
//   const head = tableEntries.map(({ fieldName }) => fieldName)
//     .join('</b></th><th><b>')
//   const columns = tableEntries.map(({ fieldValues }) => fieldValues)
//     .map(column => column.map(value => `<td>${value}</td>`))
//   const rows = columns.reduce(
//     (mergedColumn, column) => mergedColumn
//       .map((value, rowIndex) => `${value}${column[rowIndex]}`),
//   )

//   return `
//     <table>
//       <thead>
//         <tr><th><b>${head}</b></th></tr>
//       </thead>
//       <tbody>
//         <tr>${rows.join(`</tr>
//         <tr>`)}</tr>
//       </tbody>
//     </table>
//   `
// }

// function createXLSData (data: any[]) {
//   if (!data.length) return ''

//   const content =

// `<html>
//   <head>
//     <meta charset="UTF-8">
//   </head >
//   <body>
//     ${_renderTableHTMLText(data)}
//   </body>
// </html >
// `

//   return content
// }

// function createXMLData (data: object) {
//   const content =

// `<?xml version="1.0" encoding="utf-8"?><!DOCTYPE base>
// ${_renderXML(data, 'base')}
// `

//   return content
// }

// function _renderXML (data: any, tagName: string, arrayElementTag = 'element', spaces = 0): string {
//   const tag = normalizeXMLName(tagName)
//   const indentSpaces = indent(spaces)

//   if (data === null || data === undefined) {
//     return `${indentSpaces}<${tag} />`
//   }

//   const content = isArray(data)
//     ? data.map(item => _renderXML(item, arrayElementTag, arrayElementTag, spaces + 2)).join('\n')
//     : typeof data === 'object'
//       ? getEntries(data as Record<string, any>)
//         .map(([key, value]) => _renderXML(value, key, arrayElementTag, spaces + 2)).join('\n')
//       : indentSpaces + '  ' + stripHTML(String(data))

//   const contentWithWrapper =

// `${indentSpaces}<${tag}>
// ${content}
// ${indentSpaces}</${tag}>`

//   return contentWithWrapper
// }

module.exports = {
  createCSVData
};