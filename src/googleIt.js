'use strict'

const fs = require('fs')
const  googleIt = require('google-it')
// const exportFromJSON = require('export-from-json')
const exportToCsv = require('./utils/converters')
const utils = require('./utils/utils').saveFileAppend

const searchWords = [
  'casa terreo',

  'modelo de casa', 
  'modelo de projeto', 

  'plantas para casas', 
  'planta de casa', 
  'planta de casa online',
  'planta de casas com 2 quartos', 
  'planta de casa com 3 quartos',
  'planta de casa pronta', 
  'planta pronta', 
  'planta baixa de casas',  
  'planta de sobrado', 

  'projetos de casas',
  'projetos de casas online', 
  'projeto pronto',  
  'projeto arquitetonico',   
  'projeto de casas com 3 quartos',  

  'arquiteto em Holambra', 
  'escritorio de arquitetura em Holambra',
]
// const searchWords = ['planta pronta']

let contador = 0
getTodos(searchWords)

async function delay() {
  return await new Promise(resolve => setTimeout(resolve, 6000));
}

function nameFile(nameFile) {
  const dateFormatted = dateAndHoursNowFormatted('_')

  let startName = nameFile
  if (startName) {startName = startName + '-'}
  let nameFileNew = `${startName}${dateFormatted}`

  nameFileNew = nameFileNew.replace('/', '').replace(':', '')
  return nameFileNew
}

async function delayedLog(query) {
  // notice that we can await a function
  // that returns a promise
  await delay();

  const limit = 100
  // const diagnostics = true
  const output = './searchs/'+ nameFile(query)
  const disableConsole  = true

  contador++

  googleIt({query, limit, output, disableConsole})
  .then(results => {
    console.log(contador + ' ' + query,' => ', limit)

    if (Array.isArray(results) && typeof results != "undefined" && results != null 
      && results.length != null && results.length > 0 ) {
      const indexArch = results.findIndex(item => item.link.includes('archshop'));
      if (indexArch && indexArch > 0) {
        const dateTime = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
        const itemAdd = {word: query, date: dateTime, position: indexArch+1}
        const itemArch = {...itemAdd, ...results[indexArch] }
        utils('./src/archshop.json', JSON.stringify(itemArch)+',')
      }
  
      let fileCsv = exportToCsv.createCSVData(results, '|')
      fs.writeFileSync(output+'.csv', fileCsv);
  }


  }).catch(e => {
    // any possible errors that might have occurred (like no Internet connection)
    console.error('errors: ', e)
})
  return 'success'
}

async function getTodos(array) {
  for (const [idx, query] of array.entries()) {
    const todo = await delayedLog(query)
  }
}

function readFile(output) {
  const fileRead = fs.readFile('/doesnt/exist', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    return data;
  });

  let fileCsv = exportToCsv.createCSVData(fileRead, '|')

  fs.writeFileSync(output+'.csv', fileCsv);
}

function dateNowFormatted(separator='/') {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because in getMonth January starts with zero.
  const year = date.getFullYear();

  return `${day}${separator}${month}${separator}${year}`;
}

function dateAndHoursNowFormatted(separator=':') {
  const date = new Date();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${dateNowFormatted(separator)} ${hour}${separator}${minute}${separator}${second}`;
}
