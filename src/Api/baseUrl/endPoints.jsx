import Post from "./post";

const EndPoints = {
    Auth: {
        login:(data) => Post('/auth/login',data),
        register:(data) => Post('auth/register', data),
    },
    contacts:{
        create_contacts:(data) =>Post('/contacts/create-contacts', data),
        fetch_contacts:(data)=>Post('/contacts/fetch-contacts', data),
        delete_contacts:(id)=>Post(`/contacts/delete-contacts/${id}`),
        move_contacts_to_business:(id)=>Post(`/contacts/move-to-business/${id}`),
        delete_contacts_inBusiness:(id)=>Post(`/contacts/delete-business-contacts/${id}`)
    },
}
export default EndPoints;