//Action type string and actionCreator function
const CAKE_ORDERED = 'CAKE_ORDERED';

const orderCake=()=>{
    return {
        type:CAKE_ORDERED,
        quantity:1
    }
}

//initialState and  
//Reducers(prevState,action)=>newState
const InitialState = {
    numOfCake:10
}
const Reducer=(state=InitialState,action) => {
        switch(action.type){
            case CAKE_ORDERED:
                return{
                ...state,
                numOfCake:state.numOfCake-1
            }
            default:
                return state;
        }
}