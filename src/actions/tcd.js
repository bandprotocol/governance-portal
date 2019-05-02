export const LOAD_TCDS = 'LOAD_TCDS'
export const ADD_TCDS = 'ADD_TCDS'

export const loadTcds = (user, commAddress) => {
  return {
    type: LOAD_TCDS,
    user,
    commAddress,
  }
}

export const addTcds = (commAddress, tcds) => ({
  type: ADD_TCDS,
  commAddress,
  tcds,
})