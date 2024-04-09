import UserService from './services/user.service.js';
import EmailService from './services/email.service.js';
import AuthService from './services/auth.service.js';

async function startApp () {
    //Start services
    await UserService.start();
    await EmailService.start();
    await AuthService.start();
    try{
        //user createion action
        const newUser = await UserService.call('user.createUser', {
            username: 'john',
            email: 'john@gmail.com'
        });
        console.log('Created new user: ', newUser);
        const users = await UserService.call('user.getUsers');
        console.log('Users:', users); 

        // Email sending action
        const emailResponse = await EmailService.call('email.sendEmail',{
            recipient: newUser.email , subject: "Welcome!", content: "Thanks for signing up. Enjoy our services!"
        });
        console.log('Email Response:', emailResponse);

        //Auth action
        const authResponse = await AuthService.call('auth.authUser', {
            username: 'admin',
            password: 'password'
        })
        console.log('Auth Response:', authResponse);
        
    }catch(err){
        console.error("Error: ", err);
    }finally{
        //Stop services
        await UserService.stop();
        await EmailService.stop();
        await AuthService.stop();
    }
}

startApp();
