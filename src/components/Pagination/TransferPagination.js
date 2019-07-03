import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { numTransferSelector } from 'selectors/transfer'

import PaginationRender from './PaginationRender'

const mapStateToProps = (state, { communityAddress, pageSize }) => ({
  numberOfPages: Math.ceil(
    numTransferSelector(state, {
      address: communityAddress,
    }) / pageSize,
  ),
})

export default withRouter(connect(mapStateToProps)(PaginationRender))
