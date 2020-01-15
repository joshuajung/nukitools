import axios from "axios"
import * as prompts from "prompts"

async function run() {
  const apiKey = process.env.API_KEY
  const axiosOptions = {
    headers: { Authorization: `Bearer: ${apiKey}` }
  }

  // Get list of users
  const users = (await axios.get("https://api.nuki.io/account/user", {
    headers: { Authorization: `Bearer: ${apiKey}` }
  })).data
  console.log(`✅  Received ${users.length} users.`)

  // Get list of authorizations
  const authorizations: any[] = (await axios.get("https://api.nuki.io/smartlock/auth", axiosOptions)).data
  console.log(`✅  Received ${authorizations.length} authorizations.`)

  // Get authorizations to work on (accountUserId === undefined)
  const unassignedAuthorizations = authorizations.filter(a => a.accountUserId === undefined)
  console.log("")
  console.log(`⚠️  ${unassignedAuthorizations.length} authorizations are orphaned.`)

  // Work through authorizations and merge them
  for (const subject of unassignedAuthorizations) {
    console.log("")
    console.log("▶️  Starting to work on authorization.")
    const name = subject.name
    console.log(`Name of authorization is "${name}".`)
    // We're skipping authorizations called "Nuki Web", as merging these can result in unintended consequences.
    if (["Nuki Web"].find(e => e === name) !== undefined) { 
      console.log(`⚠️  Will not touch an authorization with this name! Skipping.`)
      continue
    }
    const applicableUsers = users.filter(u => u.name === name)
    const numberOfApplicableUsers = applicableUsers.length
    console.log(`Found ${numberOfApplicableUsers} user(s) with this name.`)
    if (numberOfApplicableUsers === 1) {
      const url = `https://api.nuki.io/smartlock/${subject.smartlockId}/auth/${subject.id}`
      const body = {"accountUserId": applicableUsers[0].accountUserId}
      console.log(`Would now start a POST request:`)
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
          const result = await axios.post(url, body, axiosOptions)
          console.log(`✅  Request completed, code ${result.status}.`)
        } catch(e) {
          console.log(`⭕️  An error occured: ${e}.`)
        }
      } else {
        console.log("Okay, skipping.")
      }
    } else {
      console.error(`⚠️  Cannot work with this number of applicable users, not modifying this authorization.`)
    }
  }

  console.log("")
  console.log("🏁  Complete!")
}

run()
