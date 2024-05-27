import { ReactNode } from "react";
import { FieldComponent, FieldComponentProps } from "./FieldComponent";
import DataConfigs from "@/configs/dataConfigs";
import ReCAPTCHA from "react-google-recaptcha";



export default class RecaptcaFieldComponent extends FieldComponent<string, FieldComponentProps<string>>{
    
    protected constructInputNode(_value: string | null, callback: (value: string | null) => void): ReactNode {
        return <ReCAPTCHA
            sitekey={DataConfigs.GOOGLE_RECAPTCHA_KEY}
            onChange={callback}
        />
    }

}