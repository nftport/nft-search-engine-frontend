const backendUrl = "https://api.nftport.xyz/"

const AuthToken = process.env.API_KEY

function search(searchQuery, searchType, pagination, setSearchResults, extraFilters) {
  if (searchType === "text") {
    getSearch(
      "v0/search",
      searchQuery,
      pagination,
      setSearchResults
    )
  } else if (searchType === "reverse") {
    const requestBody = {url: searchQuery.trim()}
    postSearch("v0/recommendations/similar_nfts/urls", requestBody, pagination)
      .then(response => {
        const {searchResults, error} = mapRecommendationResults(response);
        setSearchResults(searchResults, error);
      })
  }
  if (searchType === "counterfeit") {
    if (searchQuery.startsWith("http://") || searchQuery.startsWith("https://")) {
      const requestBody = {url: searchQuery.trim(), limit: pagination.pageSize}
      if (extraFilters) {
        requestBody.filter_out_contract_address = extraFilters.filterAddress
      }
      postSearch("v0/duplicates/urls", requestBody, pagination)
        .then(response => {
          const {searchResults, error} = mapDuplicateResults(response);
          setSearchResults(searchResults, error);
        })
    }
  }
}


function searchCounterfeit(address, tokenId, chain, filterAddress, pagination, setSearchResults) {
  const requestBody = {
    "chain": chain,
    "contract_address": address,
    "token_id": tokenId,
    "filter_out_contract_address": filterAddress,
    "limit": pagination.pageSize
  }
  postSearch("v0/duplicates/tokens", requestBody, pagination)
    .then(response => {
      const {searchResults, error} = mapDuplicateResults(response);
      setSearchResults(searchResults, error);
    })
}

function searchFile(file, searchType, pagination, setSearchResults, extraFilters) {
  if (searchType === "counterfeit") {
    postFileSearch(file, pagination, "v0/duplicates/files", extraFilters)
      .then(response => {
        const {searchResults, error} = mapDuplicateResults(response);
        setSearchResults(searchResults, error)
      })
  } else if (searchType === "reverse") {
    postFileSearch(file, pagination, "v0/recommendations/similar_nfts/files")
      .then(response => {
        const {searchResults, error} = mapRecommendationResults(response);
        setSearchResults(searchResults, error)
      })
  }
}

function postFileSearch(file, pagination, endpoint, extraFilters) {
  const queryParams = {
    page_size: pagination.pageSize,
    page_number: pagination.pageNumber,
    limit: pagination.pageSize,
  }
  if (extraFilters && extraFilters.filterAddress) {
    queryParams.filter_out_contract_address = extraFilters.filterAddress
  }
  const formData = new FormData();
  formData.append("file", file);
  const url = backendUrl + endpoint + "?" + new URLSearchParams(queryParams)
  return fetch(url,
    {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": AuthToken
      }
    })
    .then(response => response.json())
    .then(json => {
      return json
    })
    .catch(response => {
      return null
    });
}

function postSearch(endpoint, requestBody, pagination) {
  requestBody.page_size = pagination.pageSize
  requestBody.page_number = pagination.pageNumber
  return fetch(backendUrl + endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Authorization": AuthToken,
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => {
      return json
    })
    .catch(response => {
      return null
    });
}

function getSearch(endpoint, searchQuery, pagination, setSearchResults) {
  const endpointWithParams = `${endpoint}?text=${searchQuery}&page_number=${pagination.pageNumber}&page_size=${pagination.pageSize}`
  fetch(backendUrl + endpointWithParams, {
    method: "GET",
    headers: {
      "Authorization": AuthToken,
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => {
      const searchResults = []
      if (json && json.search_results) {
        json.search_results.forEach(nft => {
          searchResults.push({
            "chain": nft.chain,
            "contract_address": nft.contract_address,
            "token_id": nft.token_id,
            "image_url": nft.cached_file_url,
            "external_url": nft.external_url,
            "raw_metadata": nft.metadata
          })
        })
      }
      let error = json.error ? json.error : null
      if (error === "No results found") {
        error = "NO_RESULTS_FOUND"
      }
      setSearchResults(searchResults, error)
    })
    .catch(response => {
      setSearchResults([], "SERVER_ERROR")
    });
}

function mapDuplicateResults(json) {
  const searchResults = []
  if (json && json.similar_nfts) {
    json.similar_nfts.forEach(nft => {
      searchResults.push({
        "chain": nft.chain,
        "contract_address": nft.contract_address,
        "token_id": nft.token_id,
        "image_url": (nft.cached_file_url ? nft.cached_file_url : nft.file_url),
        // "external_url": "https://rarible.com/token/0x60f80121c31a0d46b5279700f9df786054aa5ee5:801565",
        "raw_metadata": nft.metadata
      })
    })
  }
  let error = json && json.error ? json.error || "SERVER_ERROR" : null
  if (error === "File download failed") {
    error = "DOWNLOAD_FAILED"
  } else if (!error && !searchResults.length) {
    error = "NO_RESULTS_FOUND"
  }
  return {searchResults, error};
}

function mapRecommendationResults(json) {
  const searchResults = []
  if (json && json.nfts) {
    json.nfts.forEach(nft => {
      searchResults.push({
        "chain": nft.chain,
        "contract_address": nft.contract_address,
        "token_id": nft.token_id,
        "image_url": nft.cached_file_url,
        // "external_url": "https://rarible.com/token/0x60f80121c31a0d46b5279700f9df786054aa5ee5:801565",
        "raw_metadata": nft.metadata
      })
    })
  }
  let error = json && json.error ? json.error || "SERVER_ERROR" : null
  if (json && json.error && json.error.code === "invalid_url") {
    error = "INVALID_URL"
  }
  return {searchResults, error};
}


const searchQueries = {
  search: search,
  searchCounterfeit: searchCounterfeit,
  searchFile: searchFile
}

export default searchQueries
