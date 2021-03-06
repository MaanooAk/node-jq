import exec from './exec'
import { commandFactory } from './command'

export const run = (filter, json, options = {}) => {
  return new Promise((resolve, reject) => {
    const command = commandFactory(filter, json, options)
    exec(command)
      .then((stdout) => {
        if (options.output === 'json') {
          let result
          try {
            result = JSON.parse(stdout)
          } catch (error) {
            result = stdout
          }
          return resolve(result)
        } else {
          return resolve(stdout)
        }
      })
      .catch(reject)
  })
}
