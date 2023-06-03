import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import { colors, defaultStyle } from "../Styles/styles";
import ConfirmOrderItem from "../Components/ConfirmOrderItem";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import {cartItems} from "./Cart"
// import {CartItems} from "./Cart";

const CartItems = [
  {
      name:"adafa",
      image:"https://picsum.photos/seed/picsum/200/300",
      product:"uiheoefnbwcenrqebowenbcxw",
      stock: "5",
      price:32134,
      quantity:2,
  },
  {
      name:"adafa",
      image:"https://picsum.photos/seed/picsum/200/300",
      product:"uiheoefnbwcenrthrbowenbcxw",
      stock: "5",
      price:32134,
      quantity:2,
  },
  {
      name:"adafa",
      image:"https://picsum.photos/seed/picsum/200/300",
      product:"uiheoefnbwcenrbergowenbcxw",
      stock: "5",
      price:32134,
      quantity:2,
    },
  ]

const ConfirmOrder = () => {
  const itemPrice = 40000;
  const shippingCharge = 50;
  const tax = 0.18 * itemPrice;
  const totalAmount = itemPrice + shippingCharge + tax;
  const navigate = useNavigation();

  return (
    <View
      style={{
        defaultStyle,
      }}
    >
      <Header back={true} />
      <Heading
        text1="Confirm"
        text2="Order"
        containerStyle={{
          paddingTop: 80,
          paddingLeft: 20,
        }}
        />
      <View
        style={{
          paddingVertical: 20,
        }}
        >
        <ScrollView>
          {CartItems.map((i) => (
            <ConfirmOrderItem
            key={i.product}
            price={i.price}
              image={i.image}
              name={i.name}
              quantity={i.quantity}
            />
          ))}
        </ScrollView>
      </View>
      <PriceTag heading={"subtotal"} value={itemPrice} />
      <PriceTag heading={"shipping"} value={shippingCharge} />
      <PriceTag heading={"tax"} value={tax} />
      <PriceTag heading={"total"} value={totalAmount} />
      <TouchableOpacity
 
      >
        <Button
          style={{
            backgroundColor: colors.color3,
            borderRadius:100,
            margin:10,
            padding:5,
          }}
          textColor={colors.color2}
          // icon={"chervon-right"}
          onPress={() =>
            navigate.navigate("payment", {
              itemPrice,
              shippingCharge,
              tax,
              totalAmount,
            })
          }
        >
          Confirm Payment
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const PriceTag = ({heading, value}) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 5,
      paddingHorizontal:30,
    }}
  >
    <Text style={{ fontWeight: 800 }}>{heading}</Text>
    <Text>{value}</Text>
  </View>
);

export default ConfirmOrder;
