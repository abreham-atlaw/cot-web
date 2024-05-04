import Field, { TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";

export default class SearchForm extends Form {
    search = new TextField(true,null,false);
    getFields(): Field<any>[] {
       return [this.search]
    }
   
    
}