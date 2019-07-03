import React from 'react'
import TransferHistoryRender from './TransferHistoryRender'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadTransferHistory } from 'actions'
import { numTransferSelector } from 'selectors/transfer'
import { dispatchAsync } from 'utils/reduxSaga'

class TransferHistory extends React.Component {
  state = {
    currentPage: 1,
    fetching: true,
  }

  async componentDidMount() {
    await this.loadTransferHistory()

    this.checker = setInterval(() => {
      this.props.loadTransferHistoryOnPage(this.state.currentPage)
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.checker)
  }

  async loadTransferHistory() {
    await this.props.loadTransferHistoryOnPage(this.state.currentPage)
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
        await this.loadTransferHistory()
      },
    )
  }

  render() {
    return (
      <TransferHistoryRender
        {...this.props}
        {...this.state}
        onChangePage={this.onChangePage.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state, { communityAddress }) => {
  return {
    numTransfers: numTransferSelector(state, {
      address: communityAddress,
    }),
  }
}

const mapDispatchToProps = (dispatch, { communityAddress, pageSize }) => ({
  loadTransferHistoryOnPage: currentPage =>
    dispatchAsync(
      dispatch,
      loadTransferHistory(communityAddress, currentPage, pageSize),
    ),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TransferHistory),
)
