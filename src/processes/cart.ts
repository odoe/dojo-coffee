import { createProcess, createCommandFactory } from '@dojo/framework/stores/process';

import { Drink, Cart } from '../interfaces';

const commandFactory = createCommandFactory<Cart>();

// generate ids for drink orders
const genId = () => Math.floor((1 + Math.random()) * 0x10000);

// Commands

// fetch current cart
const initCartCommand = commandFactory(async ({ state }) => {
    state.drinks = [];
    state.total = 0;
});

const addToCartCommand = commandFactory<Drink>(async ({ state, payload }) => {
    const drink = { ...payload, id: genId() };
    state.drinks.push(drink);
    const prices = state.drinks.map(x => x.price);
    state.total = prices.reduce((a, b) => a + b, 0);
});

const removeFromCartCommand = commandFactory<Drink>(async ({ state, payload }) => {
    const drinks = state.drinks.filter(x => x.id !== payload.id);
    const prices = drinks.map(x => x.price);
    state.total = prices.reduce((a, b) => a + b, 0);
    state.drinks = drinks;
});

// Processes
export const initCart = createProcess(
    'init-cart',
    [initCartCommand]
);

export const addToCart = createProcess(
    'add-to-cart',
    [addToCartCommand]
);

export const removeFromCart = createProcess(
    'remove-from-cart',
    [removeFromCartCommand]
);
