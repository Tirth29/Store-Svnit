import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../Styles/styles";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({
  stock,
  name,
  price,
  images,
  addToCartHandler,
  id,
  key,
  i,
  navigate,
}) => {
  const navigation = useNavigation(); // Initialize the navigation hook

  const navigateToProductDetails = () => {
    navigation.navigate("productdetails", { id }); // Navigate to "productdetails" with the given id
  };
  return (
    <TouchableOpacity 
    activeOpacity={1}
    // onPress={navigateToProductDetails}
    >
      <View
        style={{
          elevation: 5,
          width: 220,
          alignItems: "center",
          justifyContent: "space-between",
          margin: 20,
          borderRadius: 20, 
          height: 400,
          backgroundColor: i % 2 === 0 ? colors.color1 : colors.color5,
        }}
      >
        <Image
          source={{
            uri: "https://picsum.photos/seed/picsum/200/300",
          }}
          style={{
            width: "100%",
            height: 200,
            resizeMode: "contain",
            position: "absolute",
            left: 10,
            top: 100,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              color: i % 2 === 0 ? colors.color2 : colors.color3,
              fontSize: 25,
              fontWeight: "300",
            }}
          >
            {name}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: i % 2 === 0 ? colors.color2 : colors.color3,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            {price}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: i % 2 != 0 ? colors.color2 : colors.color3,
            borderRadius: 0,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            width: 220,
            marginTop:250,
          }}
        >
          <Button 
            textColor={i%2!=0 ? colors.color1 : colors.color2}
            onPress={navigateToProductDetails}
          >Product Details
          </Button>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
            borderRadius: 0,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            width: 220,
          }}
        >
          <Button 
            textColor={i%2===0 ? colors.color1 : colors.color2}
            onPress={()=>addToCartHandler(id,stock)}
          >Add to Cart
          </Button>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
