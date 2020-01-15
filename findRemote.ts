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

  // Just as an additional service: Provide list of users with remote-locking permissions
  const remoteAuthorizations = authorizations.filter(a => a.remoteAllowed)
  const remoteableUsers = remoteAuthorizations.reduce((ttl: string[], curr) => {
    if(ttl.find(i => i === curr.name) === undefined) {
      ttl.push(curr.name)
    } 
    return ttl
  }, [])
  console.log("")
  console.log("⚠️  These users have remote unlocking permissions:")
  remoteableUsers.forEach(u => {
    console.log(u)
  })

  console.log("")
  console.log("🏁  Complete!")

}

run()
