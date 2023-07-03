import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../Styles/styles";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";

const Footer = ({ activeRoute = "home" }) => {
  const navigate = useNavigation();
  const {loading , isAuthenticated} = useSelector(state => state.user);
  const navigationHandler = (key) => {
    switch (key) {
      case 0:
        navigate.navigate("home");
        console.log("Home");
        break;
      case 1:
        navigate.navigate("cart");
        break;
      case 2:
        if (isAuthenticated) navigate.navigate("profile");
        else navigate.navigate("login");
        console.log("login");
        break;
      default:
        navigate.navigate("home");
        break;
    }
  };

  const avatarOptions = {
    color: colors.color2,
    size: 50,
    style: {
      backgroundColor: colors.color1,
    },
  };
  return ( loading===false && (
     <View
      style={{
        backgroundColor: colors.color1,
        borderTopRightRadius: 100,
        borderTopLeftRadius: 100,
        height: 50,
        position:"absolute",
        width:"100%",
        bottom:0,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          size={50}
          style={{
            backgroundColor: colors.color1,
          }}
          onPress={() => navigationHandler(1)}
        >
          <Avatar.Icon
            color={colors.color2}
            style={{
              backgroundColor: colors.color1,
            }}
            icon={activeRoute === "cart" ? "shopping" : "shopping-outline"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          size={50}
          style={{
            backgroundColor: colors.color1,
          }}
          onPress={() => navigationHandler(2)}
        >
          <Avatar.Icon
            color={colors.color2}
            style={{
              backgroundColor: colors.color1,
            }}
            icon={
                isAuthenticated === false
                ? "login"
                : activeRoute === "profile"
                ? "account"
                : "account-outline"
            }
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          width: 70,
          height: 70,
          backgroundColor: colors.color2,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          top: -40,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigationHandler(0)}
          >
            <Avatar.Icon
              {...avatarOptions}
              icon={activeRoute === "home" ? "home" : "home-outline"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>)
  );
};

export default Footer;
