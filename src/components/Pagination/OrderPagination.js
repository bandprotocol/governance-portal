import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { numOrderSelector } from 'selectors/order'

import PaginationRender from './PaginationRender'

const mapStateToProps = (state, { communityAddress, pageSize }) => ({
  numberOfPages: Math.ceil(
    numOrderSelector(state, {
      address: communityAddress,
    }) / pageSize,
  ),
})

export default withRouter(connect(mapStateToProps)(PaginationRender))
