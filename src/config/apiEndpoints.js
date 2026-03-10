
const BASE_URL=process.env.REACT_APP_API_URL
export const apiUrl={
    auth:{
        register:`${BASE_URL}api/auth/register`,
        login:`${BASE_URL}api/auth/login`
    },
    profile:{
        student:`${BASE_URL}api/profile/student`,
        alumini:`${BASE_URL}api/profile/alumni`,
        me:`${BASE_URL}api/profile/me`
    }
}