export class BibleService {
  constructor({ axios }) {
    this.http = axios.create()
  }
}
