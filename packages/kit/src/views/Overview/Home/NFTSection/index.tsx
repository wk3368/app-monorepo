import React, { FC, useState } from 'react';

import ContentLoader from 'react-content-loader/native';
import { useIntl } from 'react-intl';
import { Rect } from 'react-native-svg';

import {
  Box,
  IconButton,
  Text,
  useIsVerticalLayout,
  useThemeValue,
} from '@onekeyhq/components';
import { useOverview } from '@onekeyhq/kit/src/hooks';

import NFTList from './NFTList';

const LoadingView = () => {
  const isSmallScreen = useIsVerticalLayout();

  return (
    <Box borderRadius="12px" height="160px" overflow="hidden">
      <ContentLoader
        speed={1}
        width={isSmallScreen ? undefined : 'full'}
        height={isSmallScreen ? undefined : 'full'}
        backgroundColor={useThemeValue('surface-neutral-default')}
        foregroundColor={useThemeValue('surface-default')}
      >
        <Rect x="0" y="0" width="100%" height="100%" />
      </ContentLoader>
    </Box>
  );
};

const NFTSection: FC = () => {
  const intl = useIntl();
  const [expand, setExpand] = useState(false);
  const { loading } = useOverview();

  return (
    <Box mb="24px">
      <Box mb="12px" flexDirection="row" justifyContent="space-between">
        <Text typography="Heading">
          {intl.formatMessage({ id: 'asset__collectibles' })}
        </Text>
        {!loading && (
          <IconButton
            onPress={() => {
              setExpand((prev) => !prev);
            }}
            name={expand ? 'ShrinkOutline' : 'ExpandOutline'}
            type="plain"
            size="sm"
          />
        )}
      </Box>
      {loading ? (
        <LoadingView />
      ) : (
        <Box>
          <NFTList expand={expand} />
        </Box>
      )}
    </Box>
  );
};

export default NFTSection;
