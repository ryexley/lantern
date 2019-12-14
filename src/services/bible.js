export class BibleService {
  constructor({ axios, env }) {
    this.http = axios.create({ baseURL: `${env.API_URL}/bible` })
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

  async getCollection(slug) {
    try {
      const results = await this.http.get(`/collection/${slug}/references`)

      return results.data
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async getPassage(reference) {
    try {
      const results = await this.http.get(`/${reference}`)

      const {
        canonical: referenceDisplayText,
        passages: passageText
      } = results.data

      return {
        referenceDisplayText,
        passageText
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
