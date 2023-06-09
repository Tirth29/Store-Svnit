import { View, Text, ScrollView,StyleSheet } from "react-native";
import React,{useState} from "react";
import { colors, defaultStyle, formHeading, inputOptions } from "../Styles/styles";
import Header from "../Components/Header";
import CategoryCard from "../Components/CategoryCard";
import { Button, TextInput } from "react-native-paper";
const categories = [
    {
        _id:"1",
        name:"abc",
    },
    {
        _id:"12",
        name:"ac",
    },
    {
        _id:"123",
        name:"ab",
    },
    {
        _id:"121",
        name:"abcd",
    },
];

const Category = () => {
    const deleteHandler = (id)=>{
        console.log(`delete with ID : ${id}`);
    };
    const [category, setCategory] = useState("");
    const loading = false;
    const submitHandler = ()=>{};
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
              name={i.name}
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
