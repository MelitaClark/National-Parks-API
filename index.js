const searchURL ='https://api.nps.gov/api/v1/parks';

function formatQueryParams(params){
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

function getParksURL(q, stateCode, maxResults=10) {
    const params = {
    api_key:'Q3K2ju9f8lajc5PDetExN7v4lnfkzZsqcSEyW1J5',
    q:q,
    stateCode: stateCode,
    limit: maxResults,
   
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

  

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }if(responseJson.data === undefined){
        return $('#js-error-message').text(`Search Yields No Results`)
      }
      throw new Error(response.statusText);
    })
    .then(responseJson =>displayResults(responseJson.data))
    .catch(err => {

      $('#js-error-message').text(`Something went wrong: ${err.message}`);

    });
}

function displayResults(dataArr) {
    const $results = $('#search-results')
    $results.empty()
    dataArr.forEach(item => {
        $results.append(`<ul>
        <li>${item.name}</li>
        <li>${item.url}</li>
        <li> ${item.description}</li> `)
    })
    //tried to figure out how to return if no data returned - not working...
       /* if(item.name === undefined || item.name.length === 0){
      return $('#js-error-message').text(`Search Yields No Results`)
        }*/
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const searchState = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val();
    getParksURL(searchTerm, searchState, maxResults);
  });
}

$(watchForm);