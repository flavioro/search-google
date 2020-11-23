const google = require('google');

google.resultsPerPage = 25
var nextCounter = 0
 
google('node.js best practices', async function (err, res){
  if (err) console.error(err)
  
  for (var i = 0; i < res.links.length; ++i) {
    var link = res.links[i];
    await console.log(link.title + ' - ' + link.href)
    await console.log(link.description + "\n")
  }
 
  if (nextCounter < 4) {
    nextCounter += 1
    if (res.next) res.next()
  }
})

module.exports = google