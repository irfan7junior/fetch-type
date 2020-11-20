#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

import { createCommand } from 'commander'
import clipboardy from 'clipboardy'

import ConsoleReaderWriter from './ConsoleReaderWriter'
import DataFetcher from './DataFetcher'
import { main } from './Quicktype'
import { exit } from 'process'

const program = createCommand()

program.version('0.0.1', '-v, --version', 'output the current version')

program.option('-f, --folder <location>', 'specify folder name', '@interfaces')
program.option('-n, --filename <name>', 'specify file name', 'IResult.ts')
program.option('-u, --url <url>', 'specify the url', undefined)
program.option('-c, --config <path>', 'specify json location', undefined)
program.option('-k --clip', 'copy to clipboard', false)

program.parse(process.argv)

let filename: string = program.filename
let folder: string = path.resolve(process.cwd(), program.folder)

let params: Object = {}
let url: string = ''

if (!program.url && !program.config) {
  url = 'https://jsonplaceholder.typicode.com/users'
}

if (program.config) {
  const filepath = path.resolve(process.cwd(), program.config)
  let data: { [key: string]: Object | string }
  let jsonData: string
  try {
    jsonData = fs.readFileSync(filepath, { encoding: 'utf8' })
  } catch (error) {
    console.log('Wrong config path provided')
    exit(1)
  }
  try {
    data = JSON.parse(jsonData)
  } catch (error) {
    console.log('File doesnot contain json data')
    exit(1)
  }
  url = data.url as string
  params = data.params as Object
  if (data.filename) filename = data.filename as string
  if (data.folder) folder = path.resolve(process.cwd(), data.folder as string)
  if (data.clip) program.clip = true
}

if (program.url) {
  url = program.url
}

const filePath: string = path.resolve(folder, filename)

const run = async () => {
  const df = new DataFetcher(url, params)
  await df.fetchData()
  const crw = new ConsoleReaderWriter(filePath)
  const answer = await main(filename, df.getJSON())
  crw.writeData(answer)

  // copy to clipboard or write a file
  if (program.clip) {
    clipboardy.writeSync(df.getJSON())
  } else {
    const dataFileName = filename.split('.')[0] + '.json'
    const dataFilePath = path.resolve(folder, dataFileName)
    fs.writeFileSync(dataFilePath, df.getJSON(), { encoding: 'utf8' })
  }
}

run()
