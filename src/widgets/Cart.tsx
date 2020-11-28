import { create, tsx } from '@dojo/framework/core/vdom';
import store from '../middleware/cartStore';
import { initCart, removeFromCart } from '../processes/cart';

import * as css from './styles/Cart.m.css';

const factory = create({ store });

export default factory(function Cart({ middleware: { store } }) {
	const { executor, get, path } = store;
	const init = executor(initCart);
	const remove = executor(removeFromCart);
	const orders = get(path('drinks'));
	const total = get(path('total')) || 0;
	if (!orders) {
		init({});
	}

	return (
		<div classes={[css.root]}>
			{!orders || !orders.length ? (
				<div>Cart is empty</div>
			) : (
				<div key="drink-orders" classes={[css.content]}>
					{orders.map((x) => (
						<div classes={[css.order]} key={`order-${x.id}`}>
							<div classes={[css.item]}>
								<label>{x.name}</label>
								<label>Size: {x.size}</label>
								<button
									classes={[css.remove]}
									onclick={() => {
										remove(x);
									}}
								>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>
			)}
			<label>Total: ${total.toFixed(2)}</label>
		</div>
	);
});
