class ChangePasswordModel {

    constructor() {
        
     }
    

    public resetCode: string | null | undefined;

    public email: string | null | undefined;

    public newPassword: string | null | undefined ;

    public userId: string | null | undefined;

    public isFirstTimeChange: boolean | false| undefined;

}
export default ChangePasswordModel;