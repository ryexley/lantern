export function beginFetchCollectionList() {
  return {
    type: "bible:passageCollectionList:fetchBegin"
  }
}

export function setCollectionList(collections) {
  return {
    type: "bible:passageCollectionList:fetchSuccess",
    collections
  }
}

export function fetchCollectionListFailed(error) {
  return {
    type: "bible:passageCollectionList:fetchFailed",
    error
  }
}

export function beginFetchCollection() {
  return {
    type: "bible:passageCollection:fetchBegin"
  }
}

export function setCollection(collection) {
  return {
    type: "bible:passageCollection:fetchSuccess",
    collection
  }
}

export function fetchCollectionFailed(error) {
  return {
    type: "bible:passageCollection:fetchFailed",
    error
  }
}
