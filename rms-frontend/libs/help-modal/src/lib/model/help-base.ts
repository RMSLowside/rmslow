export class HelpBase {
    id: number;
    type: string;
    value: string;
    title: string;
    order: number;

    constructor(options: {
        type?: string,
        title?: string,
        order?: number,
        value?: string
    } = {}) {
        this.type = options.type || 'text';
        this.title = options.title || '';
        this.order = options.order;
        this.value = options.value || '';
    }
}
