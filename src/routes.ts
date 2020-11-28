export default [
	{
		id: 'home',
		path: '/',
		outlet: 'main',
		defaultRoute: true,
	},
	{
		id: 'menu',
		path: '/menu',
		outlet: 'main',
	},
	{
		id: 'drink',
		path: '/drink/{id}',
		outlet: 'main',
	}
];
