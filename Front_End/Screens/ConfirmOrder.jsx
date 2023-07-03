import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import { colors, defaultStyle } from "../Styles/styles";
import ConfirmOrderItem from "../Components/ConfirmOrderItem";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";


const ConfirmOrder = () => {
  const navigate = useNavigation();
  const {cartItems} = useSelector((state)=>state.cart)
  const [itemsPrice] = useState(cartItems.reduce((prev,curr)=>prev +curr.quantity*curr.price,0))
  const [shippingCharges]=useState(itemsPrice<10000 ? 0 : 200);
  const [tax] = useState(Number((itemsPrice*0.18).toFixed()));
  const [totalAmount] = useState(itemsPrice + shippingCharges + tax);

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
          {cartItems.map((i) => (
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
      <PriceTag heading={"Subtotal"} value={itemsPrice} />
      <PriceTag heading={"Shipping Chrge"} value={shippingCharges} />
      <PriceTag heading={"Tax"} value={tax} />
      <PriceTag heading={"Total Amount"} value={totalAmount}/>
      <TouchableOpacity>
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
              itemsPrice,
              shippingCharges,
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
    <Text>₹{value}</Text>
  </View>
);

export default ConfirmOrder;
