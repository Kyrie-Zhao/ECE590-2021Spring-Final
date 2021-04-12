const state = {
    items: ['1','2','3'],
}
const mutations = {
    SET_ITEM: (state, items) => {
        state.items = items
    },
    ADD_ITEM: (state, item) => {
        state.items.push(item)
    },
    REMOVE_ITEM: (state, ID) => {
        state.items.splice(ID,1)
    },
    SET_NUM: (state, ID, num) => {
        state.items[ID].num = num
    }
}
const actions = {
    showItem(){
        console.log(state.items)
    },
    //new
    searchItem(search) {
        console.log(search)
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}