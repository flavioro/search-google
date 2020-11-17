'use strict'

const fs = require('fs')
const  googleIt = require('google-it')
const exportToCsv = require('./utils/converters')
const utils = require('./utils/utils').saveFileAppend
const log = require('simple-node-logger').createSimpleLogger('archshop.log');
const results = require('./planta de casa-17_11_2020 14_54_19.json')


const searchWords = ['modelo de casa', 'modelo de casas', 'planta de casa', 
  'plantas de casas',  'projetos de casas', 'casa terreo', 
  'plantas de sobrado', 'projetos de casas online', 'modelo de projeto', 
  'planta baixa de casas', 'planta de casa com 3 quartos', 
  'planta de casa online', 'planta de sobrado', 
  'projeto de casas com 3 quartos', 'escritorio de arquitetura em Holambra', 
  'projeto arquitetonico', 'planta pronta', 'plantas para casas', 
  'plantas casas', 'projeto pronto', 'planta de casa pronta', 
  'planta de casas com 2 quartos', 'arquiteto em Holambra'
]

// const searchWords = ['planta de casa']

const search = [{"title": "ArchShop - Planta pronta e plantas de casas",
"link": "https://www.archshop.com.br/",
"snippet": "Plantas de ,casas, para ,projetos, terreos, sobrados, onde nossos engenheiros e arquitetos trazem modelos de ,casas, prontos para construir com videos de ,casas,, ..."}]

// log.info('position: 5; ', new Date().toJSON())
// log.info('position: 5; ', search)
// log.info(nameFile(""))
// log.info(nameFile("plantas casas"))

getJson()

function getJson(){
  let i = 0

  // for (i = 0; i < file.length; i++) {
  //   if (String(file[i].link).includes('archshop')) {
  //     const result = `, position:${i+1},${JSON.stringify(file[i])}`
  //     // const newAtribut = file[i].push(`position:${i+1}`)
  //     // console.log(newAtribut)
  //     // file.map(obj=> ({ ...obj, Active: 'false' }))
  //     let indexArch = file.findIndex(item => item.link.includes('archshop'));
  //     let itemArch = {position: indexArch+1, ...file[indexArch] }
  //     console.log(itemArch)
  //     console.log(JSON.stringify(itemArch))
      
  //     //console.log(result) //ok
  //     // console.log(JSON.parse(file[i]))
  //     // console.log(JSON.stringify(file[i])) //ok
  //     // console.log(result)
  //     // console.log(file[i])
  //     // const item = file[i]
  //     // console.log({item})
  //     // log.info(nameFile(query), result)
  //   }

  // }

  const indexArch = results.findIndex(item => item.link.includes('archshop'));
  if (indexArch) {
    //planta moderna-17_11_2020 16_33_1
    const dateTime = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    const itemAdd = {word: "planta de casa", date: dateTime, position: indexArch+1}
    // console.log(new Date().toUTCString()) // No Tue, 17 Nov 2020 19:51:01 GMT
    // console.log(new Date().getUTCDate()) // No 17
    // console.log(new Date().toLocaleDateString()) // No 17/11/2020
    // console.log(new Date().toJSON()) // No 2020-11-17T19:51:01.490Z
    // console.log(new Date().toLocaleTimeString()) // No 16:53:53
    const itemArch = {...itemAdd, ...results[indexArch] }
    // console.log(itemArch)
    // log.info(JSON.stringify(itemArch))
    utils('archshop.json', JSON.stringify(itemArch)+',')
  }
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

  console.log(query);


  googleIt({query, limit, output})
  .then(results => {
    console.log(query,' => ', limit)
    // let txtFile = ''
    // // console.log(results)

    let i = 0
    for (i = 0; i < results.length; i++) {
      if (String(results[i].link).includes('archshop.com.br')) {
        
      }
      // console.log(`${i+1} - ${results[i].link} - ${results[i].title}`)
      txtFile += `${i+1} ${results[i].link} | ${results[i].title} \r\n`
    }



    let fileCsv = exportToCsv.createCSVData(results, '|')
    // console.log(fileCsv)

    fs.writeFileSync('./searchs/'+ output, fileCsv);

  }).catch(e => {
    // any possible errors that might have occurred (like no Internet connection)
    console.error('errors: ', e)
})
  return 'success'
}

async function getTodos(array) {
  for (const [idx, query] of array.entries()) {
    const todo = await delayedLog(query)
    console.log(`Received search ${idx+1} to ${query}:`, todo);
  }

  console.log('Finished!');
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
