import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";



const __dirname = path.dirname(fileURLToPath(import.meta.url))


const generateAndPost = async (req , res) => {

    try {
      // Get Prompt
      const {prompt} = req.body

      // Check If Prompt Is Coming In Body
    if(!prompt){
        res.status(409)
        throw new Error("Kindly Provide Prompt To Generate Image")
    }


    // Initialize Google Gen AI Instance 
    const ai = new GoogleGenAI({})

    //API Call To Generate Image 
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: prompt,
  });



   // Loop Through Correct Response 

  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      //Convert Text To Image 
      const buffer = Buffer.from(imageData, "base64");
      //Save Locally 
      const filename = crypto.randomUUID() + ".png"
      const filePath = path.join(__dirname , "../generated-content" , filename)
      //Write File Into Server 
      fs.writeFileSync(filePath , buffer)

      //Create Post

      console.log("file saved at:" , filePath)
    }
  }




    res.send("Image Genarated")
    } catch (error) {
      res.stauts(409)
      throw new Error("Image Generation Failed")
    }
}

const postController = {generateAndPost}



export default postController


