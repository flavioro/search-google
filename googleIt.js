// const e = require('express');
const fs = require('fs')
const  googleIt = require('google-it')
// const date = require('./date')
// const saveFile = require('./saveFile')

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

let search =  ''

// for (i = 0; i < searchWords.length; i++) {
//   console.log(`${i+1} ${searchWords[i]} \r\n`)
//   search = searchWords[i]
// }

processArray(searchWords)

// googleIt({'query': 'plantas de casa', 'limit': 15}).then(results => {
googleIt({'query': search, 'limit': 100})
  .then(results => {
    // console.log(new Date(),' => ', search)
    let txtFile = ''
    for (i = 0; i < results.length; i++) {
      // console.log(`${i+1} - ${results[i].link} - ${results[i].title}`)
      txtFile += `${i+1} ${results[i].link} | ${results[i].title} \r\n`
    }

    const dateFormatted = dateAndHoursNowFormatted('_')
    let nameFile = `${search}-${dateFormatted}.txt`
    console.log(nameFile)

    console.log(new Date(),' => ', search)

    nameFile = nameFile.replace('/', '').replace(':', '')
    fs.writeFileSync('./searchs/'+ nameFile, txtFile);
  }).catch(e => {
    // any possible errors that might have occurred (like no Internet connection)
    console.error('errors: ', e)
})

function delay() {
  return new Promise(resolve => setTimeout(resolve, 300));
}

async function delayedLog(item) {
  // notice that we can await a function
  // that returns a promise
  await delay();
  console.log(item);
  googleIt({query:item, limit:100});
}

async function processArray(array) {
  // map array to promises
  const promises = array.map(delayedLog);

  // wait until all promises are resolved
  await Promise.all(promises);
  console.log('Done!');
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

