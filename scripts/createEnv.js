const fs = require('fs')

const createEnv = () => {
  const content = `
NODE_ENV=${process.env.NODE_ENV || 'production'}
NEXT_PUBLIC_SERVER_URL=${process.env.NEXT_PUBLIC_SERVER_URL}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  }
NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN=${
    process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN
  }
  INTERNAL_LOAD_BALANCER_ENDPOINT=${process.env.INTERNAL_LOAD_BALANCER_ENDPOINT}
  `
  fs.writeFile('.env.local', content, function (err) {
    if (err) {
      return console.error(err)
    }
  })
}
createEnv()
