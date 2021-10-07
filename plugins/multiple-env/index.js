const { Octokit } = require('@octokit/core')

module.exports = {
  onPreBuild: async ({ netlifyConfig, utils }) => {
    let targetBranch = process.env.HEAD
    if (targetBranch === 'production') {
      console.log('head branch is production, no environment variables changed') // eslint-disable-line
      return
    }

    const context = process.env.CONTEXT

    // change target branch if deploy preview
    if (context === 'deploy-preview') {
      try {
        const { GITHUB_ACCESS_TOKEN, REVIEW_ID } =
          netlifyConfig.build.environment

        const octokit = new Octokit({
          auth: GITHUB_ACCESS_TOKEN,
        })
        const response = await octokit.request(
          'GET /repos/{owner}/{repo}/pulls/{pull_number}',
          {
            owner: 'Kernls',
            repo: 'nextjs-kernls',
            pull_number: REVIEW_ID,
          }
        )

        if (response.data) {
          targetBranch = response.data.base.ref
        }
      } catch (error) {
        utils.build.failBuild('Failure message', { error })
      }
    }

    const devPrefix = 'DEVELOP_'
    const stagingPrefix = 'STAGING_'

    let targetPrefix = 'production'

    if (targetBranch === 'develop') {
      targetPrefix = devPrefix
    } else if (targetBranch === 'staging') {
      targetPrefix = stagingPrefix
    }

    if (targetPrefix === 'production') {
      // eslint-disable-next-line
      console.log(
        'preview branch is production, no environment variables changed'
      )
      return
    }

    Object.keys(process.env).forEach((key) => {
      const isTargetEnvVar = key.includes(targetPrefix)

      if (isTargetEnvVar) {
        return
      }

      const targetedPrefixedEnvVar = targetPrefix + key

      const valueForUserPrefixedEnvVar = process.env[targetedPrefixedEnvVar]

      if (valueForUserPrefixedEnvVar) {
        const summary = `Replacing default var ${key} with prefixed var ${targetedPrefixedEnvVar}.`
        console.log(summary) // eslint-disable-line
        process.env[key] = valueForUserPrefixedEnvVar
      }
    })
  },
}
