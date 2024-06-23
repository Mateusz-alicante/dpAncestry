
import Anthropic from "@anthropic-ai/sdk";


console.log(process.env.CLAUDE_API_KEY)
const anthropic = new Anthropic( {apiKey: process.env.CLAUDE_API_KEY});

export async function POST(request, { params }) {

    // print the body
    const body = await request.json()
    console.log(body)

    const msg = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        temperature: 0,
        system: `
        Your task is to answer the this prompot of the user of an application that 
        provides information on genetic ancestry and predisposition to diseases.

        The user did not provide any information himself, but rather the data is already stored in the application.

        The information about the user is the following (the first entries are countries/diseases), and the second entry is the probsbility: "${JSON.stringify(body.data)}"

        
        `,
        messages: [
            {
            "role": "user",
            "content": [
                {
                "type": "text",
                "text": `The user has asked: "${body.currentInput}"`
                }
            ]
            }
        ]
        });

    console.log(msg)
    return Response.json({ message: msg })    
}