import { Login } from "../models/login";
import { rideResults } from "../models/rideResults";
import { enteredRides } from "../models/enteredRides";
import { CalendarEvent } from "../models/calendarEvents";
import { eventsFilter } from "../models/eventsFilter";
import Axios from 'axios';


export interface IapiAudax 
{
    login(login: Login): Promise<boolean>;
    logoff() : boolean;
    myResults() : Array<rideResults>;
    myRides() : Array<enteredRides>;
    allEvents() : Array<CalendarEvent>;
    filteredEvents(filter: eventsFilter) : Array<CalendarEvent>;
}

export class apiAudax implements IapiAudax {
    async login(login: Login): Promise<boolean> {
        try {
            let result = await Axios.post('https://www.aukweb.net/members/?action=logout',  'memno=' + login.membershipNumber + '&password=' + login.password + '&login=' + login.login);
            let html = result.data as string;
            let testResult = html.indexOf('You need to log in to be able to see this section of the site');
            if (testResult>0){
                return false;
            }else
            {return true}
            
        } catch (error) {
            return false;
        }             
    }    

    logoff(): boolean {
        throw new Error("Method not implemented.");
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

