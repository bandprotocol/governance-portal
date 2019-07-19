import { put } from 'redux-saga/effects'
import { LOAD_HOLDERS, addHolders, addNumHolders } from 'actions'
import { Utils } from 'band.js'
import BN from 'bn.js'
import { takeEveryAsync } from 'utils/reduxSaga'

function* handleLoadHolders({ address, currentPage, pageSize }) {
  if (!address) return

  const {
    communityByAddress: {
      tokenByCommunityAddress: {
        address: tokenAddress,
        balancesByTokenAddress: { nodes: holders, totalCount },
      },
    },
  } = yield Utils.graphqlRequest(
    `
    {
      communityByAddress(address: "${address}") {
        tokenByCommunityAddress {
          address
          balancesByTokenAddress(orderBy: VALUE_DESC, first: 10, offset: ${(currentPage -
            1) *
            pageSize}) {
            totalCount
            nodes {
              user
              value
            }
          }
        }
      }
    }
    `,
  )

  yield put(
    addHolders(
      address,
      currentPage,
      holders
        .map(holder => ({
          tokenAddress,
          address: holder.user,
          balance: new BN(holder.value),
        }))
        .filter(holder => holder.balance.gt(new BN(0))),
    ),
  )

  yield put(addNumHolders(address, totalCount))
}

export default function*() {
  yield takeEveryAsync(LOAD_HOLDERS, handleLoadHolders)
}
