import React from 'react';
import { BGScroll, Card, ListItem } from '../component/View';
import Dialogs from 'react-native-native-dialogs';

const companies = ['Apple', 'Google', 'Facebook'];

const RNDialogs = () => {
  const [selectedItem, setSelectedItem] = React.useState<number>();
  const [promptText, setPromptText] = React.useState('default string');
  return (
    <BGScroll>
      <Card round>
        <ListItem
          title="ActionSheet"
          onPress={() => {
            Dialogs.showActionSheet({
              title: 'Choose a company',
              options: companies,
              textAlign: 'left',
              selectedIndex: selectedItem,
            })
              .then(setSelectedItem)
              .catch(() => {});
          }}
          rightTitle={companies[selectedItem ?? -1]}
        />
        <ListItem
          title="Prompt"
          rightTitle={promptText}
          onPress={() => {
            Dialogs.showPrompt({
              message: 'It is useless, trust me. :)',
              title: 'Your Name?',
              placeholder: 'Say something',
              defaultValue: promptText,
            })
              .then(setPromptText)
              .catch(() => {});
          }}
        />
      </Card>
    </BGScroll>
  );
};

export default RNDialogs;
