import React from 'react'

import TransferHistoryRender from './TransferHistoryRender'

import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { loadTransferHistory } from 'actions'

class TransferHistory extends React.Component {
  state = {
    selectedOption: { value: 'all', label: 'All Orders' },
    currentPage: 1,
  }

  componentDidMount() {
    this.props.loadTransferHistory(this.state.selectedOption.value === 'all')
  }

  componentDidUpdate(_, prevState) {
    if (prevState.selectedOption.value !== this.state.selectedOption.value) {
      this.props.loadTransferHistory(this.state.selectedOption.value === 'all')
    }
  }

  onChange(selectedOption) {
    if (selectedOption.value !== this.state.selectedOption.value)
      this.setState({ selectedOption, currentPage: 1 })
    else this.setState({ selectedOption })
  }

  onChangePage(selectedPage) {
    this.setState({
      currentPage: selectedPage,
    })
  }

  render() {
    const options = [
      { value: 'all', label: 'All Orders' },
      { value: 'mine', label: 'My Orders' },
    ]
    const { selectedOption, currentPage } = this.state
    const { communityAddress, pageSize } = this.props
    return (
      <TransferHistoryRender
        options={options}
        selectedOption={selectedOption}
        onChange={this.onChange.bind(this)}
        communityAddress={communityAddress}
        currentPage={currentPage}
        onChangePage={this.onChangePage.bind(this)}
        pageSize={pageSize}
      />
    )
  }
}

const mapDispatchToProps = (dispatch, { communityAddress }) => ({
  loadTransferHistory: isAll =>
    dispatch(loadTransferHistory(communityAddress, isAll)),
})
export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(TransferHistory),
)