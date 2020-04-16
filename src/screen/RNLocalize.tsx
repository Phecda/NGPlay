import React from 'react';
import * as LocalizeModule from 'react-native-localize';
import { BGList, ListItem } from '../component/View';

const keys = [
  'getCalendar',
  'getCountry',
  'getCurrencies',
  'getLocales',
  'getNumberFormatSettings',
  'getTemperatureUnit',
  'getTimeZone',
  'uses24HourClock',
  'usesMetricSystem',
  'usesAutoDateAndTime',
  'usesAutoTimeZone',
] as const;

const RNLocalize = () => {
  return (
    <BGList
      data={keys}
      renderItem={({ item }) => (
        <ListItem
          title={item}
          rightTitle={JSON.stringify(LocalizeModule[item]())}
        />
      )}
    />
  );
};

export default RNLocalize;
