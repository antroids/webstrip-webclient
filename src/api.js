export class WebStripClient {
    constructor() {
        this.apiURI = process.env.NODE_ENV === 'production' ? '/api/' : 'http://WebStrip.local/api/';
    }

    getMode() {
        return this.assignTo(this.getRequest('mode'), new WebStripMode());
    }

    setMode(mode) {
        return this.assignTo(this.postRequest('mode', mode), new WebStripMode());
    }

    getOptions() {
        return this.assignTo(this.getRequest('options'), new WebStripOptions());
    }

    assignTo(promise, object) {
        return promise.then((jsonObject) => {
            return Promise.resolve(Object.assign(object, jsonObject));
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
                    return Promise.reject(response.json().then(json => new WebStripError(json.errorMessage, response.status)));
                }
            } catch (err) {
                return Promise.reject(new WebStripError(err.message, response.status));
            }
        });
    }
}

export class WebStripMode {
    constructor() {
        this.index = 0;
        this.description = "Default mode";
        this.colorSelectionMode = WebStripColorSelectionMode.COLOR_SELECTION_MODE_ASC.id;
        this.animationMode = WebStripAnimationMode.ANIMATION_MODE_NONE.id;
        this.animationSpeed = 128;
        this.animationProgressMode = WebStripAnimationProgressMode.ANIMATION_PROGRESS_LINEAR.id;
        this.animationIntensity = 1;
        this.animationDirection = true;
        this.colors = [];
    }
}

export class WebStripColorSelectionMode {
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

export class WebStripAnimationMode {
    constructor(id, name, description, hasAnimationSpeed, hasAnimationProgressMode, hasAnimationIntensity, hasAnimationDirection) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.hasAnimationSpeed = hasAnimationSpeed;
        this.hasAnimationProgressMode = hasAnimationProgressMode;
        this.hasAnimationIntensity = hasAnimationIntensity;
        this.hasAnimationDirection = hasAnimationDirection;
    }
}

WebStripAnimationMode.ANIMATION_MODE_NONE = new WebStripAnimationMode(0, "No", "No animation", false, false, false, false);
WebStripAnimationMode.ANIMATION_MODE_SHIFT = new WebStripAnimationMode(1, "Shift", "Shift", true, false, true, true);
WebStripAnimationMode.ANIMATION_MODE_FADE = new WebStripAnimationMode(2, "Fade", "Fade out/in all leds", true, true, false, false);
WebStripAnimationMode.ANIMATION_MODE_RAND_PIXELS = new WebStripAnimationMode(3, "Random change", "Change random pixels", true, true, true, false);
WebStripAnimationMode.ANIMATION_MODE_FLASH_PIXELS = new WebStripAnimationMode(4, "Random flash", "Flash random pixels, then fade out", true, true, true, false);
WebStripAnimationMode.ANIMATION_MODE_SOLID_FADE_OUT_LOOP = new WebStripAnimationMode(5, "Solid loop", "Move solid color pixel with tail", true, true, false, true);
WebStripAnimationMode.ANIMATION_MODE_FADE_OUT_LOOP = new WebStripAnimationMode(6, "Color loop", "Move color pixel with tail", true, true, false, true);
WebStripAnimationMode.ALL = [
    WebStripAnimationMode.ANIMATION_MODE_NONE,
    WebStripAnimationMode.ANIMATION_MODE_SHIFT,
    WebStripAnimationMode.ANIMATION_MODE_FADE,
    WebStripAnimationMode.ANIMATION_MODE_RAND_PIXELS,
    WebStripAnimationMode.ANIMATION_MODE_FLASH_PIXELS,
    WebStripAnimationMode.ANIMATION_MODE_SOLID_FADE_OUT_LOOP,
    WebStripAnimationMode.ANIMATION_MODE_FADE_OUT_LOOP
];

export class WebStripAnimationProgressMode {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

WebStripAnimationProgressMode.ANIMATION_PROGRESS_LINEAR = new WebStripAnimationProgressMode(0, "Linear", "Linear");
WebStripAnimationProgressMode.ANIMATION_PROGRESS_SIN_IN = new WebStripAnimationProgressMode(1, "Sin In", "Sin In");
WebStripAnimationProgressMode.ANIMATION_PROGRESS_SIN_OUT = new WebStripAnimationProgressMode(2, "Sin Out", "Sin Out");
WebStripAnimationProgressMode.ANIMATION_PROGRESS_SIN_IN_OUT = new WebStripAnimationProgressMode(3, "Sin In Out", "Sin In Out");
WebStripAnimationProgressMode.ALL = [
    WebStripAnimationProgressMode.ANIMATION_PROGRESS_LINEAR,
    WebStripAnimationProgressMode.ANIMATION_PROGRESS_SIN_IN,
    WebStripAnimationProgressMode.ANIMATION_PROGRESS_SIN_OUT,
    WebStripAnimationProgressMode.ANIMATION_PROGRESS_SIN_IN_OUT
];

export class WebStripError {
    constructor(errorMessage, httpCode) {
        this.errorMessage = errorMessage;
        this.httpCode = httpCode;
    }
}

export class WebStripOptions {
    constructor() {
        this.pixelCount = 32;
        this.domain = "WebStrip";
        this.port = 80;
    }
}

export default WebStripClient;
