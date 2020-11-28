import {
	createProcess,
	createCommandFactory,
} from '@dojo/framework/stores/process';

import { Drink, State } from '../interfaces';

const commandFactory = createCommandFactory<State>();

type DrinkJSON = Pick<Drink, 'id' | 'name' | 'price' | 'imageUrl'>;

// Commands

// fetch list of drinks
const fetchDrinksCommand = commandFactory(async ({ state }) => {
	const response = await fetch('/assets/data.json');
	const data: DrinkJSON[] = await response.json();
	const drinks: Drink[] = data.map((x) => ({
		...x,
		addins: [],
		toppings: [],
		flavors: [],
		size: 'small',
	}));
	state.drinks = [...drinks];
});

// Processes
export const fetchDrinks = createProcess('fetch-drinks', [fetchDrinksCommand]);
