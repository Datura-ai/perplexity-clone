import axios from 'axios';

export const chatCompletions = (content: string) =>
  axios.post(
    `${process.env.pplxApiURL}`,
    {
      model: 'pplx-7b-online',
      stream: true,
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.pplxApiKey}`,
      },
      responseType: 'stream',
    }
  );
