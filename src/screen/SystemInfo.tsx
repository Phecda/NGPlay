import React from 'react';
import { useWindowDimensions } from 'react-native';
import { ListItem, BGScroll, Card, Divider } from '../component/View';

export default () => {
  const { width, height, fontScale, scale } = useWindowDimensions();
  return (
    <BGScroll white>
      <Card shadow>
        <ListItem
          title={'width'}
          rightTitle={`${Number.isInteger(width) ? width : width.toFixed(2)}pt`}
          rightSubtitle={`${width * scale}px`}
        />
        <Divider />
        <ListItem
          title={'height'}
          rightTitle={`${
            Number.isInteger(height) ? height : height.toFixed(2)
          }pt`}
          rightSubtitle={`${height * scale}px`}
        />
        <Divider />
        <ListItem title={'fontScale'} rightTitle={fontScale.toString()} />
        <Divider />
        <ListItem title={'scale'} rightTitle={scale.toString()} />
      </Card>
    </BGScroll>
  );
};
