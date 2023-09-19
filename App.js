import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/Home';
import Contact from './pages/Contact';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false}}/ >
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false}}/ >
        <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false}}/ >
      </Stack.Navigator>
    </NavigationContainer> 
  );
}