import { View, Text, StyleSheet, Image } from "react-native";
import React,{useState} from "react";
import { TouchableOpacity } from "react-native";
import { colors } from "../Styles/styles";
import MyModal from "./MyModel";

const ProductListItem = ({
  navigate,
  deleteHandler,
  i,
  id,
  price,
  stock,
  name,
  category,
  imgSrc,
}) => {
    const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigate.navigate("productdetails", { id })}
        onLongPress={() => setOpenModal((prev) => !prev)}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor: i % 2 === 0 ? colors.color1 : colors.color3,
          }}
        >
          <Image
            source={{ uri: imgSrc }}
            style={{ width: 40, height: 40, resizeMode: "contain" }}
          />
          <Text style={{ width: 60, color: colors.color2,paddingLeft:8, }} numberOfLines={1}>
            {price}
          </Text>
          <Text style={{ width: 60, color: colors.color2 }} numberOfLines={1}>
            {name}
          </Text>
          <Text style={{ width: 60, color: colors.color2 }} numberOfLines={1}>
            {category}
          </Text>
          <Text style={{ width: 60, color: colors.color2,paddingLeft:8,}} numberOfLines={1}>
            {stock}
          </Text>
        </View>
      </TouchableOpacity>
      {
        openModal && (
            <MyModal id={id} deleteHandler={deleteHandler} navigate={navigate} setOpenModal={setOpenModal}/>
        )
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default ProductListItem;
