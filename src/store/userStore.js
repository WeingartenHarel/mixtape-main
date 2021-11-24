import {userService} from '@/services/userService.js'

export default {
    state: {
        loggedinUser: null,
        users: [],
        isLogin: false,
        isSignup: false
    },
    getters: {
        getLoggedinUser(state) {
            return state.loggedinUser
        },
        isAdmin() {

        },
        getIsLogin(state) {
            return state.isLogin;
        },
        getIsSignup(state) {
            return state.isSignup;
        },
        getUsers(state) {
            return state.users;
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedinUser = user;
        },
        setUsers(state, {users}){
            state.users = users;
        },
        setLogin(state){
            state.isLogin = !state.isLogin;
            state.isSignup = false
        },
        setSignup(state){
            state.isSignup = !state.isSignup;
            state.isLogin = false
        },
        // removeUser(state, {userId}) {
        //     state.users = state.users.filter(user => user._id !== userId)
        // },
    }, 
    actions: {
        async login(context, payload) {
            console.log('userCred',payload.userCred);
            const user = await userService.login(payload.userCred);
            console.log('login() user',user)
            context.commit({ type: 'setUser', user })
            return user;
        },
        async logout(context) {
            await userService.logout()
            context.commit({type: 'setUsers', users: []})
            context.commit({type: 'setUser', user: null})
        },
        async signup(context, { userCred }) {
            const user = await userService.signup(userCred)
            context.commit({type: 'setUser', user})
            return user;
        },
        // async loadUsers(context) {
        //     const users = await UserService.getUsers();
        //     context.commit({type: 'setUsers', users})
        // },
        // async removeUser(context, {userId}) {
        //     await UserService.remove(userId);
        //     context.commit({type: 'removeUser', userId})
        // },
        // async updateUser(context, {user}) {
        //     user = await UserService.update(user);
        //     context.commit({type: 'setUser', user})
        // }
    }
}