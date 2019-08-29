import { Login } from "../models/login";
import { rideResults } from "../models/rideResults";
import { enteredRides } from "../models/enteredRides";
import { CalendarEvent } from "../models/calendarEvents";
import { eventsFilter } from "../models/eventsFilter";
import Axios, { AxiosResponse } from 'axios';


export interface IapiAudax 
{
    login(login: Login): Promise<boolean>;
    logoff() : Promise<boolean>;
    myResults() : Array<rideResults>;
    myRides() : Array<enteredRides>;
    allEvents() : Array<CalendarEvent>;
    filteredEvents(filter: eventsFilter) : Array<CalendarEvent>;
}

export class apiAudax implements IapiAudax {
    private isLoggedIn : boolean = false;

    private setLoggedIn(response : AxiosResponse<any>) {
        let html = response.data as string;
        let testResult = html.indexOf('You need to log in to be able to see this section of the site');
        if (testResult>0){
            this.isLoggedIn = false;
        }else
        {
            return this.isLoggedIn = true
        }
    }

    async login(login: Login): Promise<boolean> {
        try {
            console.log('Logged in state : ' + this.isLoggedIn);
            if(!this.isLoggedIn){
            let response = await Axios.post('https://www.aukweb.net/members/?action=logout',  'memno=' + login.membershipNumber + '&password=' + login.password + '&login=' + login.login);
            this.setLoggedIn(response);
        }
        console.log('Logged in state2 : ' + this.isLoggedIn);
            return this.isLoggedIn;
            
        } catch (error) {
            this.isLoggedIn = false;
            console.log('Logged in state3 : ' + this.isLoggedIn);
            return this.isLoggedIn;
        }             
    }    

    async logoff(): Promise<boolean> {
        console.log('Log off state : ' + this.isLoggedIn);
        try {
            let data = new FormData();
            data.append("logout", "Logout");
            let response = await Axios.post('https://www.aukweb.net/members/?action=logout',data);
            this.setLoggedIn(response);
            console.log('Log off state2 : ' + this.isLoggedIn);
            return !this.isLoggedIn;
        } catch (error) {
            this.isLoggedIn = false;
            console.log('Logged off state3 : ' + this.isLoggedIn);
            return !this.isLoggedIn;
        }
    }
    myResults(): rideResults[] {
        throw new Error("Method not implemented.");
    }
    myRides(): enteredRides[] {
        throw new Error("Method not implemented.");
    }
    allEvents(): CalendarEvent[] {
        throw new Error("Method not implemented.");
    }
    filteredEvents(filter: eventsFilter): CalendarEvent[] {
        throw new Error("Method not implemented.");
    }


}

