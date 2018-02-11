export default class HttpService {

    private static apiURI = process.env.NODE_ENV === 'production' ? '/api/' : 'http://WebStrip.local/api/';

    public static get(apiEndpoint: string) {
        let request = new Request(this.apiURI + apiEndpoint);
        return this.processResponse(fetch(request));
    }

    public static post(apiEndpoint: string, jsonObject: any) {
        let formData = new FormData();
        formData.append('data', JSON.stringify(jsonObject));
        let request = new Request(this.apiURI + apiEndpoint, {method: 'POST', body: formData});
        return this.processResponse(fetch(request));
    }

    private static processResponse(fetchResult: Promise<any>) {
        return fetchResult.then((response: any) => {
            try {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.json().then((json: any) => (
                        {
                            errorMessage: json.errorMessage,
                            status: response.status
                        })
                    ));
                }
            } catch (err) {
                return Promise.reject({ errorMessage: err.message, status: response.status });
            }
        });
    }
}