import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  formStyles,
  inputOptions,
  inputStyling,
} from "../Styles/styles";
import { Button, TextInput } from "react-native-paper";
import Footer from "../Components/Footer";

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const submitHandler = () => {
    alert("Yeah");
  };
  const loading = false;

  return (
    <>
      <View style={defaultStyle}>
        <View style={{ marginBottom: 20, marginTop: 30 }}>
          <Text style={formHeading}>Login</Text>
        </View>
        <View style={formStyles.container}>
          <TextInput
            {...inputOptions}
            placeholder="Old Password"
            secureTextEntry={true}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            {...inputOptions}
            placeholder="New Password"
            secureTextEntry={true}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Button
            loading={loading}
            textColor={colors.color2}       
            disabled={oldPassword === "" || newPassword == ""}
            style={formStyles.btn}
            onPress={submitHandler}
          >
            Change Password
          </Button>
        </View>
      </View>
      <Footer activeRoute="profile" />
    </>
  );
};

export default ChangePassword;
