const sessionMiddleware = (storeAPI) => (next) => (action) => {
    if (action.type === 'login/loggedIn') {
      const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds
  
      // Set a timeout to log out after session expiry
      setTimeout(() => {
        const currentState = storeAPI.getState().login;
        if (currentState.status && Date.now() >= expiryTime) {
          storeAPI.dispatch({ type: 'login/logout' }); // Dispatch logout action
        }
      }, 4000); // 1 hour timeout
    }
  
    return next(action); // Pass the action to the next middleware or reducer
  };
  
  export default sessionMiddleware;
  