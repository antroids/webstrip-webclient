import HttpService from './service/HttpService';
import { WebStripMode } from './service/WebStripMode';
import { WebStripOptions } from './service/WebStripOptions';

export default class Api {

    public static getMode(): Promise<WebStripMode> {
        return HttpService.get('mode');
    }

    public static setMode(mode: Partial<WebStripMode>): Promise<WebStripMode> {
        return HttpService.post('mode', mode);
    }

    public static getOptions(): Promise<WebStripOptions> {
        return HttpService.get('options');
    }
}