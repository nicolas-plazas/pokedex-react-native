import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';

export default function App() {
	return (
		<NavigationContainer>
			<SafeAreaView style={styles.container}>
				<BottomTabsNavigator></BottomTabsNavigator>
			</SafeAreaView>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		margin: 25,
	},
});
