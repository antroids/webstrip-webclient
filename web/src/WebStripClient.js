class WebStripClient {
    constructor() {
        this.apiURI = process.env.NODE_ENV === 'production' ? '/api/' : 'http://WebStrip.local/api/';
    }

    getMode() {
        return this.getRequest('mode').then((jsonObject) => {
            return Promise.resolve(Object.assign(new WebStripMode(), jsonObject));
        });
    }

    setMode(mode) {
        return this.postRequest('mode', mode).then((jsonObject) => {
            return Promise.resolve(Object.assign(new WebStripMode(), jsonObject));
        });
    }

    getRequest(apiEndpoint) {
        let request = new Request(this.apiURI + apiEndpoint);
        return this.processResponse(fetch(request));
    }

    postRequest(apiEndpoint, jsonObject) {
        let formData = new FormData();
        formData.append('data', JSON.stringify(jsonObject));
        let request = new Request(this.apiURI + apiEndpoint, {method: 'POST', body: formData});
        return this.processResponse(fetch(request));
    }

    processResponse(fetchResult) {
        return fetchResult.then((response) => {
            try {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.json().then(json => json.errorMessage));
                }
            } catch (err) {
                return Promise.reject(err.message);
            }
        });
    }
}

class WebStripMode {
    constructor() {
        this.index = 0;
        this.description = "Default mode";
        this.colorSelectionMode = WebStripColorSelectionMode.COLOR_SELECTION_MODE_ASC.id;
        this.animationMode = WebStripAnimationMode.ANIMATION_MODE_NONE.id;
        this.animationSpeed = 128;
        this.animationProgressMode = WebStripAnimationProgressMode.ANIMATION_PROGRESS_LINEAR.id;
        this.animationIntensity = 1;
        this.colors = [];
    }
}

class WebStripColorSelectionMode {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

WebStripColorSelectionMode.COLOR_SELECTION_MODE_ASC = new WebStripColorSelectionMode(0, "ASC", "Repeat all colors from palette");
WebStripColorSelectionMode.COLOR_SELECTION_MODE_RAND = new WebStripColorSelectionMode(1, "Random palette", "Random colors from palette");
WebStripColorSelectionMode.COLOR_SELECTION_MODE_GENERATED = new WebStripColorSelectionMode(2, "Random", "Random colors");
WebStripColorSelectionMode.ALL = [
    WebStripColorSelectionMode.COLOR_SELECTION_MODE_ASC,
    WebStripColorSelectionMode.COLOR_SELECTION_MODE_RAND,
    WebStripColorSelectionMode.COLOR_SELECTION_MODE_GENERATED
];

class WebStripAnimationMode {
    constructor(id, name, description, hasAnimationSpeed, hasAnimationProgressMode, hasAnimationIntensity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.hasAnimationSpeed = hasAnimationSpeed;
        this.hasAnimationProgressMode = hasAnimationProgressMode;
        this.hasAnimationIntensity = hasAnimationIntensity;
    }
}

WebStripAnimationMode.ANIMATION_MODE_NONE = new WebStripAnimationMode(0, "No", "No animation", false, false, false);
WebStripAnimationMode.ANIMATION_MODE_SHIFT_RIGHT = new WebStripAnimationMode(1, "Shift right", "Shift right", true, false, true);
WebStripAnimationMode.ANIMATION_MODE_FADE = new WebStripAnimationMode(2, "Fade", "Fade out/in all leds", true, true, false);
WebStripAnimationMode.ANIMATION_MODE_RAND_PIXELS = new WebStripAnimationMode(3, "Random change", "Change random pixels", true, true, true);
WebStripAnimationMode.ANIMATION_MODE_FLASH_PIXELS = new WebStripAnimationMode(4, "Random flash", "Flash random pixels, then fade out", true, true, true);
WebStripAnimationMode.ANIMATION_MODE_SOLID_FADE_OUT_LOOP = new WebStripAnimationMode(5, "Solid loop", "Move solid color pixel with tail", true, true, false);
WebStripAnimationMode.ANIMATION_MODE_FADE_OUT_LOOP = new WebStripAnimationMode(6, "Color loop", "Move color pixel with tail", true, true, false);
WebStripAnimationMode.ALL = [
    WebStripAnimationMode.ANIMATION_MODE_NONE,
    WebStripAnimationMode.ANIMATION_MODE_SHIFT_RIGHT,
    WebStripAnimationMode.ANIMATION_MODE_FADE,
    WebStripAnimationMode.ANIMATION_MODE_RAND_PIXELS,
    WebStripAnimationMode.ANIMATION_MODE_FLASH_PIXELS,
    WebStripAnimationMode.ANIMATION_MODE_SOLID_FADE_OUT_LOOP,
    WebStripAnimationMode.ANIMATION_MODE_FADE_OUT_LOOP
];

class WebStripAnimationProgressMode {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

WebStripAnimationProgressMode.ANIMATION_PROGRESS_LINEAR = new WebStripAnimationProgressMode(0, "Linear", "Linear");
WebStripAnimationProgressMode.ANIMATION_PROGRESS_SIN_IN = new WebStripAnimationProgressMode(0, "Sin In", "Sin In");
WebStripAnimationProgressMode.ANIMATION_PROGRESS_SIN_OUT = new WebStripAnimationProgressMode(0, "Sin Out", "Sin Out");
WebStripAnimationProgressMode.ANIMATION_PROGRESS_SIN_IN_OUT = new WebStripAnimationProgressMode(0, "Sin In Out", "Sin In Out");
WebStripAnimationProgressMode.ALL = [
    WebStripAnimationProgressMode.ANIMATION_PROGRESS_LINEAR,
    WebStripAnimationProgressMode.ANIMATION_PROGRESS_SIN_IN,
    WebStripAnimationProgressMode.ANIMATION_PROGRESS_SIN_OUT,
    WebStripAnimationProgressMode.ANIMATION_PROGRESS_SIN_IN_OUT
];

export default WebStripClient;
