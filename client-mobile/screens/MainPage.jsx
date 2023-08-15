import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductsPage from '../components/ProductsPage';
import DetailProductPage from '../components/DetailPage';


const Stack = createNativeStackNavigator();

const MainPage = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen options={{ headerShown: false }} name='Product' component={ProductsPage} />
            <Stack.Screen options={{ headerShown: false }} name='DetailProductPage' component={DetailProductPage} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MainPage
