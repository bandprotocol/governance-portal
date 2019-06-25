import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HistoryBodyRender from './HistoryBodyRender'
import { orderHistorySelector } from 'selectors/order'

const mapStateToProps = (state, { communityAddress, currentPage }) => {
  const items = orderHistorySelector(state, {
    address: communityAddress,
    page: currentPage,
  }).toJS()
  // while (items.length < 10) {
  //   items.push(null)
  // }
  return { items }
}

export default withRouter(connect(mapStateToProps)(HistoryBodyRender))
