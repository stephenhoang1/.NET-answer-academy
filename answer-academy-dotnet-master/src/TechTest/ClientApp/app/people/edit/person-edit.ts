import { autoinject } from 'aurelia-framework';
import { Router, RouteConfig } from 'aurelia-router'
import { HttpClient, json } from 'aurelia-fetch-client';
import { Person } from '../models/person';
import { IColour } from '../interfaces/icolour';
import { IPerson } from '../interfaces/iperson';

@autoinject
export class PersonEdit {

  constructor(private http: HttpClient, private router: Router) { }

  private heading: string;
  private person: Person;
  private colourOptions: IColour[] = [];
  private routerConfig: RouteConfig;

  async activate(params, routerConfig: RouteConfig) {
    this.routerConfig = routerConfig;

    const personResponse = await this.http.fetch(`/people/${params.id}`);
    this.personFetched(await personResponse.json());

    const colourResponse = await this.http.fetch('/colours');
    this.colourOptions = await colourResponse.json() as IColour[];
  }

  personFetched(person: IPerson): void {
    this.person = new Person(person)
    this.heading = `Update ${this.person.fullName}`;
    this.routerConfig.navModel.setTitle(`Update ${this.person.fullName}`);
  }

  colourMatcher(favouriteColour: IColour, checkBoxColour: IColour) {
    return favouriteColour.id === checkBoxColour.id;
  }

  async submit() {

    // TODO: Step 7
    //
    // Implement the submit and save logic.
    // Send a JSON request to the API with the newly updated
    // this.person object. If the response is successful then
    // the user should be navigated to the list page.

var xhr = new XMLHttpRequest();
    var url = "/people";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            window.location.href = "/people-list.html" //navigate to new pag

        }
    }
    var data = JSON.stringify(this.person);
    xhr.send(data);

    throw new Error('Not Implemented');
  }

  cancel() {
    this.router.navigate('people');
  }
}
