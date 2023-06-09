import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../Styles/styles";
import { formHeading } from "../Styles/styles";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import { Headline } from "react-native-paper";
import OrderItem from "../Components/OrderItem";

export const orders = [
  {
    _id: "1",
    shippingInfo: {
      address: "K.P park-2",
      city: "Kosamba",
      country: "India",
      pincode: 394120,
    },
    created_at: "12-12-2015",
    orderStatus: "Processing",
    paymentMethode: "COD",
    totalAmount: 20101,
  },
  {
    _id: "12",
    shippingInfo: {
      address: "K.P park-2",
      city: "Kosamba",
      country: "India",
      pincode: 394120,
    },
    created_at: "12-12-2015",
    orderStatus: "Processing",
    paymentMethode: "COD",
    totalAmount: 20101,
  },
  {
    _id: "123s",
    shippingInfo: {
      address: "K.P park-2",
      city: "Kosamba",
      country: "India",
      pincode: 394120,
    },
    created_at: "12-12-2015",
    orderStatus: "Processing",
    paymentMethode: "COD",
    totalAmount: 20101,
  },
  {
    _id: "12d3",
    shippingInfo: {
      address: "K.P park-2",
      city: "Kosamba",
      country: "India",
      pincode: 394120,
    },
    created_at: "12-12-2015",
    orderStatus: "Processing",
    paymentMethode: "COD",
    totalAmount: 20101,
  },
  {
    _id: "12w3",
    shippingInfo: {
      address: "K.P park-2",
      city: "Kosamba",
      country: "India",
      pincode: 394120,
    },
    created_at: "12-12-2015",
    orderStatus: "Processing",
    paymentMethode: "COD",
    totalAmount: 20101,
  },
  {
    _id: "123q",
    shippingInfo: {
      address: "K.P park-2",
      city: "Kosamba",
      country: "India",
      pincode: 394120,
    },
    created_at: "12-12-2015",
    orderStatus: "Processing",
    paymentMethode: "COD",
    totalAmount: 20101,
  },
];

const Orders = () => {
  const loading = false;
  return (
    <View style={defaultStyle}>
      {/* header  */}
      <Header back={true} />
      {/* heading  */}
      <View>
        <Text style={styles.formHeading}>Orders</Text>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            padding: 10,
            flex: 1,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <OrderItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  price={item.totalAmount}
                  status={item.orderStatus}
                  paymentMethod={item.paymentMethode}
                  orderedOn={item.created_at.split("T")[0]}
                  address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country}, ${item.shippingInfo.pincode}`}
                  admin={true}
                />
              ))
            ) : (
              <Headline style={{ textAlign: "center" }}>No Orders Yet</Headline>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formHeading: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: colors.color1,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
    marginTop: 50,
  },
});

export default Orders;
