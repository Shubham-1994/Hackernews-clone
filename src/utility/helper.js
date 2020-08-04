import fetch from 'isomorphic-fetch';

export function fetchData(callback) {
  var requestOptions = {
    method: 'GET',
    rejectUnauthorized: false, 
    redirect: 'follow'
  };

  fetch("https://hn.algolia.com/api/v1/search?tags=front_page", requestOptions)
    .then(response => response.json())
    .then(result => callback(result))
    .catch(error => console.log('error', error));
}

// Formats string which contains a URL and returns just the domain name
// - - - - - - - - - - - - - - - - 
export function formatURL(url) {
  if(url) {
    let removeHTTP = url.replace(/(^\w+:|^)\/\//, '');
    let removeWWW = removeHTTP.replace(/www./i, '');
    let formattedURL = removeWWW.replace(/\/([^\s?#]+)/i, '');

    return formattedURL;
  }
}

// Formats the time to a modern date and time
// - - - - - - - - - - - - - - - - 
export function formatDateTime(unixDate) {
  let date = new Date(unixDate*1000);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getUTCFullYear();
  let hour = date.getUTCHours() + 1;
  let minutes = date.getUTCMinutes();

  const formattedTime = `${hour} hours`;
  const formateDate = `${day}/${month}/${year}`;
  return `${formattedTime}`;
}