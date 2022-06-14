import React, { FC, useCallback } from 'react';

import {
  Box,
  Divider,
  FlatList,
  Pressable,
  Text,
  TokenGroup,
} from '@onekeyhq/components';

import { ListProps } from '../../type';

const CryptosList: FC<ListProps> = ({ datas }) => {
  const renderItem = useCallback(
    () => (
      <Pressable
        width="full"
        height="76px"
        paddingX="16px"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TokenGroup
          size="lg"
          tokens={[{ chain: 'eth' }]}
          cornerToken={{ chain: 'eth' }}
        />
        <Text ml="12px" typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}>
          ETH
        </Text>

        <Box flexDirection="column" alignItems="flex-end" flex={1}>
          <Text typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}>
            562.61 USDT
          </Text>
          <Text typography="Body2" color="text-subdued">
            $6562.61
          </Text>
        </Box>
      </Pressable>
    ),
    [],
  );

  return (
    <Box width="100%" borderRadius="12px" bgColor="surface-default">
      <FlatList
        data={datas}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
      />
    </Box>
  );
};

export default CryptosList;
