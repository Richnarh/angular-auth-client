export class SystemValidators{
    static matchPassword(password1: string, password2: string):boolean
    {
        return password1 === password2;
    }
}
