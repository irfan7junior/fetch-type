import Axios from 'axios'

type IData = any

interface IDataFetcher {
  url: string
  params: Object
  data: IData
  fetchData: () => void
  getJSON: () => string
}

class DataFetcher implements IDataFetcher {
  public data: IData

  constructor(public url: string, public params: Object = {}) {
    this.data = null
  }

  fetchData = async () => {
    try {
      const response = await Axios.get(this.url, this.params)
      this.data = response.data
    } catch (error) {
      throw new Error('Unable to fetch data')
    }
  }

  getJSON = () => {
    return JSON.stringify(this.data)
  }
}

export default DataFetcher
