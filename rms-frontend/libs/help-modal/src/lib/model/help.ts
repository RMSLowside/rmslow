export class Help {
    type: string;
    title: string;
    content: string;

    constructor(
        type: string,
        title: string,
        content: string
    ) {
        this.type = type || 'text';
        this.title = title;
        this.content = content || '';
    }
}