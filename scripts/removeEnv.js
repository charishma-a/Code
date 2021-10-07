const fs = require('fs')

const removeEnv = () => {
  try {
    fs.unlinkSync('.env.local')
    //file removed
  } catch (err) {
    console.error(err)
  }
}
removeEnv()
