import auth from "@/fb";

export default async function({$auth, redirect, route}){
    if(!auth.loggedIn){
        console.log(route)
        redirect('/login?redirect=${route.path}')
    }
}