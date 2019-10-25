import {
    LimeWebComponent,
    LimeWebComponentContext,
    LimeWebComponentPlatform,
    //NotificationService,
    PlatformServiceName,
    HttpService,
} from '@limetech/lime-web-components-interfaces';
import { Component, Element, h, Prop, State } from '@stencil/core';
import { ListItem, ListSeparator } from '@limetech/lime-elements';

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
        name: null,
        priority: null,
        misc: null,
    }];





    @State()
    private outputLeftList: String;
    private outputMiddleList: String;
    private outputRightList: String;

    private http: HttpService;



    public componentWillLoad() {
        this.http = this.platform.get(PlatformServiceName.Http);
        console.log("componentWillLoad");
        this.getDataFromEndPoint("solutionimprovement")

    }

    private getDataFromEndPoint(limeType) {
        console.log(limeType)
        this.http.get(`https://localhost/lime/limepkg-sprint/test/?limetype=` + limeType).then(res => {
            this.updateData(res);
            /*         this.section = res.objects.map(el => {
                            return this.section = { ...el };
                        });
                        this.createOutPut(); */
                        console.log(res);
        }
        );
    }

    private updateData = (res) => {
        this.section = res.objects.map(el => {
            return this.section = { ...el };
        });
        this.createOutPut();
    }

    private createOutPut() {
        let itemsLeftList: Array<ListItem<any> | ListSeparator> = [];
        let itemsMiddleList: Array<ListItem<any> | ListSeparator> = [];
        let itemsRightList: Array<ListItem<any> | ListSeparator> = [];
        let index = 1;
        this.section.forEach(element => {
            const item = {
                text: element.name,
                secondaryText: "Priority: " + element.priority,
                value: index++,
            }
            if (element.priority == "urgent" || element.priority == "rejection" || element.priority == "agreement") {
                itemsLeftList.push(
                    (item as ListItem),
                    { separator: true })
            } else if (element.priority == "wish" ||element.priority == "contact" || element.priority == "prospect") {
                itemsMiddleList.push(
                    (item as ListItem),
                    { separator: true })
            } else if (element.priority == "better" || element.priority == "agreement" || element.priority == "active") {
                itemsRightList.push(
                    (item as ListItem),
                    { separator: true }
/*                     {text: element.title,
                    secondaryText: "Priority: " + element.priority,
                    value: index++,
                },
                    { separator: true } */)
            }
        }
        )
        this.outputLeftList = <limel-list items={itemsLeftList} />
        this.outputMiddleList = <limel-list items={itemsMiddleList} />
        this.outputRightList = <limel-list items={itemsRightList} />
    }


    public render() {
        console.log("Render()");
        return (
            <limel-flex-container direction={"horizontal"} align={"stretch"} justify={"space-between"}>
                <limel-flex-container direction={"vertical"} align={"stretch"} justify={"start"}>
                    <limel-button label="Get deals" onClick={() => this.getDataFromEndPoint("deal")}/>
                    <h3>Priority Urgent</h3>
                    {this.outputLeftList}
                </limel-flex-container>
                <limel-flex-container direction={"vertical"} align={"stretch"} justify={"space-around"}>
                    <limel-button label="Get solution improvements" onClick={() => this.getDataFromEndPoint("solutionimprovement")}/>
                    <h3>Priority Wish</h3>
                    {this.outputMiddleList}
                </limel-flex-container>
                <limel-flex-container direction={"vertical"} align={"stretch"} justify={"end"}>
                    <limel-button label="Get Companies" onClick={() => this.getDataFromEndPoint("company")}/>
                    <h3>Priority better get started</h3>
                    {this.outputRightList}
                </limel-flex-container>
            </limel-flex-container>
        );
    }
}
