const pokedex = document.getElementById('poke_container');
const poke_numeber = 898;

const fetchPokemon = () => {
    const promises = [];

    for(let i=1; i<=poke_numeber; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
    }

    Promise.all(promises).then(results => {
        const pokemon = results.map(data => ({
            name:       data.name,
            id:         data.id,
            image:      data.sprites['front_default'],
            type:       data.types.map((el) => el.type.name),
            hp:         data.stats[0]['base_stat'],
            atk:        data.stats[1]['base_stat'],
            def:        data.stats[2]['base_stat'],
            spec_atk:   data.stats[3]['base_stat'],
            spec_def:   data.stats[4]['base_stat'],
            speed:      data.stats[5]['base_stat']
        }));
        
        displayPokemon(pokemon);
    });
}

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map(pokeman => {
        let st_type = pokeman.type[0];
        
        return (
            `<div class="poke-card" id="${st_type}">
                <p class="poke-card-name">${pokeman.name}</p>
                <img class="poke-card-type" src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${st_type}.svg" alt="${st_type} icon" />
                <span class="circle"></span>
                <img src="${pokeman.image}" class="poke-card-sprite" />
                <br>
                <div class="poke-card-stats-container">
                    <table class="poke-card-stats">
                        <tr>
                            <td>HP</td>
                            <td class="poke-card-stats-num">${pokeman.hp}</td>
                            <td>Attack</td>
                            <td class="poke-card-stats-num">${pokeman.atk}</td>
                        </tr>
                        <tr>
                            <td>Defense</td>
                            <td class="poke-card-stats-num">${pokeman.def}</td>
                            <td>Special Attack</td>
                            <td class="poke-card-stats-num">${pokeman.spec_atk}</td>
                        </tr>
                        <tr>
                            <td>Special Defense</td>
                            <td class="poke-card-stats-num">${pokeman.spec_def}</td>
                            <td>Speed</td>
                            <td class="poke-card-stats-num">${pokeman.speed}</td>
                        </tr>
                    </table>
                </div>
            </div>`
        )
    }).join('');

    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon();