import axios from "axios"

export class BibleService {
  constructor() {
    this.http = axios.create({
      baseURL: `${process.env.GATSBY_API_URL}/bible`
    })
  }

  async getCollections() {
    try {
      const results = await this.http.get("/collections")

      return results.data
    } catch (error) {
      console.error(error)
      return []
    }
  }
}
