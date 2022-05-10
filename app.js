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

const returnServerPriority = (serverUrl) => {
  for (let server of serverArray) {
    if (serverUrl === server.url) {
      return server.priority
    }
  }
}

const getLowestPriority = (goodServers) => {
  const lowestPriority = goodServers[0].url;
  for(let goodServer of goodServers) {
    lowestPriority > goodServer.priority ? lowestPriority = goodServer.url : null;
  }
  return lowestPriority;
}
  const findServer = () => {
    console.log("find")
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
            goodServers.push(
              {
                "url" : request.value.config.url,
                "priority": returnServerPriority(request.value.config.url)
            })
          } else{
            null
          }
        }

        console.log(goodServers)
    })
    // .then(() => {
    //   return new Promise((resolve, reject) => {
    //     console.log(goodServers.length)
    //     if(goodServers.length > 0 ) {
    //       const lowestPriorityUrl = getLowestPriority(goodServers);
    //       resolve(lowestPriorityUrl)
    //     } else {
    //       reject("All servers offline")
    //     }
        
    //   })
    // })
    // .catch(e=>console.log("error", e))

    
    
  }
  findServer()