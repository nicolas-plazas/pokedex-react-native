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
					order: pokemonDetails.order.toString(),
				});
			}

			setPokemons(pokemonsArray);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ margin: 25 }}>
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
						<View style={styles.card}>
							<Image source={{ uri: item.image }} style={styles.image} />
							<Text style={styles.cardName}>{item.name}</Text>
							<Text style={styles.cardId}>{item.order.padStart(3, 0)}</Text>
						</View>
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 38,
		fontWeight: 'bold',
	},
	description: {
		marginTop: 10,
		marginBottom: 20,
	},
	searchInput: {
		width: '100%',
		height: 40,
		paddingHorizontal: 10,
		backgroundColor: '#ebf3f5',
		borderRadius: 10,
		marginBottom: 25,
	},
	card: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		height: 210,
		padding: 20,
		margin: 3,
		borderRadius: 15,
		backgroundColor: '#c5e3d4',
	},
	image: {
		width: 120,
		height: 120,
	},
	cardName: {
		marginTop: 10,
		marginBottom: 5,
		fontSize: 16,
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},
	cardId: {
		fontSize: 14,
		fontWeight: '200',
	},
});
