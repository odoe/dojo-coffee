import { tsx, create } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import theme from '@dojo/framework/core/middleware/theme';

import dojo from '@dojo/widgets/theme/dojo';
import Header from '@dojo/widgets/header';
import SlidePane from '@dojo/widgets/slide-pane';

import Outlet from '@dojo/framework/routing/Outlet';
import { Link } from '@dojo/framework/routing/Link';

import store from './middleware/drinksStore';
import * as css from './App.m.css';
import Cart from './widgets/Cart';
import DrinkList from './widgets/DrinkList';
import DrinkPage from './widgets/DrinkPage';
import Home from './widgets/Home';

import { fetchDrinks } from './processes/drinks';

const factory = create({ icache, store, theme });

export default factory(function App({ middleware: { icache, store, theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}

	const { executor, get, path } = store;
	const drinks = get(path('drinks'));

	if (!drinks || !drinks.length) {
		executor(fetchDrinks)({});
	}

	return (
		<div classes={[css.root]}>
			<Header sticky>
				{{
					title: 'The Brew Crew',
					actions: [
						<div classes={[css.items]}>
							<Link to="home">Home</Link>
						</div>,
						<div classes={[css.items]}>
							<Link to="menu">Menu</Link>
						</div>,
						<div classes={[css.items]}>
							<a
								href="#"
								onclick={(e) => {
									e.preventDefault();
									icache.set('open', (open) => !open);
								}}
							>
								Cart
							</a>
						</div>,
					],
				}}
			</Header>
			<Outlet id="main">
				{{
					home: <Home />,
					menu: <DrinkList drinks={drinks} />,
					drink: ({ params: { id } }) => {
						if (!drinks) {
							return <div>No drinks found</div>;
						}
						const drink = drinks.find((x) => x.id === Number(id));
						if (drink) {
							return <DrinkPage {...drink} />;
						} else {
							return <div>No drink found</div>;
						}
					},
				}}
			</Outlet>
			<SlidePane
				title="Cart"
				open={icache.getOrSet('open', false)}
				underlay={false}
				align="right"
				onRequestClose={() => {
					icache.set('open', false);
				}}
			>
				<Cart />
			</SlidePane>
		</div>
	);
});
