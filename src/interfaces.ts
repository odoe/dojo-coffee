export interface Order {
	drinks: Drink[];
	total: number;
}

export interface Drink {
	id: number;
	name: string;
	price: number;
	addins: AddIn[];
	toppings: Toppings[];
	flavors: Flavor[];
	size: Size;
	imageUrl: string;
}

export interface State {
	drinks: Drink[];
}

export interface Cart extends State {
	total: number;
}

export type AddIn = 'milk' | 'sugar' | 'stevia' | 'honey';
export type Size = 'small' | 'medium' | 'large';
export type Flavor = 'caramel' | 'vanilla' | 'pumpkin' | 'almond';
export type Toppings = 'cinnamon' | 'whipped cream' | 'nuts';
