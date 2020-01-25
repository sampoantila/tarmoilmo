import sendgrid from '@sendgrid/mail';

class MailService {
    async sendAuthenticationMail(email: string, token: string): Promise<void> {

        const loginUrl = `http://localhost:4000/authenticate/validate/${token}`;

        const msg = {
            to: email,
            from: process.env.SENDGRID_SENDER || '',
            templateId: process.env.SENDGRID_TEMPLATE_ID,
            dynamicTemplateData: {
                loginUrl: loginUrl
            }
        };

        var apiKey = process.env.SENDGRID_API_KEY;
        if (apiKey)
        {
            sendgrid.setApiKey(apiKey);

            await sendgrid.send(msg);
            console.log('message sent to ' + email);
        }
        else {
            console.warn('sendgrid api key missing, not sending email');
        }
    }
}

export default new MailService();
