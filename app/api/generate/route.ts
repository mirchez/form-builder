// import { NextResponse } from "next/server";
// // import { OpenAI } from "openai";

// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// export async function POST(request: Request) {
//   try {
//     const { prompt } = await request.json();

//     if (!prompt) {
//       return NextResponse.json(
//         { error: "No prompt provided" },
//         { status: 400 }
//       );
//     }

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a helpful assistant that creates form questions based on user input.",
//         },
//         {
//           role: "user",
//           content: `Generate a list of questions for this form prompt:\n\n${prompt}\n\nPlease respond in JSON array format, each item having { "question": string, "type": "text" | "yesno" }.`,
//         },
//       ],
//     });

//     const text = completion.choices[0].message?.content || "[]";

//     // Intentamos parsear la respuesta JSON
//     let questions;
//     try {
//       questions = JSON.parse(text);
//     } catch (e) {
//       // En caso de que la IA no responda JSON válido
//       questions = [{ question: text, type: "text" }];
//     }

//     return NextResponse.json({ questions });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Error generating questions" },
//       { status: 500 }
//     );
//   }
// }
