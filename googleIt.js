const fs = require('fs')
const  googleIt = require('google-it')
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

const searchWords = ['modelo de casa']

let search =  ''

getTodos(searchWords)

// googleIt({'query': 'plantas de casa', 'limit': 15}).then(results => {


async function delay() {
  return await new Promise(resolve => setTimeout(resolve, 3000));
}

async function delayedLog(query) {
  // notice that we can await a function
  // that returns a promise
  await delay();
  console.log(query);

  const limit = 100
  const diagnostics = true
  googleIt({query, limit})
  .then(results => {
    console.log(query,' => ', limit)
    let txtFile = ''
    console.log(results)
    for (i = 0; i < results.length; i++) {
      console.log(`${i+1} - ${results[i].link} - ${results[i].title}`)
      txtFile += `${i+1} ${results[i].link} | ${results[i].title} \r\n`
    }

    const dateFormatted = dateAndHoursNowFormatted('_')
    let nameFile = `${query}-${dateFormatted}.txt`
    console.log(nameFile)

    nameFile = nameFile.replace('/', '').replace(':', '')
    fs.writeFileSync('./searchs/'+ nameFile, txtFile);
    return 'file saved'

  }).catch(e => {
    // any possible errors that might have occurred (like no Internet connection)
    console.error('errors: ', e)
})
}

async function getTodos(array) {
  for (const [idx, query] of array.entries()) {
    const todo = await delayedLog(query)
    console.log(`Received Todo ${idx+1}:`, todo);
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
