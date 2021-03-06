import { IAction, isType } from "../util";

import {
  beginDelayedIncrement,
  completeDelayedIncrement,
  decrementBy,
  incrementBy
} from "../actions/counter";

export interface ICounterState {
  readonly count: number;
  readonly pending: boolean;
}

const initialState: ICounterState = {
  count: 0,
  pending: false,
}

export default (state: ICounterState = initialState, action: IAction<any>): ICounterState => {
  if (isType(action, incrementBy)) {
    return {
      ...state,
      count: state.count + action.payload.amount,
    };
  }
  if (isType(action, decrementBy)) {
    return {
      ...state,
      count: state.count - action.payload.amount,
    };
  }
  if (isType(action, beginDelayedIncrement)) {
    return {
      ...state,
      pending: true,
    };
  }
  if (isType(action, completeDelayedIncrement)) {
    return {
      count: state.count + action.payload.amount,
      pending: false,
    };
  }
  return state;
};
