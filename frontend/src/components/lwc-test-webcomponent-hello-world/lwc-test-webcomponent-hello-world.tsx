import {
    LimeWebComponent,
    LimeWebComponentContext,
    LimeWebComponentPlatform,
    //NotificationService,
    PlatformServiceName,
    HttpService,
} from '@limetech/lime-web-components-interfaces';
import { Component, Element, h, Prop, State } from '@stencil/core';
import { ListItem,ListSeparator } from '@limetech/lime-elements';

@Component({
    tag: 'lwc-test-webcomponent-hello-world',
    shadow: true,
    styleUrl: 'lwc-test-webcomponent-hello-world.scss',
})

export class HelloWorld implements LimeWebComponent {

    @Prop()
    public platform: LimeWebComponentPlatform;

    @Prop()
    public context: LimeWebComponentContext;

    @Element()
    public element: HTMLElement;


    @State()
    private section = [{
        title: null,
        priority: null,
        misc: null,
        solutionimprovementstatus: null,
        isOpen:  false,
    }];


    @State()
    private items: Array<ListItem<number> | ListSeparator> = [];

    @State()
    private outputList: String;

    private http: HttpService;


    
    public componentWillLoad() {
        this.http = this.platform.get(PlatformServiceName.Http);
        console.log("componentWillLoad");
        this.http.get(`https://localhost/lime/limepkg-sprint/test/?limetype=solutionimprovement`).then(res => {
            this.section = res.objects.map(el => {
                return this.section = {...el};
            });
            this.createOutPut();
        }
        );
    }

    private createOutPut() {
        let index = 1;
        this.section.forEach(element => {
            this.items.push({
                text: element.title,
                secondaryText: "Status: " + element.solutionimprovementstatus,
                value: index++,
            },
            {separator: true})
            console.log(element);
        }
        )
         this.outputList = <limel-list items={this.items}/>
    }

    
    public render() {
        console.log("Render()");
     
        console.log(this.items);


        return (
            <limel-flex-container direction={"vertical"} align={"stretch"} justify={"space-around"}>
                <limel-button label="click me" onClick={this.render} />
                {this.outputList}
            </limel-flex-container>
        );
    }
}
