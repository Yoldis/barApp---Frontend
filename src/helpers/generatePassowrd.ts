
export const generatePassowrd = ():string => {
    let num:number;
    let password:string = '';
    const numAleatory:number = Math.floor( Math.random() * 999);

    do{
        do{
            num = Math.floor( Math.random() * (122 - 65 + 1)) + 65;
            
        }while(num > 90 && num < 97);
        password = password + String.fromCodePoint(num);
    }while(password.length < 6);

    return password + numAleatory;
}