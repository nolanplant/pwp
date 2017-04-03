const defaultData = {}

export function parentReducer(state = defaultData, action) {
    switch (action.type) {
        case "SOME_CASE":
            return Object.assign({}, state, {
                
            });
    
        default:
            return state;
    }
}