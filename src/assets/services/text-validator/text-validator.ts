import { Injectable } from '@angular/core';

/**
 * @name TextValidator
 * @type class
 * @author jme
 * @since 05/02/2017
 * @description utility that clans some given text, removing or replacing some
 * characters, for code injection
 */
@Injectable()
export class TextValidator {
    constructor() { }

    /**
     * @name cleanTextStrict
     * @author jme
     * @type method
     * @since 05/02/2017
     * @param text : the text to cleanText
     * @return result : the cleaned text
     * @description remplaces unwanted symbols from given text
     */
    public static cleanTextStrict(text: string): string {
        let result = text.replace(/[&\/\\#,+()$~%'":*?<>{}]/g,'_');
        return result;
    }

    /**
     * @name cleanText
     * @author jme
     * @type method
     * @since 05/02/2017
     * @param text : the text to cleanText
     * @return result : the cleaned text
     * @description remplaces unwanted symbols from given text
     */
    public static cleanText(text: string): string {
        let result = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return result;
    }
}