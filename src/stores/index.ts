import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { InjectionKey } from 'vue';

// Определяем интерфейс для состояния
export interface State {
    isAuthenticated: boolean;
}

// Определяем типы для мутаций
export enum MutationTypes {
    AUTHENTICATE = 'authenticate',
    LOGOUT = 'logout',
}

export type Mutations<S = State> = {
    [MutationTypes.AUTHENTICATE](state: S): void;
    [MutationTypes.LOGOUT](state: S): void;
};

// Определяем типы для действий
export enum ActionTypes {
    LOGIN = 'login',
    LOGOUT = 'logout',
}

export type Actions = {
    [ActionTypes.LOGIN]({ commit }: { commit: Commit<Mutations> }): void;
    [ActionTypes.LOGOUT]({ commit }: { commit: Commit<Mutations> }): void;
};

// Определяем типы для геттеров
export type Getters = {
    isAuthenticated(state: State): boolean;
};

// Определяем ключ инъекции
export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
    state: {
        isAuthenticated: false,
    },
    mutations: {
        authenticate(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
    },
    actions: {
        login({ commit }) {
            commit('authenticate');
        },
        logout({ commit }) {
            commit('logout');
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
    },
});

export function useStore() {
    return baseUseStore(key);
}

export default store;
