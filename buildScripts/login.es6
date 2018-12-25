let login = (user, pass)=>{
    if(user !== 'admin' || pass !=='test'){
        console.log('incorrect login')
    }
}

login('admin', 'xxxx')