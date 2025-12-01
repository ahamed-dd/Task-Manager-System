const BASE_URL = 'http://127.0.0.1:8000/'

export const registerUser = async<DT> (user: DT) => {
    try{
        const response = await fetch(`${BASE_URL}accounts/register/`, {
            method :"POST",
            headers : {
                'Content-Type': "application/json",
            },
            body : JSON.stringify(user)
        });
        const data = await response.json()
        return data
    }catch (err) {
        console.log("Post Error", err)
    }

}