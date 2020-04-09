import { TextInput } from "react-native";
import React from "react";

export default class AutoExpandingTextInput extends React.Component {

    constructor(props) {
      super(props);
      this.state = {text: '', height: 0};
    }
    render() {
      return (
        <TextInput
          {...this.props}
          multiline={true}
          onChangeText={(text) => {
              this.setState({ text })
          }}
          onContentSizeChange={(event) => {
              this.setState({ height: event.nativeEvent.contentSize.height })
          }}
          style={[styles.default, {height: Math.max(35, this.state.height)}]}
          value={this.state.text}
        />
      );
    }
  }