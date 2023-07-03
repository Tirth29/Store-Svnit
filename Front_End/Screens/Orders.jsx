import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../Styles/styles";
import { formHeading } from "../Styles/styles";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import { Headline } from "react-native-paper";
import OrderItem from "../Components/OrderItem";
import { useIsFocused } from "@react-navigation/native";
import { useGetOrders } from "../Utils/hooks";

const Orders = () => {
  const isFocused = useIsFocused();
  const { loading, orders } = useGetOrders(isFocused);
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
                  cname={item.user}
                  price={item.totalAmount}
                  status={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  orderedOn={item.createdAt.split("T")[0]}
                  address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country}, ${item.shippingInfo.pinCode}`}
                  admin={false}
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
