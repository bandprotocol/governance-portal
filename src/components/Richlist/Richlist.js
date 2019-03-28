import React from 'react'

import { OrderPagination } from 'components/Pagination'

import { Flex, Text, Box } from 'ui/common'

import { colors } from 'ui'

const RichlistHeader = () => (
  <Flex
    flexDirection="row"
    py={3}
    bg="#f5f7ff"
    style={{ minHeight: '60px' }}
    alignItems="center"
  >
    <Flex pl="30px" flex={1}>
      <Text color="#4a4a4a" fontSize="16px" fontWeight={500}>
        Rank
      </Text>
    </Flex>
    <Flex flex={1}>
      <Text color="#4a4a4a" fontSize="16px" fontWeight={500}>
        Address
      </Text>
    </Flex>
    <Flex flex={1}>
      <Text color="#4a4a4a" fontSize="16px" fontWeight={500}>
        Quantity
      </Text>
    </Flex>
    <Flex flex={1}>
      <Text color="#4a4a4a" fontSize="16px" fontWeight={500}>
        Percentage
      </Text>
    </Flex>
  </Flex>
)

export default ({
  options,
  selectedOption,
  onChange,
  communityAddress,
  currentPage,
  onChangePage,
  pageSize,
}) => (
  <Flex
    style={{ borderRadius: '10px' }}
    width={1}
    bg="white"
    flexDirection="column"
    pb={3}
  >
    <RichlistHeader />
    <OrderPagination
      communityAddress={communityAddress}
      //isAll={selectedOption.value === 'all'}
      pageSize={pageSize}
      currentPage={currentPage}
      onChangePage={onChangePage}
    />
  </Flex>
)