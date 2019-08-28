export class Login {
    membershipNumber : string;
    password: string;
    login: string;
    loginData(){
        //'memno=17370&password=xr9hng&login=Login
        return `memno={membershipNumber}&password={password}&login={login}`;
    }
}