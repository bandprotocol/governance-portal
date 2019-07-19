import React from 'react'
import RichlistRender from './RichlistRender'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { numHolders } from 'selectors/holder'
import { loadHolders } from 'actions'
import { dispatchAsync } from 'utils/reduxSaga'

class Richlist extends React.Component {
  state = {
    currentPage: 1,
    fetching: true,
  }

  async componentDidMount() {
    await this.loadHolders()

    this.checker = setInterval(() => {
      this.props.loadHoldersOnPage(this.state.currentPage)
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.checker)
  }

  async loadHolders() {
    await this.props.loadHoldersOnPage(this.state.currentPage)
    this.setState({
      fetching: false,
    })
  }

  onChangePage(selectedPage) {
    this.setState(
      {
        currentPage: selectedPage,
        fetching: true,
      },
      async () => {
        await this.loadHolders()
      },
    )
  }

  render() {
    return (
      <RichlistRender
        {...this.state}
        {...this.props}
        onChangePage={this.onChangePage.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state, { communityAddress }) => {
  return {
    numberOfHolders: numHolders(state, {
      address: communityAddress,
    }),
  }
}

const mapDispatchToProps = (dispatch, { communityAddress, pageSize }) => ({
  loadHoldersOnPage: currentPage =>
    dispatchAsync(
      dispatch,
      loadHolders(communityAddress, currentPage, pageSize),
    ),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Richlist),
)
