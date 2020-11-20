import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from 'quicktype-core'

async function quicktypeJSON(
  targetLanguage: string,
  typeName: string,
  jsonString: string
) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage)

  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  })

  const inputData = new InputData()
  inputData.addInput(jsonInput)

  return await quicktype({
    inputData,
    lang: targetLanguage,
    indentation: '  ',

    rendererOptions: {
      'just-types': 'true',
    },
  })
}

async function main(fileName: string, jsonString: string) {
  fileName = fileName.split('.')[0]
  const { lines: typescript } = await quicktypeJSON('ts', fileName, jsonString)

  const result = typescript.join('\n').split('export')
  const answer: string[] = []
  result.forEach((line, index) => {
    if (index == 0) return
    if (index == 1) return answer.push('export' + line)
    answer.push(line.substring(1))
  })

  return answer.join('\n')
}

export { main }
