import * as React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";

const ListTest = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View>
      <List.Section style={{ right: 300 }}>
        <List.Accordion
          left={(props) => <List.Icon {...props} icon="folder" />}
          expanded={expanded}
          onPress={handlePress}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
    </View>
  );
};

export default ListTest;
