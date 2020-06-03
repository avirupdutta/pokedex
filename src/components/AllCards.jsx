import React, { Component } from "react";
import Card from "./Card";

class AllCards extends Component {
	state = {
		colors: {
			fire: "#FDDFDF",
			grass: "#41ffaf33",
			water: "#00cfff2e",
			electric: "#FCF7DE",
			ground: "#f4e7da",
			rock: "#d5d5d4",
			fairy: "#fceaff",
			poison: "#ece5ff",
			bug: "#f8d5a3",
			dragon: "#97b3e6",
			psychic: "#eaeda1",
			flying: "#F5F5F5",
			fighting: "#E6E0D4",
			normal: "#F5F5F5"
		},
		pokemonUrl: "https://pokeapi.co/api/v2/pokemon/",
		totalPokemons: 150,
		pokemons: []
	};
	getPokemon = async id => {
		const response = await fetch(this.state.pokemonUrl + `${id}`);
		const pokemon = await response.json();
		return pokemon;
	};

	componentDidMount() {
		for (let index = 1; index <= this.state.totalPokemons; index++) {
			this.getPokemon(index).then(pokemon => {
				this.setState({
					...this.state,
					pokemons: [
						...this.state.pokemons,
						{
							...pokemon,
							type: pokemon.types.reverse()[0].type.name
						}
					]
				});
			});
		}
	}
	render() {
		console.log(this.state.pokemons);
		return (
			<div className="row row-cols-md-5">
				{this.state.pokemons.map(pokemon => (
					<Card
						color={this.state.colors[pokemon.type]}
						type={pokemon.type}
						pokemon={pokemon}
					/>
				))}
			</div>
		);
	}
}

export default AllCards;
