const {USER, PASS} = process.env;

export function ID_(){
    return process.env.USER;
}

export function password(){
    return process.env.PASS;
}