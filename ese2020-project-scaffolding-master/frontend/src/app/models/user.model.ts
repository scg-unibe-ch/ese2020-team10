export class User { 
    constructor(
        public userid: number,
        public firstName: string,
        public lastName: string,
        public userName: string,
        public email: string,
        public password: string,
        public isAdmin: boolean
    ) {}
}