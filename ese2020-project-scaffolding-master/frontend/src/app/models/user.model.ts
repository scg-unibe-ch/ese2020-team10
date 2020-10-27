export class User {
    constructor(
        public userId: number,
        public firstName: string,
        public lastName: string,
        public userName: string,
        public email: string,
        public password: string,
        public isAdmin: boolean,
        public phone: string,
        public address: string,
        public city: string
    ) {}
}
