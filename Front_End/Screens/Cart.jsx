import { View, Text } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../Styles/styles";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import  {Button } from "react-native-paper";
import CartItem from "../Components/CartItem";
import { useNavigation } from "@react-navigation/native";

const incrementHandler=() => {};
const decrementHandler=() => {};
const Cart = () => {

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

    const navigate = useNavigation();
  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      {/* header  */}
      <Header back={true} emptyCart={true} />
      <Heading
        text1="Shopping"
        text2="Cart"
        containerStyle={{ paddingTop: 70, marginLeft: 35 }}
      />
      <View
        style={{
            paddingVertical:20,
            flex:1,
        }}
      >
        <ScrollView>
            {CartItems.map((i,index) =>(
                <CartItem 
                    navigate={navigate}
                    key={i.product}
                    id={i.product}
                    name={i.name}
                    stock={i.stock}
                    amount={i.price}
                    imgSrc={i.image}
                    index={index}                
                    qty={i.quantity}
                    incrementHandler={incrementHandler}
                    decrementHandler={decrementHandler}
                    />
            ))}
        </ScrollView>
      </View>
      <View
        style={{
            flexDirection:"row",
            justifyContent:"space-between",
            paddingHorizontal:35,
        }} 
      >
        <Text>5 items</Text>
        <Text>$5</Text>
      </View>
      <TouchableOpacity
        
      >
        <Button
            style={{
                backgroundColor:colors.color3,
                borderRadius:100,
                padding:5,
                margin:30,
            }}
            icon={"cart"}
            textColor={colors.color2}
            onPress={
                CartItems.length > 0 ? ()=> navigate.navigate("confirmorder") : null
            }
        >
            Checkout
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
