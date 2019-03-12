import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { communityDetailSelector } from 'selectors/communities'

import CommunityDesciption from 'components/CommunityDescription/CommunityDescriptionRender'

const mapStateToProps = (state, { communityAddress }) => {
  const community = communityDetailSelector(state, {
    address: communityAddress,
  })
  if (!community) return {}
  return {
    name: community.get('name'),
    address: community.get('address'),
    src: community.get('logo'),
    link: community.get('website'),
    author: community.get('author'),
    description: community.get('description'),
  }
}

export default withRouter(connect(mapStateToProps)(CommunityDesciption))