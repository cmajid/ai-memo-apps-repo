import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { ButtonProps } from "react-native/Libraries/Components/Button";

interface props {
  onPress: any;
  icon: string;
  title: string;
  colors?: string[];
}

export function CButton({ onPress, icon, title, colors }: props) {
  const bgColor = colors ?? ["#841584"];
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        // Button Linear Gradient
        colors={bgColor}
        style={styles.button}
      >
        <Icon name={icon} color="#fff" size={15} style={styles.icon}></Icon>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,


    borderColor: '#fff', 
    borderWidth: 2, 
  },
  icon: {
    marginRight: 10,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
