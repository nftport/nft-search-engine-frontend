const backendUrl = "http://34.120.251.101/"
// const backendUrl = "http://localhost:80/"


function search(searchQuery, pagination, setSearchResults) {
  if (searchQuery.startsWith("http://") || searchQuery.startsWith("https://")) {
    const requestBody = {url: searchQuery}
    searchImages("search_url", requestBody, pagination, setSearchResults)
  } else {
    const requestBody = {query: searchQuery}
    searchImages("search", requestBody, pagination, setSearchResults)
  }
}

function searchFile(file, pagination, setSearchResults) {
  const requestBody = {}
  requestBody.page_size = pagination.pageSize
  requestBody.page_number = pagination.pageNumber
  const formData = new FormData();
  formData.append("file", file);
  fetch(backendUrl + "search_file", {
    method: "POST",
    body: formData,
    headers: {
      // "Content-type": "application/json; charset=UTF-8"
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
    })
    .catch(response => {
      setSearchResults([], "SERVER_ERROR")
    });
}

const searchQueries = {
  search: search,
  searchFile: searchFile
}

export default searchQueries
