import { LimeWebComponent, LimeWebComponentContext, LimeWebComponentPlatform } from '@limetech/lime-web-components-interfaces';
export declare class HelloWorld implements LimeWebComponent {
    platform: LimeWebComponentPlatform;
    context: LimeWebComponentContext;
    element: HTMLElement;
    private section;
    private hasLoaded;
    private http;
    componentWillLoad(): void;
    private handleClick;
    render(): any;
}
