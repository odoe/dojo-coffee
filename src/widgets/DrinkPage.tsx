import { create, tsx } from '@dojo/framework/core/vdom';
import { icache } from '@dojo/framework/core/middleware/icache';
import { injector } from '@dojo/framework/core/middleware/injector';

import Button from '@dojo/widgets/button';
import Card from '@dojo/widgets/card';
import CheckboxGroup from '@dojo/widgets/checkbox-group';
import Label from '@dojo/widgets/label';
import RadioGroup from '@dojo/widgets/radio-group';

import store from '../middleware/cartStore';
import { addToCart } from '../processes/cart';

import { Drink } from '../interfaces';

import * as css from './styles/DrinkPage.m.css';
import Router from '@dojo/framework/routing/Router';

const factory = create({ icache, injector, store }).properties<Drink>();

export default factory(function DrinkPage({
	middleware: { icache, injector, store },
	properties
}) {
	const router = injector.get('router') as Router;
	const drink = properties();
	const { name = 'Coffee', price, imageUrl: image } = drink;
	const currentPrice = icache.getOrSet('currentPrice', price);
	const add = store.executor(addToCart);

	return (
		<div classes={[css.root]}>
			<h3>{name}</h3>
			<Label secondary>${currentPrice.toFixed(2)}</Label>
			<img classes={[css.image]} src={image} />
			<Card>
				{{
					content: (
						<div classes={[css.content]}>
							<RadioGroup
								name="size"
								initialValue="small"
								options={[
									{ value: 'small', label: 'Small' },
									{
										value: 'medium',
										label: 'Medium (+ $0.50)',
									},
									{
										value: 'large',
										label: 'Large (+ $1.00)',
									},
								]}
								onValue={(value) => {
									icache.set('size', value);
									switch (value) {
										case 'small':
											icache.set('currentPrice', price);
											break;
										case 'medium':
											icache.set(
												'currentPrice',
												price + 0.5
											);
											break;
										case 'large':
											icache.set(
												'currentPrice',
												price + 1
											);
											break;
									}
								}}
							>
								{{
									label: 'Drink Size',
								}}
							</RadioGroup>
						</div>
					),
				}}
			</Card>
			<Card>
				{{
					content: (
						<div classes={[css.content]}>
							<CheckboxGroup
								name="addins"
								options={[
									{
										value: 'milk',
										label: 'Milk',
									},
									{
										value: 'sugar',
										label: 'Sugar',
									},
									{
										value: 'stevia',
										label: 'Stevia',
									},
									{
										value: 'honey',
										label: 'Honey',
									},
								]}
								onValue={(values) => {
									icache.set('addins', values);
								}}
							>
								{{
									label: 'Add Ins',
								}}
							</CheckboxGroup>
						</div>
					),
				}}
			</Card>
			<Card>
				{{
					content: (
						<div classes={[css.content]}>
							<CheckboxGroup
								name="flavors"
								options={[
									{
										value: 'caramel',
										label: 'Caramel',
									},
									{
										value: 'vanilla',
										label: 'Vanilla',
									},
									{
										value: 'pumpkin',
										label: 'Pumpkin',
									},
									{
										value: 'almond',
										label: 'Almond',
									},
								]}
								onValue={(values) => {
									icache.set('flavors', values);
								}}
							>
								{{
									label: 'Flavors',
								}}
							</CheckboxGroup>
						</div>
					),
				}}
			</Card>
			<Card>
				{{
					content: (
						<div classes={[css.content]}>
							<CheckboxGroup
								name="toppings"
								options={[
									{
										value: 'cinnamon',
										label: 'Cinnamon',
									},
									{
										value: 'whipped cream',
										label: 'Whipped Cream',
									},
									{
										value: 'nuts',
										label: 'Nuts',
									},
								]}
								onValue={(values) => {
									icache.set('toppings', values);
								}}
							>
								{{
									label: 'Toppings',
								}}
							</CheckboxGroup>
						</div>
					),
				}}
			</Card>
			<Button
				onClick={() => {
					const size = icache.getOrSet('size', 'small');
					const addins = icache.getOrSet('addins', []);
					const toppings = icache.getOrSet('toppings', []);
					const flavors = icache.getOrSet('flavors', []);
					const currentPrice = icache.getOrSet('currentPrice', price);

					const userDrink: Drink = {
						...drink,
						price: currentPrice,
						size,
						addins,
						toppings,
						flavors,
					};
					add(userDrink);
					router.setPath('menu');
				}}
			>
				Add to Cart
			</Button>
		</div>
	);
});
