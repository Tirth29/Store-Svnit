import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyle, colors } from "../Styles/styles";
import Header from "../Components/Header";
import { Avatar, Button } from "react-native-paper";
import SearchModal from "../Components/SearchModel";
import ProductCard from "../Components/ProductCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Footer from "../Components/Footer";
import Heading from "../Components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getCategoryProduct } from "../Redux/Actions/ProductAction";
import { useSetCategories } from "../Utils/hooks";
import { Toast } from "react-native-toast-message/lib/src/Toast";


const Home = () => {  
  
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { products } = useSelector((state) => state.product);

  const categoryButtonHandler = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const allProductsHandler = () => {
    setSelectedCategory(""); // Reset selected category to empty string
  };

  const addToCardHandler = (id, name, price, image, stock) => {
    console.log(name, price, id, stock);
    if (stock === 0) {
      Toast.show({
        type: "error",
        text1: "Out Of Stock",
      });
      return;
    }

    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: 1,
      },
    });

    Toast.show({
      type: "success",
      text1: "Added To Cart",
    });
  };

  useSetCategories(setCategories, isFocused);

  useEffect(() => {
    if (selectedCategory !== "") {
      dispatch(getCategoryProduct(searchQuery, selectedCategory)); // Fetch category-specific products
    } else {
      dispatch(getAllProducts(searchQuery)); // Fetch all products
    }
  }, [dispatch, searchQuery, selectedCategory, isFocused]);
  return (
    <>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}

      <View style={defaultStyle}>
        <Header />

        {/* Heading Row */}
        <View
          style={{
            paddingTop: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Heading */}
          <Heading text1="Our" text2="Products" />

          {/* Search Bar */}
          <View>
            <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
              <Avatar.Icon
                icon="magnify"
                size={50}
                color="gray"
                style={{ backgroundColor: colors.color2, elevation: 12 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View
          style={{
            flexDirection: "row",
            height: 80,
          }}
        >
          <ScrollView
            horizontal
            contentContainerStyle={{
              alignItems: "center",
            }}
            showsHorizontalScrollIndicator={false}
          >
            <Button
              style={{
                backgroundColor:
                  selectedCategory === "" ? colors.color1 : colors.color5,
                borderRadius: 100,
                margin: 5,
              }}
              onPress={allProductsHandler}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: selectedCategory === "" ? colors.color2 : "gray",
                }}
              >
                All Products
              </Text>
            </Button>

            {categories.map((item) => (
              <Button
                key={item._id}
                style={{
                  backgroundColor:
                    selectedCategory === item._id
                      ? colors.color1
                      : colors.color5,
                  borderRadius: 100,
                  margin: 5,
                }}
                onPress={() => categoryButtonHandler(item._id)}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color:
                      selectedCategory === item._id
                        ? colors.color2
                        : "gray",
                  }}
                >
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.images[0]?.url}
                stock={item.stock}
                addToCardHandler={addToCardHandler}
                navigate={navigate}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <Footer activeRoute="home" />
    </>
  );
};

export default Home;