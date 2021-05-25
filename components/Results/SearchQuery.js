// const backendUrl = "http://35.195.155.47:80/"
const backendUrl = "http://localhost:80/"


function search(searchQuery, pagination, setSearchResults) {
  if (searchQuery.startsWith("http://") || searchQuery.startsWith("https://")) {
    const requestBody = {url: searchQuery}
    searchImages("search_url", requestBody, pagination, setSearchResults)
  } else {
    const requestBody = {query: searchQuery}
    searchImages("search", requestBody, pagination, setSearchResults)
  }
}

function searchImages(endpoint, requestBody, pagination, setSearchResults) {
  requestBody.page_size = pagination.pageSize
  requestBody.page_number = pagination.pageNumber
  fetch(backendUrl + endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => {
      const searchResults = []
      if (json && json.images) {
        json.images.forEach(imageObject => {
          searchResults.push(imageObject)
        })
      }
      let reason = json.reason ? json.reason : null
      setSearchResults(searchResults, reason)
    });
}

export default search

