const fs = require('fs')
const date = require('./date')

async function SaveFile(file, search){
  const dateFormatted = date.dateAndHoursNowFormatted
  let nameFile = `${search}-${dateFormatted}.txt`
  console.log(nameFile)

  console.log(new Date(),' => ', search)

  nameFile = nameFile.replace('/', '').replace(':', '')
  fs.writeFileSync(nameFile, file);
}

module.exports = 
  SaveFile()