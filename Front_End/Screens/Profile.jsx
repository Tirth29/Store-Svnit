import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle, formHeading } from "../Styles/styles";
import { Avatar, Button } from "react-native-paper";

const users = {
    
        name:"John",
        email: "john@example.com",
    
}

const Profile = (navigation) => {
    const [avatar,setAvatar]=useState("");

  return (
    <View style={defaultStyle}>
      {/* heading  */}
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <Text style={formHeading}>Profile</Text>
      </View>
      <View style={styles.container}>
        <Avatar.Image 
            source={{
                uri:avatar,
            }}
            size={100}
            style={{
                backgroundColor:colors.color1,
            }}
        />
        <TouchableOpacity
            onPress={() =>navigation.navigate("camera",{updateProfile:true})}
        >
            <Button textColor={colors.color1} >Change Photo</Button>
        </TouchableOpacity>
        <Text style={styles.name}>{users?.name}</Text>
        <Text
            style={{
                fontWeight:300,
                backgroundColor:colors.color2,
            }}
        >{users?.email}</Text>
      </View>
      <View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      elevation: 7,
      backgroundColor: colors.color3,
      padding: 30,
      borderRadius: 10,
      alignItems: "center",
    },
    name: {
      fontSize: 20,
      fontWeight: "500",
      marginTop: 10,
      color: colors.color2,
    },
  });

export default Profile;
