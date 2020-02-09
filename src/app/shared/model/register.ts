export interface Iregister {
    firstname: string;
    lastname: string;
    address: string;
    UserLogin: {
        EmailId: string;
        Password: string;
    }
};

export interface Ilogin {
    UserLogin: {
        EmailId: string;
        Password: string;
    }
}