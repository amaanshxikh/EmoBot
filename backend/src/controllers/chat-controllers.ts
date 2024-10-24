import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

// export const generateChatCompletion = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { message } = req.body;
//   try {
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user)
//       return res
//         .status(401)
//         .json({ message: "User not registered OR Token malfunctioned" });
//     // grab chats of user
//     const chats = user.chats.map(({ role, content }) => ({
//       role,
//       content,
//     })) as ChatCompletionRequestMessage[];
//     chats.push({ content: message, role: "user" });
//     user.chats.push({ content: message, role: "user" });

//     // send all chats with new one to openAI API
//     const config = configureOpenAI();
//     const openai = new OpenAIApi(config);
//     // get latest response
//     const chatResponse = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: chats,
//     });
//     user.chats.push(chatResponse.data.choices[0].message);
//     await user.save();
//     return res.status(200).json({ chats: user.chats });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    // Add base prompt
    const basePrompt =
      "You are an EmoBot. As an EmoBot, your mission is to detect and correct the emotions of users based on their input. Your primary goal is to soothe the user and make them feel better, regardless of their emotional state - whether they're sad, scared, angry, or experiencing any other emotion. Your responses should be empathetic, understanding, and tailored to the detected emotion. Your role is to engage with users until you sense they're satisfied or in a better emotional state. Remember, your aim is to provide comfort and support through conversation. You cannot respond to anything else apart from emotional responses and you need to respond in short. ";
    chats.push({ content: basePrompt + message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to openAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    // get latest response
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
