import axios from "axios"
import * as prompts from "prompts"

import * as users from "./users.json"

async function run() {
  const apiKey = process.env.API_KEY
  const axiosOptions = {
    headers: { Authorization: `Bearer: ${apiKey}` }
  }

  // Get list of existingUSers
  const existingUsers = (await axios.get("https://api.nuki.io/account/user", {
    headers: { Authorization: `Bearer: ${apiKey}` }
  })).data
  console.log(`✅  Received ${existingUsers.length} users.`)

  console.log(`✅  Found ${users.length} users to import.`)

  for (const user of users) {
    console.log('')
    console.log(`▶️  Now importing user ${user.fullName} (${user.email})`)

    if (existingUsers.find(eu => eu.email === user.email) !== undefined) {
      console.log(`⚠️  A user with this email already exists in Nuki Web. Skipping.`)
      continue
    }
    if (existingUsers.find(eu => eu.name === user.fullName) !== undefined) {
      console.log(`⚠️  A user with this name already exists in Nuki Web. Skipping.`)
      continue
    }

    const body = {"name": user.fullName, "email": user.email, "language": "en"}
    const url = "https://api.nuki.io/account/user"

    console.log(`Would now start a PUT request:`)
      console.log(url)
      console.log(JSON.stringify(body))
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
          const result = await axios.put(url, body, axiosOptions)
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
