'use strict'

const fs = require('fs')
const  googleIt = require('google-it')
// const exportFromJSON = require('export-from-json')
const exportToCsv = require('./utils/converters')
const utils = require('./utils/utils').saveFileAppend
const log = require('simple-node-logger').createSimpleLogger('archshop.log');
// const  googleIt = require('./googleIt_')
// const date = require('./date')
// const saveFile = require('./saveFile')

// const searchWords = ['modelo de casa', 'modelo de casas', 'planta de casa', 
//   'plantas de casas',  'projetos de casas', 'casa terreo', 
//   'plantas de sobrado', 'projetos de casas online', 'modelo de projeto', 
//   'planta baixa de casas', 'planta de casa com 3 quartos', 
//   'planta de casa online', 'planta de sobrado', 
//   'projeto de casas com 3 quartos', 'escritorio de arquitetura em Holambra', 
//   'projeto arquitetonico', 'planta pronta', 'plantas para casas', 
//   'plantas casas', 'projeto pronto', 'planta de casa pronta', 
//   'planta de casas com 2 quartos', 'arquiteto em Holambra'
// ]







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
  console.log(query);

  const limit = 100
  // const diagnostics = true

  const output = './searchs/'+ nameFile(query)
  const disableConsole  = true

  googleIt({query, limit, output, disableConsole})
  .then(results => {
    console.log(query,' => ', limit)
    // let txtFile = ''
    // // console.log(results)

    // let i = 0
    // for (i = 0; i < results.length; i++) {
    //   if (String(results[i].link).includes('archshop.com.br')) {
    //     const result = `, position:${i+1},${results[i]}`
    //     log.info(nameFile(query), {result})
    //   }
    //   // console.log(`${i+1} - ${results[i].link} - ${results[i].title}`)
    //   // txtFile += `${i+1} ${results[i].link} | ${results[i].title} \r\n`
    // }

    const indexArch = results.findIndex(item => item.link.includes('archshop'));
    if (indexArch && indexArch > 0) {
      const dateTime = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      const itemAdd = {word: query, date: dateTime, position: indexArch+1}
      const itemArch = {...itemAdd, ...results[indexArch] }
      utils('archshop.json', JSON.stringify(itemArch)+',')
    }

    let fileCsv = exportToCsv.createCSVData(results, '|')
    // console.log(fileCsv)
    // console.log(output)
    fs.writeFileSync(output+'.csv', fileCsv);

  }).catch(e => {
    // any possible errors that might have occurred (like no Internet connection)
    console.error('errors: ', e)
})
  return 'success'
}

async function getTodos(array) {
  for (const [idx, query] of array.entries()) {
    const todo = await delayedLog(query)
    // console.log(`Received search ${idx+1} to ${query}:`, todo);
  }

  // console.log('Finished!');
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

const month = (date) =>
  (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because in getMonth January starts with zero.

function dateAndHoursNowFormatted(separator=':') {
  const date = new Date();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${dateNowFormatted(separator)} ${hour}${separator}${minute}${separator}${second}`;
}
