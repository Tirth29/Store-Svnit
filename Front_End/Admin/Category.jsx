import { View, Text, ScrollView,StyleSheet } from "react-native";
import React,{useState} from "react";
import { colors, defaultStyle, formHeading, inputOptions } from "../Styles/styles";
import Header from "../Components/Header";
import CategoryCard from "../Components/CategoryCard";
import { Button, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useMessageAndErrorOther, useSetCategories } from "../Utils/hooks";
import { addCategory, deleteCategory } from "../Redux/Actions/OtherAction";



const Category = ({navigation}) => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useSetCategories(setCategories, isFocused);

  const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  const submitHandler = () => {
    dispatch(addCategory(category));
  };
  return (
    <View
      style={{
        ...defaultStyle,
        backgroundColor: colors.color5,
      }}
    >
      <Header back={true} />
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading}>Categories</Text>
      </View>
      <ScrollView
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 20,
            minHeight: 400,
          }}
        >
          {categories.map((i) => (
            <CategoryCard
              name={i.category}
              id={i._id}
              key={i._id}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.container}>
        <TextInput
                {...inputOptions}
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
        />
        <Button 
            textColor={colors.color2}
            style={{
                backgroundColor: colors.color1,
                margin:20,
                padding:6,
            }}
            loading={loading}
            disabled={!category}
            onPress={submitHandler}
        >
            Add
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 10,
      elevation: 10,
      borderRadius: 10,
      backgroundColor: colors.color3,
    },
})

export default Category;
