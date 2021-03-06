const { describe, it } = intern.getInterface('bdd');
import renderer, { assertion } from '@dojo/framework/testing/renderer';
import { tsx } from '@dojo/framework/core/vdom';

import Home from '../../../src/widgets/Home';
import * as css from '../../../src/widgets/styles/Home.m.css';

describe('Home', () => {
	it('default renders correctly', () => {
		const r = renderer(() => <Home />);
		const baseAssertion = assertion(() => (
			<h1 classes={[css.root]}>Home Page</h1>
		));
		r.expect(baseAssertion);
	});
});
