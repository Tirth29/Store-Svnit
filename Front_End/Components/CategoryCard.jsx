import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { colors } from '../Styles/styles'
import { TouchableOpacity } from 'react-native'

const CategoryCard = ({name,id,deleteHandler}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>{name}</Text>
        <TouchableOpacity onPress={()=>deleteHandler(id)} >
            <Avatar.Icon 
            icon={"delete"}
            size={30}
            style={{
                backgroundColor: colors.color1,
            }}
            />
        </TouchableOpacity>
    </View>
  )
}

export default CategoryCard 

const styles = StyleSheet.create({
    container: {
      padding: 20,
      elevation: 10,
      borderRadius: 10,
      backgroundColor: colors.color3,
    },
  
    cardContainer: {
      backgroundColor: colors.color2,
      elevation: 5,
      margin: 10,
      padding: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 10,
    },
    cardText: {
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
  });