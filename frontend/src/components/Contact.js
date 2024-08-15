import { Button, Input, Stack, Textarea, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";


const Contact = () => {

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const url = process.env.REACT_APP_API_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const email = "hasnainsiddique495@gmail.com";

    const handleMail = async () => {

        const brevoData = {
            sender: { email: 'hasnain2202e@aptechsite.net', name: "tomoe" },
            to: [{ email }],
            subject,
            htmlContent: `
            <html>
            <head>
            </head>
                <body>
                    <p>${message}</p>
                </body
            </html>
            `,
            textContent: message,
        };


        try {
            const response = await axios.post(url, brevoData, {
                headers: {
                    'Content-Type': "application/json",
                    'api-key': API_KEY,
                },
            }
            );

            console.log(response);

            if (response.status === 201) {
                alert('email sent');
            } else {
                alert('an error occured');
            }
        } catch (err) {
            console.error(`error: ${err}`)
        }
    }


    return (
        <Stack flexDirection='row' w='100%' pt='30px' justifyContent='center'>
            <VStack w='50%' mt='5em'>
                <Input placeholder="enter subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                <Textarea placeholder="enter message" value={message} onChange={e => setMessage(e.target.value)} />
                <Button onClick={handleMail}>Send</Button>
            </VStack>
        </Stack>
    )
}

export default Contact;
