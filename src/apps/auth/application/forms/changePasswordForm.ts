import Field, { TextField } from "@/common/forms/fields";
import Form, { ValidationException } from "@/common/forms/form";



export default class ChangePasswordForm extends Form{

    oldPassword = new TextField();
    newPassword = new TextField(
        true,
        async (value) => {
            if(value.length < 8){
                return "Password should be atleast 8 characters long."
            }
            return null;
        }
    );

    getFields(): Field<unknown>[] {
        return [
            this.oldPassword,
            this.newPassword
        ]
    }

    public validate(throw_error?: boolean): Promise<boolean> {
        if(this.newPassword.getValue() === this.oldPassword.getValue()){
            throw new ValidationException("New password must be different from old password.");
        }
        return super.validate(throw_error);
    }

}