const redux = require('redux');
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators

//Action type string and actionCreator function
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTORED = 'CAKE_RESTORED';

const orderCake = () => {
    return {
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



//initialState and  
//Reducers(prevState,action)=>newState
const InitialState = {
    numOfCake:10
}

const reducer=(state=InitialState,action) => {
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
                return state;
        }
}

//Setting store using redux

const store = createStore(reducer)
console.log('Initital State',store.getState());

const unsubscribe=store.subscribe(()=>console.log('updated state',store.getState()))

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restoreCake(20))

const actions = bindActionCreators({
                            orderCake,
                            restoreCake
                        },store.dispatch);

actions.orderCake();
actions.orderCake();
actions.orderCake();

actions.restoreCake(40)

unsubscribe()