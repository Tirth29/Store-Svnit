import { View, Text } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../Styles/styles";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import CartItem from "../Components/CartItem";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Cart = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const incrementHandler = (id, name, price, image, stock, quantity) => {
    const newQty = quantity + 1;
    if (stock <= quantity)
      return Toast.show({
        type: "error",
        text1: "Maximum value added",
      });
    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };
  const decrementHandler = (id, name, price, image, stock, quantity) => {
    const newQty = quantity - 1;

    if (1 >= quantity) return dispatch({ type: "removeFromCart", payload: id });

    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };
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
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <ScrollView>
          {cartItems.length > 0 ? (
            cartItems.map((i, index) => (
              <CartItem
                navigate={navigate}
                key={i.product}
                id={i.product}
                name={i.name}
                stock={i.stock}
                price={i.price}
                imgSrc={i.image}
                index={index}
                qty={i.quantity}
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
              />
            ))
          ) : (
            <Text style={{ textAlign: "center", fontSize: 22 }}>
              {" "}
              No item here{" "}
            </Text>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 35,
        }}
      >
        <Text>{cartItems.length} items</Text>
        <Text>₹{cartItems.reduce((prev,curr)=>prev +curr.quantity*curr.price,0)}</Text>
      </View>
      <TouchableOpacity>
        <Button
          style={{
            backgroundColor: colors.color3,
            borderRadius: 100,
            padding: 5,
            margin: 30,
          }}
          icon={"cart"}
          textColor={colors.color2}
          onPress={
            cartItems.length > 0
              ? () => navigate.navigate("confirmorder")
              : null
          }
        >
          Checkout
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
