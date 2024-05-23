import * as core from '@actions/core'
import { setup } from './setup-terragrunt'
;(async () => {
  try {
    await setup()
  } catch (error: any) {
    core.setFailed(error.message)
  }
})()
