import commonAPI from "./API";
import SERVER_URL from "./server_url";

export const addMessageAPI = async(msg)=>{
    let response = commonAPI("POST",`${SERVER_URL}/messages`,msg)
    return response
}

export const deletemessageAPI = async(msgid)=>{
    let response = commonAPI('DELETE',`${SERVER_URL}/messages/${msgid}`,{})
    return response
}

export const updatemessageAPI = async(msgid,newmessage)=>{
    let response = commonAPI("PUT",`${SERVER_URL}/messages/${msgid}`,newmessage)
    return response
}
