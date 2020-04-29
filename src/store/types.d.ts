import { StateType, ActionType } from 'typesafe-actions';

declare module 'local-types' {
  export type Store = StateType<typeof import('./configureStore').store>;
  export type RootAction = ActionType<typeof import('./rootActions').default>;
  export type RootState = StateType<typeof import('./rootReducer').default>;
}

declare module 'typesafe-actions' {
  interface Types {
    RootAction: ActionType<typeof import('./rootActions').default>;
  }
}
