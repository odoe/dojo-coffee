import { create, tsx } from '@dojo/framework/core/vdom';

import * as css from './styles/Home.m.css';

const factory = create();

export default factory(function Home() {
    return (
        <div classes={[css.root]}>
            <a title="Takeaway, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:2019_02_Awesome_Coffee_Shop_in_Korat.jpg" target="_blank">
                <img classes={[css.image]} alt="2019 02 Awesome Coffee Shop in Korat" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/2019_02_Awesome_Coffee_Shop_in_Korat.jpg/1024px-2019_02_Awesome_Coffee_Shop_in_Korat.jpg" />
            </a>
        </div>
    );
});
