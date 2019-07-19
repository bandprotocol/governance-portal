import { createSelector } from 'reselect'
import { List } from 'immutable'
import {
  holderSelector,
  addressSelector,
  pageSelector,
  pageSizeSelector,
} from 'selectors/basic'

export const holdersSelector = createSelector(
  [holderSelector, addressSelector, pageSelector, pageSizeSelector],
  (holders, address, page, pageSize) => {
    if (!holders.get(address)) return List()
    return holders.getIn([address, page]).map((holder, i) => ({
      rank: (page - 1) * pageSize + i + 1,
      ...holder,
    }))
  },
)

export const numHolders = createSelector(
  [holderSelector, addressSelector],
  (holders, address) => {
    if (!holders.get(address)) return 0
    return holders.getIn([address, 'count'])
  },
)
