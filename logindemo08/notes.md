adganf til context i routeren (loaders og actions)

actions og loaders som higher order functions hivs nødvendigt

higher order action  = en funktion som returnerer en funktioneller tager en funktion som dens argument

const action = function(auth.user){
    return function ({request}){
        auth.user
    }
}

const action = (auth.user) => ({request}) =>{
    
}