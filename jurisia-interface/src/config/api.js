// Configuration de l'API OpenAI
export const openaiConfig = {
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  baseUrl: 'https://api.openai.com/v1',
  model: 'gpt-4',
  defaultParams: {
    temperature: 0.7,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  }
};

// Fonction utilitaire pour les appels à l'API OpenAI
export const callOpenAI = async (endpoint, messages) => {
  try {
    const response = await fetch(`${openaiConfig.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiConfig.apiKey}`
      },
      body: JSON.stringify({
        model: openaiConfig.model,
        messages,
        ...openaiConfig.defaultParams
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Erreur OpenAI:', error);
      throw new Error(`Erreur API: ${error.error?.message || response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erreur lors de l\'appel à OpenAI:', error);
    throw error;
  }
};
