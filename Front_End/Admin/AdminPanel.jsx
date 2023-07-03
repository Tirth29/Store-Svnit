import { View, Text, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle, formHeading } from "../Styles/styles";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import ButtonBox from "../Components/ButtonBox";
import ProductListHeading from "../Components/ProductListHeading";

import ProductListItem from "../Components/ProductListItem";
import Chart from "../Components/Chart";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useAdminProducts, useMessageAndErrorOther } from "../Utils/hooks";
import { deleteProduct } from "../Redux/Actions/OtherAction";
import { getAdminProducts } from "../Redux/Actions/ProductAction";

const products = [];

const AdminPanel = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {products, inStock, outOfStock, loading } = useAdminProducts(dispatch, isFocused);
  const navigate = useNavigation();
  const navigationHandler = (text) => {
    switch (text) {
      case "Category":
        navigate.navigate("categories");
        break;
      case "All Orders":
        navigate.navigate("adminorders");
        break;
      case "Product":
        navigate.navigate("newproduct");
        break;

      default:
        navigate.navigate("adminorders");
        break;
    }
  };
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const loadingDelete = useMessageAndErrorOther(dispatch,null,null,getAdminProducts);
  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <View style={{ paddingTop: 70, marginBottom: 20 }}>
        <Text style={formHeading}>Admin Panel</Text>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View
            style={{
              backgroundColor: colors.color3,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Chart inStock={inStock} outOfStock={outOfStock} />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-evenly",
              }}
            >
              <ButtonBox
                icon={"plus"}
                text={"Product"}
                handler={navigationHandler}
              />
              <ButtonBox
                icon={"format-list-bulleted-square"}
                text={"All Orders"}
                handler={navigationHandler}
                reverse={true}
              />
              <ButtonBox
                icon={"plus"}
                text={"Category"}
                handler={navigationHandler}
              />
            </View>
          </View>
          <ProductListHeading />
          <ScrollView>
            <View>
              {!loadingDelete && products.map((item, index) => (
                <ProductListItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  navigate={navigation}
                  deleteHandler={deleteProductHandler}
                  price={item.price}
                  stock={item.stock}
                  name={item.name}
                  category={item.category?.category}
                  imgSrc={item.images[0].url}
                />
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AdminPanel;
