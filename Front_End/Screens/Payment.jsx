import { View, Text } from "react-native";
import React, { useState } from "react";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import { defaultStyle } from "../Styles/styles";
import { StyleSheet } from "react-native";
import { colors } from "../Styles/styles";
import { RadioButton } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../Redux/Actions/OtherAction";
import { useMessageAndErrorOther } from "../Utils/hooks";
import {useStripe} from "@stripe/stripe-react-native";
import axios from "axios";
import { server } from "../Redux/Store";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Loader from "../Components/Loader";


const Payment = ({ navigation, route }) => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loaderLoading, setLoaderLoading] = useState(false);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const redirectToLogin = () => {
    navigation.navigate("login");
  };
  const codHandler = (paymentInfo) => {
    const shippingInfo = {
      address: user.address,
      city: user.city,
      country: user.country,
      pinCode: user.pinCode,
    };
    
    const itemsPrice = route.params.itemsPrice;
    const shippingCharges = route.params.shippingCharges;
    const taxPrice = route.params.tax;
    const totalAmount = route.params.totalAmount;

    dispatch(
      placeOrder(
        cartItems,
        shippingInfo,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        paymentInfo
      )
    );
  };

  const onlineHandler = async () => {
    try {
      const {
        data: { client_secret },
      } = await axios.post(
        `${server}/order/payment`,
        {
          totalAmount: route.params.totalAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const init = await stripe.initPaymentSheet({
        paymentIntentClientSecret: client_secret,
        merchantDisplayName: "Solanki's Store",
      });

      if (init.error)
        return Toast.show({ type: "error", text1: init.error.message });

      const presentSheet = await stripe.presentPaymentSheet();
      setLoaderLoading(true);

      if (presentSheet.error) {
        setLoaderLoading(false);
        return Toast.show({ type: "error", text1: presentSheet.error.message });
      }

      const { paymentIntent } = await stripe.retrievePaymentIntent(
        client_secret
      );

      if (paymentIntent.status === "Succeeded") {
        codHandler({ id: paymentIntent.id, status: paymentIntent.status });
      }
    } catch (error) {
      return Toast.show({
        type: "error",
        text1: "Some Error",
        text2: error,
      });
    }
  };

  const loading = useMessageAndErrorOther(
    dispatch,
    navigation,
    "profile",
    () => ({
      type: "clearCart",
    })
  );
  return (
    loaderLoading ? <Loader/>
        :(
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
            disabled={loading}
            onPress={
              !isAuthenticated
                ? redirectToLogin
                : paymentMethod === "COD"
                ? () => codHandler()
                : onlineHandler
            }
          >
            <Button
              loading={loading}
              disabled={loading}
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
        )
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
