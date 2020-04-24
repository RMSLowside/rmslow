export class HelpBase {
    type: string;
    title: string;
    order: number;

    constructor(options: {
        type?: string,
        title?: string,
        order?: number
    } = {}) {
        this.type = options.type || 'text';
        this.title = options.title;
        this.order = options.order;
    }
}

// separate the classes to invidual files.. in one file for now.
// Create additional type classes similar to our dynamic forms (e.g. video, pictures, etc)

export class HelpLink extends HelpBase {
    type = 'link';
    link: string;

    constructor(options: {} = {}) {
        super(options);
        this.link = options['link'];
    }
}

export class HelpText extends HelpBase {
    type = 'text';
    text: string;

    constructor(options: {} = {}) {
        super(options);
        this.text = options['text'] || '';
    }
}

