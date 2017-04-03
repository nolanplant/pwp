const defaultData = {}

export function loginReducer(state = defaultData, action) {
    switch (action.type) {
        case "SOME_CASE":
            return Object.assign({}, state, {
                
            });
    
        default:
            return state;
    }
}