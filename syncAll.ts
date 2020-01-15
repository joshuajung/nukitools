import axios from "axios"
import * as prompts from "prompts"

async function run() {
  const apiKey = process.env.API_KEY
  const axiosOptions = {
    headers: { Authorization: `Bearer: ${apiKey}` }
  }

  // Get list of locks
  const locks = (await axios.get("https://api.nuki.io/smartlock", {
    headers: { Authorization: `Bearer: ${apiKey}` }
  })).data
  console.log(`✅  Received ${locks.length} locks.`)
  
  // Work through authorizations and merge them
  for (const lock of locks) {
    console.log("")
    console.log(`▶️  Starting to work on lock ${lock.name}.`)
    console.log(`Lock serverState is ${lock.serverState}.`)
    const url = `https://api.nuki.io/smartlock/${lock.smartlockId}/sync`
    console.log(`Would now start a POST request:`)
    console.log(url)
    const promptResponse = await prompts({
      type: 'confirm',
      name: 'confirmed',
      message: 'Can you confirm?',
      initial: false
    })
    if (promptResponse.confirmed === undefined) {
      console.log("Stopping execution.")
      process.exit()
    } else if (promptResponse.confirmed) {
      console.log("⏳  Executing request.")
      try {
        const result = await axios.post(url, undefined, axiosOptions)
        console.log(`✅  Request completed, code ${result.status}.`)
      } catch(e) {
        console.log(`⭕️  An error occured: ${e}.`)
      }
    } else {
      console.log("Okay, skipping.")
    }
  }

  console.log("")
  console.log("🏁  Complete!")
}

run()
