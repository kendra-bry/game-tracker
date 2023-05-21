const baseURL = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
async function convertToJson(res) {
  let jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class DataSource {
  constructor() {}

  async getData() {
    const data = await fetch(`${baseURL}/games?key=${apiKey}`);
    const json = await convertToJson(data);
    return json.results;
  }

}
