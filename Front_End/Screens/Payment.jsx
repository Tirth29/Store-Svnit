import { View, Text } from "react-native";
import React, { useState } from "react";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import { defaultStyle } from "../Styles/styles";
import { StyleSheet } from "react-native";
import { colors } from "../Styles/styles";
import { RadioButton } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Button} from "react-native-paper";
const Payment = () => {
    const [paymentMethod,setPaymentMethod] = useState("COD");
    console.log(paymentMethod);
    const isAuthenticated = true;
    const redirectToLogin = () => {};
    const codHandler = () => {};
    const onlineHandler = () => {};
  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <Heading
        text1="Payment"
        text2="Method"
        containerStyle={{
          paddingTop: 70,
        }}
      />
      <View style={Styles.container}>
        <RadioButton.Group
          value={paymentMethod}
          onValueChange={setPaymentMethod}
        >
          <View style={Styles.radioStyle}>
            <Text style={Styles.radioStyleText}>Cash On delivery</Text>
            <RadioButton
              color={colors.color1}
              backgroundColor={colors.color2}
              value={"COD"}
            />
          </View>
          <View style={Styles.radioStyle}>
            <Text style={Styles.radioStyleText}>Online</Text>
            <RadioButton
              color={colors.color1}
              backgroundColor={colors.color2}
              value={"ONLINE"}
            />
          </View>
        </RadioButton.Group>
      </View>
      <TouchableOpacity
        // disabled={loading}
        onPress={
          !isAuthenticated
            ? redirectToLogin
            : paymentMethod === "COD"
            ? () => codHandler()
            : onlineHandler
        }
      >
        <Button
        //   loading={loading}
        //   disabled={loading}
          style={Styles.btn}
          textColor={colors.color2}
          icon={
            paymentMethod === "COD" ? "check-circle" : "circle-multiple-outline"
          }
        >
          {paymentMethod === "COD" ? "Place Order" : "Pay"}
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    padding: 30,
    borderRadius: 10,
    marginVertical: 20,
    flex: 1,
    justifyContent: "center",
  },
  radioStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  radioStyleText: {
    fontWeight: "600",
    fontSize: 18,
    textTransform: "uppercase",
    color: colors.color2,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    margin: 10,
    padding: 5,
  },
});

export default Payment;
