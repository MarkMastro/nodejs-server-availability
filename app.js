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
//return the url with the lowest priority
const getLowestOnlineServerPriority = (onlineServers) => {
  let lowestPriorityServer = onlineServers[0];

  for(let onlineServer of onlineServers) {
    onlineServer.priority < lowestPriorityServer.priority ? lowestPriorityServer = onlineServer: null;
  }
  return lowestPriorityServer.url;
}

const getOnlineServers = async () => {
  const onlineServers = [];
  const settledServerCalls = Promise.allSettled([
      axios.get(serverArray[0].url),
      axios.get(serverArray[1].url),
      axios.get(serverArray[2].url),
      axios.get(serverArray[3].url),
  ])
  
  const status = await settledServerCalls
  for(let request of status) {
    if(request.reason){
        null;          
    } else if(request.value.status <=299 && request.value.status >= 200) {
      onlineServers.push(
        {
          "url" : request.value.config.url,
          "priority": returnServerPriority(request.value.config.url)
      })

    } else{
      null;
    }
  }
  return onlineServers
}


  const findServer =  async () => {
    //gets the online servers with their priorities
   const onlineServers =  await getOnlineServers();
   
   return new Promise((resolve, reject) => {
     //if we do have any online servers, resolve witht he lowest priority url
    if(onlineServers.length > 0 ) {
      const lowestPriorityUrl = getLowestOnlineServerPriority(onlineServers);
      console.log(lowestPriorityUrl)
      resolve(lowestPriorityUrl)
    } else {
      reject("All servers offline")
    }
    
    })

    
    
  }
  findServer()