// import { GoogleGenAI } from "@google/genai";
// import fs from "node:fs";


// const generateImage = async (req , res) => {

//     const {prompt} = req.body

//     if(!prompt){
//         res.status(409)
//         throw new Error("Kindly Provide Prompt To Generate Image")
//     }


//     const ai = new GoogleGenAI({})

//   const response = await ai.models.generateContent({
//     model: "gemini-3.1-flash-image-preview",
//     contents: prompt,
//   });




//   for (const part of response.candidates[0].content.parts) {
//     if (part.text) {
//       console.log(part.text);
//     } else if (part.inlineData) {
//       const imageData = part.inlineData.data;
//       const buffer = Buffer.from(imageData, "base64");
//       fs.writeFileSync("gemini-native-image.png", buffer);
//       console.log("Image saved as gemini-native-image.png");
//     }
//   }




//     res.send("Image Genarated")
// }

// // async function main() {

// //   const ai = new GoogleGenAI({});



// // main();




// export default generateImage


import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";



const generateImage = async (req, res) => {

    try {
        const { prompt } = req.body

    if (!prompt) {
        res.status(409)
        throw new Error("Kindly Provide Prompt To Generate Image!")
    }

    const ai = new GoogleGenAI({
        
    })

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: prompt,
    });

    console.log(response)



    for (const part of response.candidates[0].content.parts) {
        if (part.text) {
            console.log(part.text);
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            fs.writeFileSync(crypto.randomUUID + ".png", buffer);
            console.log("Image saved as gemini-native-image.png");
        }
    }


    res.send("Image Generated!")
    } catch (error) {
        console.log(error)
      res.status(409)
      throw new Error("Image Generation Failed")  
    }
}




export default generateImage