import LoginScreen from "./src/screens/loginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardScreen } from "./src/screens/dashboardScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{  headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: "Dashboard",
            animation: "none",
            // animationDuration: 1000,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
