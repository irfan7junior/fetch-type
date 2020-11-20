import fs from 'fs'
import path from 'path'

interface IConsoleReaderWriter {
  writeData: (data: string) => void
  readData: () => string
}

export default class ConsoleReaderWriter implements IConsoleReaderWriter {
  constructor(private file: string) {
    const folderName = path.dirname(this.file)
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true })
    }
    if (!fs.existsSync(this.file)) fs.writeFileSync(this.file, '')
  }

  writeData = (data: string): void => {
    fs.writeFileSync(this.file, data)
  }

  readData = (): string => {
    return fs.readFileSync(this.file, { encoding: 'utf8' })
  }
}
