import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Image, StyleSheet } from 'react-native';

import FavoriteScreen from '../screens/FavoriteScreen';
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
	return (
		<Tab.Navigator initialRouteName='Home'>
			<Tab.Screen
				name='Favorite'
				component={FavoriteScreen}
				options={{
					tabBarLabel: 'Favorites',
					tabBarIcon: ({ color, size }) => (
						<Icon name='heart' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen name='Home' component={HomeScreen} options={{
        headerShown: false,
        tabBarLabel: '',
        tabBarIcon: () => (
          <Image source={require('../assets/pokeball.png')} style={styles.pokeball} />
        )
      }} />
			<Tab.Screen
				name='Account'
				component={AccountScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='user' color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabsNavigator;

const styles = StyleSheet.create({
  pokeball: {
    width: 70,
    height: 70,
    top: -17,
  }
});
