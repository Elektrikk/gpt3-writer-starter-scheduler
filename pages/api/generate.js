import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

var basePromptPrefix = `
Make an ethical decision based on the following parameters - 
1.Personal Dilemmas
2.Business Ethics
3.Environmental Concerns
4.Technology and AI
5.Healthcare Dilemmas
6.Global and Societal Impact
7.Privacy and Data Usage
8.Educational and Professional Integrity
9.Social Responsibility

Select the appropriate parameters according to the dillema, and try to give the optimal and ethical solution according to the parameters

Give the answer in the following format - 
Parameters: "CHOSEN PARAMETER FROM ABOVE"

Solution: "ETHICAL SOLUTION ACCORDING TO THE DILLEMA"

IF THE QUESTION INPUTTED BY THE USER IS SOMETHING NOT RELATED TO AN ETHICAL DILEMMA SUCH AS "GIVE ME ANIME RECOMMENDATIONS", ONLY REPLY WITH 
"I AM AN AI-MODEL USED ONLY FOR ETHICAL DECISION MAKING".
`;

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}\n`)

  
  

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 230,
  });

  console.log(basePromptPrefix)

  
  const basePromptOutput = baseCompletion.data.choices.pop();



  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;