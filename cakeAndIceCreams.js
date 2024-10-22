const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleWare = redux.applyMiddleware;

const logger = require('redux-logger').createLogger()

//Action type and action Creator
const CAKE_ORDERED= 'CAKE_ORDERED';
const CAKE_RESTORED = 'CAKE_RESTORED';

const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTORED='ICECREAM_RESTORED';

const buyCake = () => {
    return{
        type:CAKE_ORDERED,
        payload:1
    }
}

const restoreCake = (qty=1) => {
    return{
        type:CAKE_RESTORED,
        payload:qty
    }
}

const buyIceCream = () => {
    return{
        type:ICECREAM_ORDERED,
        payload:1
    }
}

const restoreIceCream = (qty=1) => {
    return{
        type:ICECREAM_RESTORED,
        payload:qty
    }
}

//Initial State and reducers

const IceCreamState = {
    numOfIceCream:20
}

const CakeState = {
    numOfCake:30
}

const cakeReducers = (state=CakeState,action ) => {
    switch(action.type){
        case CAKE_ORDERED:
            return{
                ...state,
                numOfCake:state.numOfCake-1
            }
        case CAKE_RESTORED:
            return{
                ...state,
                numOfCake:state.numOfCake+action.payload
            }
        default:
            return state

    }
}

const iceCreamReducers = (state=IceCreamState,action ) => {
    switch(action.type){
        case ICECREAM_ORDERED:
            return{
                ...state,
                numOfIceCream:state.numOfIceCream-1
            }
        case ICECREAM_RESTORED:
            return{
                ...state,
                numOfIceCream:state.numOfIceCream+action.payload
            }
        default:
            return state

    }
}

const rootReducer = combineReducers({
    cake:cakeReducers,
    iceCream:iceCreamReducers
})

const store = createStore(rootReducer,applyMiddleWare(logger));
console.log("Initial State is ",store.getState());
const unsubscribe = store.subscribe(
    ()=>{}
);
// store.dispatch(buyIceCream());
// store.dispatch(buyIceCream());
// store.dispatch(buyIceCream());
// store.dispatch(buyIceCream());
// store.dispatch(restoreIceCream(20));

const actions = bindActionCreators(
    {buyCake,restoreCake,buyIceCream,restoreIceCream},
    store.dispatch
)
actions.buyIceCream()
actions.restoreCake(3)
actions.buyIceCream()
actions.buyIceCream()
actions.buyIceCream()
actions.buyCake()
actions.restoreIceCream(30)
