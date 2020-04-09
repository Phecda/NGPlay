import React from 'react';
import { useWindowDimensions } from 'react-native';
import { ListItem, BGScroll, Card } from '../component/View';

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
        <ListItem
          title={'height'}
          rightTitle={`${height}pt`}
          rightSubtitle={`${height * scale}px`}
        />
        <ListItem title={'fontScale'} rightTitle={fontScale.toString()} />
        <ListItem title={'scale'} rightTitle={scale.toString()} />
      </Card>
    </BGScroll>
  );
};
