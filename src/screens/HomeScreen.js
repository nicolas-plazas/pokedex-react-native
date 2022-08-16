import {
	FlatList,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { useState, useEffect } from 'react';

import { getPokemonsApi, getPokemonApi } from '../api/pokemon';

const HomeScreen = () => {
	const [pokemons, setPokemons] = useState('');

	useEffect(() => {
		(async () => {
			await loadPokemons();
		})();
	}, []);

	const loadPokemons = async () => {
		try {
			const response = await getPokemonsApi();
			const pokemonsArray = [];

			for await (const pokemon of response.results) {
				const pokemonDetails = await getPokemonApi(pokemon.url);

				pokemonsArray.push({
					id: pokemonDetails.id,
					name: pokemonDetails.name,
					image:
						pokemonDetails.sprites.other?.['official-artwork']?.front_default,
				});
			}

			setPokemons(pokemonsArray);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Pokedex</Text>
			<Text style={styles.description}>
				Search for a Pokemon by name or using its National Pokedex number.
			</Text>

			<TextInput style={styles.searchInput} placeholder='Name or number' />
			{/* <Link to={{ screen: 'Detail' }}>Detail</Link> */}
			<FlatList
				data={pokemons}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					// <View style={styles.cardsContainer}>
					<View style={styles.card}>
						<Image source={{ uri: item.image }} style={styles.image} />
						<Text style={styles.cardName}>{item.name}</Text>
						<Text style={styles.cardId}>{item.id}</Text>
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		height: '100%',
		width: '100%',
	},
	title: {
		marginTop: 20,
		fontSize: 45,
		fontWeight: 'bold',
	},
	description: {
		marginTop: 5,
		marginBottom: 25,
	},
	searchInput: {
		width: '100%',
		height: 40,
		paddingHorizontal: 10,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 10,
	},
	cardsContainer: {
		// display: 'flex',
		flex: 1,
		gap: '1rem',
		flexDirection: 'row',
		flexWrap: 'wrap',
		// height: '100%',
		// width: '100%',
		marginVertical: 20,
	},
	card: {
		alignItems: 'center',
		justifyContent: 'flex-end',
		height: 250,
		width: 150,
		padding: 20,
		margin: 5,
		// marginBottom: 15,
		// marginRight: 10,
		borderRadius: 15,
		backgroundColor: '#c5e3d4',
	},
	cardName: {
		marginBottom: 5,
		fontSize: 16,
		fontWeight: 'bold',
	},
	cardId: {
		fontSize: 14,
		fontWeight: '200',
	},
});
