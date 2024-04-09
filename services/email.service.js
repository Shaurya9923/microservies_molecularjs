import { ServiceBroker } from "moleculer";

const broker = new ServiceBroker();

broker.createService({
    name: "email",
    actions:{
        async sendEmail(ctx){
            const {recipient, subject, content} = ctx.params;
            console.log(`Sending email to ${recipient} with subject: ${subject} and content: ${content}`);
            return `Email sent to ${recipient} successfully!`;
        }
    }
})

export default broker;