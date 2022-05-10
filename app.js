const axios = require("axios");

const serverArray = [
    {
      "url": "http://doesNotExist.boldtech.co",
      "priority": 1
    },
    {
      "url": "http://boldtech.co",
      "priority": 7
    },
    {
      "url": "http://offline.boldtech.co",
      "priority": 2
    },
    {
      "url": "http://google.com",
      "priority": 4
    }
  ]

  const findServer = () => {
    const goodServers = [];
    Promise.allSettled([
        axios.get(serverArray[0].url),
        axios.get(serverArray[1].url),
        axios.get(serverArray[2].url),
        axios.get(serverArray[3].url),
    ]).then((all) => {
        for(let request of all) {
          if(request.reason){
              null          
          } else if(request.value.status <=299 && request.value.status >= 200) {
            goodServers.push(request.value.config.url)
          } else{
            null
          }
        }
        console.log(goodServers)
    }).catch(e=>console.log("error", e))

    // return new Promise((resolve, reject) => {

    // })
  }
  findServer()