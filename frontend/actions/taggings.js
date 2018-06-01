export const RECEIVE_TAGGING = 'RECEIVE TAGGING'

export const receiveTagging = tagging => {
  return {
    type: RECEIVE_TAGGING,
    tagging
  }
}
