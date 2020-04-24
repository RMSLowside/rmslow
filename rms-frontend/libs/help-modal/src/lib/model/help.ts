export class HelpModalBase {
    type: string;
    title: string;    
    order: number;

    content: string;

    constructor(
        type: string,
        title: string,
        content?: string
    ) {
        this.type = type || 'text';
        this.title = title;
        this.content = content || '';
    }
}