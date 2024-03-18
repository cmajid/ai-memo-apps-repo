import { Text } from "react-native";

export function DashboardScreen({navigation, route}) {

  console.log("navigation", navigation)
  console.log("route", route)
  return <Text>This is {route.params.name}'s profile</Text>;
}
