export function asyncActionsMiddleware({ dispatch }) {
    return function(next) {
        return function(action) {

            if(action.hasOwnProperty("httpService") && action.httpService) {
                dispatch(request());
                action.httpService(...action.params)
                    .then(response => {
                      if(response.ok) {
                        const contentType = response.headers.get("content-type");
                        if (contentType && contentType.indexOf("application/json") !== -1) {
                          response.json().then(data => dispatch(success(data)));
                        } else {
                          dispatch(success(response));
                        }
                      } else {
                        response.text().then(error => dispatch(failure(error)));
                      }
                    })
                    .catch(error => dispatch(failure(error)));

                function request() { return { type: generateRequestActionType(action.type) }};
                function success(payload) { return { type: generateSuccessActionType(action.type), payload }};
                function failure(error) { return { type: generateFailureActionType(action.type), error }};
            }

            return next(action);
        }
    }
}

export const generateRequestActionType = actionType => `${actionType}_REQUEST`;
export const generateSuccessActionType = actionType => `${actionType}_SUCCESS`;
export const generateFailureActionType = actionType => `${actionType}_FAILURE`;
