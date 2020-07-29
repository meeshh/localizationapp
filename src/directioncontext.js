import React, { useReducer, createContext } from 'react';
import { DIRECTIONS } from 'react-with-direction/dist/constants';

const reducer = (state, action) => {

 switch (action.type) {
  case 'CHANGE_DIRECTION':
   console.log(action)
   return { ...state, ...action.payload };

  default:
   return state;
 }
};

let initialState = { direction: DIRECTIONS.LTR };

const DirectionContext = createContext(initialState);

const DirProvider = props => {
 const [state, dispatch] = useReducer(reducer, initialState);

 return (
  <DirectionContext.Provider value={{ state, dispatch }}>
    {props.children}
  </DirectionContext.Provider>
 );
};

export { DirectionContext, DirProvider };