import axios from 'axios'

const commonAPI = async (httpmethod,url,body)=>{
    const reqconfig = {
        method:httpmethod,
        url,
        data:body
    }

    try{
        let response = await axios(reqconfig)
        return response
    }
    catch(err){
        return err
    }
}

export default commonAPI