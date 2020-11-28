import { create, tsx } from '@dojo/framework/core/vdom';
import DrinkCard from './DrinkCard';

import { State } from '../interfaces';

import * as css from './styles/DrinkList.m.css';

const factory = create().properties<State>();

export default factory(function DrinkList({ properties }) {
    const { drinks = [] } = properties();
    const elems = drinks.map((drink) => <DrinkCard {...drink} />);

    return  (
        <div classes={[css.root]}>{elems}</div>
    );
});
