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
          rightTitle={`${width}pt`}
          rightSubtitle={`${width * scale}px`}
        />
        <Divider />
        <ListItem
          title={'height'}
          rightTitle={`${height}pt`}
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
